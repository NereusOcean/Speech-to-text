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


@app.route('/')
def fff():
    return "FUCK"

if __name__ == '__main__':
    app.run(host='0.0.0.0')


# import kaldi
#
# # create a 3x3 matrix
# mat = kaldi.matrix.Matrix(3, 3)
#
# # set some values
# mat[0, 0] = 1.0
# mat[1, 1] = 2.0
# mat[2, 2] = 3.0
#
# # print the matrix
# print(mat)
