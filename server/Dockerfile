# Base image
FROM python:3.8

# Set the working directory
WORKDIR /server

# Install the requirements
RUN apt-get update && apt-get install -y ffmpeg
RUN pip install --upgrade pip
RUN pip install flask_cors
RUN pip install SpeechRecognition
RUN pip install pydub
RUN pip install librosa
RUN pip install deepspeech
RUN pip install vosk


COPY . /server
# Устанавливаем порт, который будет использоваться для сервера
EXPOSE 5000

# Start the application
CMD ["python3", "main.py"]
