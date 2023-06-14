from flask import Flask, request, jsonify
from flask_cors import CORS
from custom_speech_recognition import Speech_recognition
from custom_vosk import VOSK
from custom_deepspeech import deepspeech_transcribe

nameFile = "wavFileFromFront.wav"

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():

    file = request.files[request.form.get('type')]

    file.save(nameFile)
    method = request.form.get('method')
    print(method)
    if method == "SpeechRecognition":
        return Speech_recognition(nameFile)
    elif method == "Vosk":
        return VOSK(nameFile)
    elif method == "deepspeech":
        return deepspeech_transcribe(nameFile,"./models/deepspeech-0.9.3-models.pbmm","./models/deepspeech-0.9.3-models.scorer")


if __name__ == '__main__':
    app.run(host='0.0.0.0')

