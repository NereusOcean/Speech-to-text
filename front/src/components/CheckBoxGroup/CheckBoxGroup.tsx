import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

type Props = {
    setMethod: (val: string) => void;
};

const CheckBoxGroup: React.FC<Props> = ({ setMethod }) => {
    const initialState = {
        SpeechRecognition: false,
        Vosk: false,
        deepspeech: false,
        shit2: false,
        shit3: false,
    };
    const [checkBoxState, setCheckBoxState] = useState(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckBoxState({
            ...initialState,
            [event.target.name]: event.target.checked,
        });
        setMethod(event.target.name);
    };

    useEffect(() => {
        setCheckBoxState({
            ...initialState,
            SpeechRecognition: true,
        });
        setMethod("SpeechRecognition");
    }, []);

    const { SpeechRecognition, Vosk, deepspeech, shit2, shit3 } = checkBoxState;

    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={SpeechRecognition}
                        onChange={handleChange}
                        name="SpeechRecognition"
                    />
                }
                label="SpeechRecognition"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={Vosk}
                        onChange={handleChange}
                        name="Vosk"
                    />
                }
                label="Vosk"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={deepspeech}
                        onChange={handleChange}
                        name="deepspeech"
                    />
                }
                label="DeepSpeech"
            />
            {/*<FormControlLabel*/}
            {/*    control={*/}
            {/*        <Checkbox*/}
            {/*            checked={shit2}*/}
            {/*            onChange={handleChange}*/}
            {/*            name="shit2"*/}
            {/*        />*/}
            {/*    }*/}
            {/*    label="shit 2"*/}
            {/*/>*/}
            {/*<FormControlLabel*/}
            {/*    control={*/}
            {/*        <Checkbox*/}
            {/*            checked={shit3}*/}
            {/*            onChange={handleChange}*/}
            {/*            name="shit3"*/}
            {/*        />*/}
            {/*    }*/}
            {/*    label="shit 3"*/}
            {/*/>*/}
        </FormGroup>
    );
};

export { CheckBoxGroup };
