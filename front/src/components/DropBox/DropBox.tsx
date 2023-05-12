import React, { useState } from "react";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import { Button, Box } from "@mui/material";

import styles from "./DropBox.module.scss";

type Props = {
    getFile: (file: File) => void;
};

const DropBox: React.FC<Props> = ({ getFile }) => {
    const [file, setFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState<boolean>(false);
    const [isWrongFormat, setIsWrongFormat] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files?.[0] || null);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        const allowedTypes = ["audio/wav"];
        if (allowedTypes.includes(file.type)) {
            setFile(file || null);
        } else {
            setIsWrongFormat(true);
            setTimeout(() => setIsWrongFormat(false), 3000);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(true);
    };

    return (
        <div
            className={styles.DropBox}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={() => setDragging(false)}
        >
            {file ? (
                <div className={styles.DropBox__fileUpload}>
                    <p>Выбранный файл: {file.name}</p>
                    <Button variant="contained" onClick={() => getFile(file)}>
                        Отправить
                    </Button>
                    <Button variant="contained" onClick={() => setFile(null)}>
                        Очистить
                    </Button>
                </div>
            ) : (
                <>
                    <div className={styles.DropBox__consolePanel}>
                        {isWrongFormat && (
                            <Box sx={{ color: "warning.main" }}>
                                Не верный формат файла
                            </Box>
                        )}
                    </div>

                    <MoveToInboxIcon
                        style={{ color: dragging ? "gray" : "whitesmoke" }}
                        fontSize="large"
                    />
                    <div className={styles.DropBox__downloadTypesInfo}>
                        <div className={styles.DropBox__text}>
                            {dragging ? (
                                "Скиньте файл сюда"
                            ) : (
                                <>
                                    Перетащите ваш файл сюда <br /> или
                                </>
                            )}
                        </div>

                        <Button
                            variant="contained"
                            disabled={dragging}
                            component="label"
                        >
                            Загрузите файл
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                                accept=".wav"
                            />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export { DropBox };
