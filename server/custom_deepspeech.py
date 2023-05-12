import deepspeech
import numpy as np
import wave
import librosa
import soundfile as sf

def deepspeech_transcribe(filename, model_path, scorer_path):
    # Load the DeepSpeech model and scorer
    model = deepspeech.Model(model_path)
    model.enableExternalScorer(scorer_path)
    x, _ = librosa.load(filename, sr=16000)
    sf.write('tmp.wav', x, 16000)
    # Load the WAV file and get its parameters
    with wave.open("tmp.wav", 'rb') as wave_file:
        sample_rate = wave_file.getframerate()
        audio_buffer = wave_file.readframes(wave_file.getnframes())

    # Convert the audio buffer to a numpy array with 16-bit signed samples
    audio = np.frombuffer(audio_buffer, dtype=np.int16)

    # Transcribe the audio using the DeepSpeech model
    text = model.stt(audio)

    return text