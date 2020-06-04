import React from "react";
import Switch from "react-switch";

const Settings = (props) => {
    return (
        <div>
            <span>Light theme</span>
            <Switch
                onChange={props.themeChange}
                checked={props.lightTheme}
                offColor="#373842"
                onColor="#FBD000"
                id="lightTheme"
            />
            <label>
                Выберите сложность:
                <select value={props.level} onChange={props.handleChange} id="level">
                    <option value="1">Очень легко</option>
                    <option value="2">Легко</option>
                    <option value="3">Средне</option>
                    <option value="4">Сложно</option>
                </select>
            </label>
        </div>
    );
};


export default Settings