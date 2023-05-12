import os
import json
import wave

import vosk
import librosa
import soundfile as sf

def VOSK(wav_file):
    # Load the Vosk model
    model = vosk.Model("./models/vosk-model")
    x, _ = librosa.load(wav_file, sr=16000)
    sf.write('tmp.wav', x, 16000)

    # Open the WAV file
    with wave.open("tmp.wav", "rb") as audio_file:
        sample_rate = audio_file.getframerate()

        # Initialize the Vosk recognizer
        recognizer = vosk.KaldiRecognizer(model, sample_rate)

        # Read audio data and process it in chunks
        chunk_size = 4000
        data = audio_file.readframes(chunk_size)
        while len(data) > 0:
            recognizer.AcceptWaveform(data)
            data = audio_file.readframes(chunk_size)

        # Get the recognition result
        result = json.loads(recognizer.FinalResult())

        # Return the recognized text
        return result["text"]
