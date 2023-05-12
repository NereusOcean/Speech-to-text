import speech_recognition as sr
from pydub import AudioSegment
from pydub.silence import split_on_silence

def Speech_recognition(filename):
    # Load the audio file
    sound_file = AudioSegment.from_file(filename)

    # Split the audio file on silence
    chunks = split_on_silence(sound_file, silence_thresh=-100)

    # Initialize the recognizer
    r = sr.Recognizer()

    # Process each chunk
    for i, chunk in enumerate(chunks):
        # Export the chunk to a temporary WAV file
        chunk.export(f"chunk{i}.wav", format="wav")

        # Load the temporary WAV file
        with sr.AudioFile(f"chunk{i}.wav") as source:
            # Listen for speech and store it as audio data
            audio = r.record(source)

        # Recognize speech using Google Speech Recognition
        try:
            text = r.recognize_google(audio, language="ru-RU")
            return text
        except sr.UnknownValueError:
            return ("Could not understand audio")
        except sr.RequestError as e:
            return(f"Error: {e}")