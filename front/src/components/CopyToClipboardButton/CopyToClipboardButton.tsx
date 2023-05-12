import { IconButton, Snackbar } from "@mui/material";
import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

type Props = {
    text: string;
};

const CopyToClipboardButton: React.FC<Props> = ({ text }) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <IconButton onClick={handleClick} color="primary">
                <ContentCopyIcon />
            </IconButton>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                message="Copied to clipboard"
            />
        </>
    );
};

export { CopyToClipboardButton };
