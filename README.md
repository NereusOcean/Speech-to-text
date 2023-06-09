# Speech-to-text
### Инструкция по запуску.
С самого начала надо подготовить модели.

Создаем папку для них.
 ```
 cd server
 mkdir models
 cd models
 mkdir vosk-model
 ```
 Далее скачиваем готовые модели. Это может занять некоторое время. 
Модели можно скать через терминал:
 ```
 cd vosk-model
 wget https://alphacephei.com/vosk/models/vosk-model-small-ru-0.22.zip
 ```
 Модель выше на 45 МБ. Для более хороших результатов надо скачать более тяжеловестную модель на 2.5 GB:
```
wget https://alphacephei.com/vosk/models/vosk-model-ru-0.10.zip
```
все файлы модели надо будер разархировать в папку vosk-model из папки vosk-model-*-*-0.22.
 
 Далее скачиваем DeepSpeech.
 ```
 cd ..
 wget https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.pbmm
 wget https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.scorer
 ```
Или на прямую через официальные сайты:  
[Vosk](https://alphacephei.com/vosk/models)  
[DeepSpeech](https://github.com/mozilla/DeepSpeech/releases)

Запускаем проект через Docker из корня проекта:
```
cd ../..
docker-compose up
```
это может занять некоторое время.

После коректного запуска докер контейнеров перейдя по порту 3000 можно будет взаимодействовать с моделями по преобразованию речи в текст.
