import * as React from "react";
import './text.scss'

type Props = {
    text: string;
}

export default function Text ({text}:  Props ) {
    return (
    <div className="message-text">{text}</div>
    )
}