import React from "react";
import { IconButton } from "@mui/material";
import DownloadingIcon from "@mui/icons-material/Downloading";

function createAndDownloadFile(
    fileName: string,
    content: string | Blob | File,
) {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
}

type Props = {
    fileName: string;
    content: string | Blob | File;
};

const DownloadFileButton: React.FC<Props> = ({ fileName, content }) => {
    const handleClick = () => {
        createAndDownloadFile(fileName, content);
    };

    return (
        <IconButton onClick={handleClick} color="primary">
            <DownloadingIcon />
        </IconButton>
    );
};

export default DownloadFileButton;
