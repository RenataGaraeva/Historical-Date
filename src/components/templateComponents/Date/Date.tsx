import './date.scss'
import * as React from "react";

type Props = {
    date: number;
}

export default function Date ({date}: Props ) {
    return (
    <div className="message-date">
        {date}
    </div>
    )
}