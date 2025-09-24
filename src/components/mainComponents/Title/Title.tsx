import './title.scss'
import {title} from "../../../constants/data";
import * as React from "react";

export default function Title () {
    return (
        <div className='title'>{title}</div>
    )
}