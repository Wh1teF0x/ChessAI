import React from "react";

import AiChessboard from "../AI/board"
import Settings from "../Menus/settings"
import "../index.scss"

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lightTheme: false,
            level: 2,
            game: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleThemeClick = this.handleThemeClick.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleThemeClick(event) {
        this.setState({lightTheme: !this.state.lightTheme});
    }

    render() {
        let theme = this.state.lightTheme ? "app dark" : "app light";
        return (
            <div className={theme}>
                <Settings
                    themeChange={this.handleThemeClick}
                    lightTheme={this.state.lightTheme}
                    level={this.state.level}
                    handleChange={this.handleChange}
                />
                <AiChessboard
                    game={this.state.game}/>
            </div>
        );
    }
}


export default Board


