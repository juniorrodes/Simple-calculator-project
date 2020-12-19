import React, {FunctionComponent} from 'react'
import "./Button.css"

type ButtonProps = {
    clickHandler: Function;
    wide?: boolean;
    red?: boolean;
    green?: boolean
    name: string;
};

const Button: FunctionComponent<ButtonProps> = (props) => {

    const handleClick = () =>{
        props.clickHandler(props.name);
    };

    const className = [
        "component-button",
        props.wide ? "wide" : "",
        props.red ? "red" : "",
        props.green ? "green" : "", 
    ];

    return(
    <div className={className.join(" ").trim()}>
        <button onClick={handleClick}>{props.name}</button>
    </div>
    )
}

export default Button;