import React, { useCallback, useEffect, useState } from "react";
import { IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MicIcon from "@mui/icons-material/Mic";

import {
    AudioRecorder,
    CheckBoxGroup,
    CopyToClipboardButton,
    DropBox,
} from "../components";

import styles from "./MainPage.module.scss";
import axios from "axios";
import CreateAndDownloadFile from "../components/createAndDownloadFile/createAndDownloadFile";

const MainPage = () => {
    const [wavFile, setWavFile] = useState<File | null>(null);
    const [wavBlob, setWavBlob] = useState<Blob | null>(null);
    const [convertedTextFromAudio, setConvertedTextFromAudio] =
        useState<string>("");
    const [methodRecognition, setMethodRecognition] =
        useState("SpeechRecognition");

    const [isRecordMic, setIsRecordMic] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const wavToText = () => {
        const formData = new FormData();
        if (wavBlob) {
            formData.append("blob", wavBlob, "rec.wav");
            formData.append("type", "blob");
        } else if (wavFile) {
            formData.append("file", wavFile);
            formData.append("type", "file");
        }
        formData.append("method", methodRecognition);

        setIsLoading(true);
        axios
            .post("http://127.0.0.1:5000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(text => {
                setConvertedTextFromAudio(text.data);
                setIsLoading(false);
            })
            .catch(error => {
                setConvertedTextFromAudio(error.message);
                setIsLoading(false);
                console.log(error);
            });
    };

    useEffect(() => {
        if (wavFile || wavBlob) wavToText();
    }, [wavFile, wavBlob]);

    return (
        <div className={styles.MainPage}>
            <h1>SPEECH to TEXT</h1>
            {wavFile || wavBlob ? (
                <div>
                    {isLoading ? (
                        <div className={styles.loader} />
                    ) : (
                        <div className={styles.MainPage__answer}>
                            <div className={styles.MainPage__btnsContainer}>
                                <IconButton
                                    color="primary"
                                    component="label"
                                    onClick={() => {
                                        setWavFile(null);
                                        setWavBlob(null);
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <div>
                                    <CreateAndDownloadFile
                                        fileName={`${
                                            wavFile?.name || "Record"
                                        }.txt`}
                                        content={convertedTextFromAudio}
                                    />
                                    <CopyToClipboardButton
                                        text={convertedTextFromAudio}
                                    />
                                </div>
                            </div>
                            <div className={styles.MainPage__textRes}>
                                <Box component="div" sx={{ overflow: "auto" }}>
                                    {convertedTextFromAudio}
                                </Box>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {isRecordMic ? (
                        <AudioRecorder onSave={file => setWavBlob(file)} />
                    ) : (
                        <DropBox getFile={setWavFile} />
                    )}

                    <div className={styles.MainPage__toolBar}>
                        <IconButton
                            component="label"
                            onClick={() => setIsRecordMic(prev => !prev)}
                        >
                            <MicIcon color="action" sx={{ fontSize: 30 }} />
                        </IconButton>
                        <div className={styles.MainPage__choise}>
                            <CheckBoxGroup
                                setMethod={(meth: string) =>
                                    setMethodRecognition(meth)
                                }
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export { MainPage };
