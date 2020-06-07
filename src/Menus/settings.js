import React from "react";
import {Switch, Slider} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

const Settings = (props) => {
    const marks = [
        {
            value: 1,
            label: 'Easy',
        },
        {
            value: 3,
            label: 'Hard',
        },
    ];
    return (
        <div className="content__plate settings">
            <div className="settings__slider">
                <Typography id="level-slider" gutterBottom>
                    Level
                </Typography>
                <Slider
                    value={props.level}
                    onChange={props.levelChange}
                    step={1}
                    min={1}
                    max={3}
                    marks={marks}
                    id="level"
                    aria-labelledby="level-slider"
                    valueLabelDisplay="off"
                />
            </div>
            <div className="settings__button" onClick={props.undoTurn}>Undo</div>
            <div className="settings__button" onClick={props.resetGame}>Reset</div>
            <div className="settings__switch">
                <FormControlLabel
                    control={<Switch
                        checked={props.theme}
                        onChange={props.themeChange}
                        name="lightTheme"
                        color="primary"
                    />}
                    label="Light theme"
                />
            </div>
        </div>
    );
};


export default Settings