import React, { useRef, useState } from "react";
import { ReactMic } from "react-mic";

import styles from "./AudioRecorder.module.scss";
import { Button } from "@mui/material";
import CreateAndDownloadFile from "../createAndDownloadFile/createAndDownloadFile";

type Props = {
    onSave: (file: Blob) => void;
};

const AudioRecorder: React.FC<Props> = ({ onSave }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [blob, setBlob] = useState<Blob | null>(null);

    const handleStartRecording = () => {
        setIsRecording(true);
    };

    const handleStopRecording = (recordedBlob: Blob) => {
        setIsRecording(false);
        let blobWithProp = new Blob(
            // @ts-ignore
            [recordedBlob["blob"]],
            // @ts-ignore
            recordedBlob["options"],
        );
        setBlob(blobWithProp);
    };

    return (
        <div className={styles.AudioRecorder}>
            <ReactMic
                record={isRecording}
                className={styles.AudioRecorder__wave}
                onStop={handleStopRecording}
                mimeType="audio/wav"
                audioBitsPerSecond={64000}
                strokeColor="#FFFFFF"
                backgroundColor="#144670FF"
            />
            <div className={styles.AudioRecorder__controllers}>
                {!blob ? (
                    <>
                        {!isRecording && (
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleStartRecording}
                            >
                                Начать запись
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setIsRecording(false)}
                        >
                            Остановить запись
                        </Button>
                    </>
                ) : (
                    <>
                        {" "}
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => onSave(blob)}
                        >
                            Отправить на обработку
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setBlob(null)}
                        >
                            Очистить
                        </Button>
                        <CreateAndDownloadFile
                            fileName={`Record.wav`}
                            content={blob}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export { AudioRecorder };
