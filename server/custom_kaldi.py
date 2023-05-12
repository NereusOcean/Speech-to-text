import os
import wave

from kaldi.asr import NnetLatticeFasterRecognizer
from kaldi.decoder import LatticeFasterDecoderOptions
from kaldi.feat.mfcc import Mfcc, MfccOptions
from kaldi.fstext import SymbolTable
from kaldi.itf import DecodableInterface
from kaldi.lat.lat import Lattice
from kaldi.matrix import SubVector, Matrix
from kaldi.util.table import SequentialTableWriter

def wav_to_text(wav_file):
    model_dir = "/path/to/kaldi/model"
    graph_dir = "/path/to/kaldi/graph"
    acoustic_scale = 1.0
    beam = 10.0
    max_active = 7000
    min_active = 200
    lattice_beam = 8.0
    num_threads = 4

    # Set up feature extraction
    mfcc_opts = MfccOptions()
    mfcc_opts.frame_opts.samp_freq = 16000
    mfcc_opts.frame_opts.frame_length_ms = 25
    mfcc_opts.frame_opts.frame_shift_ms = 10
    mfcc_opts.num_ceps = 13
    mfcc_opts.use_energy = False
    mfcc_opts.vtln_low = 100
    mfcc_opts.vtln_high = -500
    mfcc = Mfcc(mfcc_opts)

    # Load model and graph
    model_filename = os.path.join(model_dir, "final.mdl")
    graph_filename = os.path.join(graph_dir, "HCLG.fst")
    symbol_table_filename = os.path.join(graph_dir, "words.txt")
    word_syms = SymbolTable.ReadText(symbol_table_filename)
    with open(model_filename, "rb") as f:
        model_content = f.read()
    with open(graph_filename, "rb") as f:
        graph_content = f.read()

    # Set up recognizer
    decoder_opts = LatticeFasterDecoderOptions()
    decoder_opts.beam = beam
    decoder_opts.max_active = max_active
    decoder_opts.min_active = min_active
    decoder_opts.lattice_beam = lattice_beam
    decodable_opts = NnetSimpleDecoderOptions()
    decodable_opts.acoustic_scale = acoustic_scale
    recognizer = NnetLatticeFasterRecognizer.from_files(
        model_content, graph_content, word_syms, decoder_opts=decoder_opts, decodable_opts=decodable_opts,
        mfcc=mfcc, num_threads=num_threads, online=False
    )

    # Decode audio file
    with wave.open(wav_file, 'rb') as audio_file:
        audio_data = audio_file.readframes(audio_file.getnframes())
    audio_data = Matrix(audio_data)
    audio_data = audio_data.transpose()
    audio_data = SubVector(audio_data, 0)
    features = mfcc.compute_features(audio_data, audio_file.getframerate())
    decodable = DecodableInterface.from_features(features)
    recognizer.decode(decodable)

    # Get transcription
    lattice = recognizer.get_lattice()
    lattice_writer = SequentialTableWriter("ark,t:-", "|gzip -c > lattice.gz")
    lattice_writer.write("lattice", lattice)
    lattice_writer.close()
    with open("lattice.gz", "rb") as f:
        lattice_content = f.read()
    lattice = Lattice.Read(lattice_content)
    words, _, _ = lattice.get_linear_symbol_sequence()
    transcription = " ".join([word_syms.Find(symbol_id) for symbol_id in words])

    return transcription