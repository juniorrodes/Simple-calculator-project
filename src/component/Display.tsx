import React from "react";

import "./Display.css";
type DisplayProps = {
    value: string;
}

export default class Display extends React.Component<DisplayProps>{
    render(){
        return(
            <div className="component-display">
                <div>{this.props.value}</div>
            </div>
        )
    }
}