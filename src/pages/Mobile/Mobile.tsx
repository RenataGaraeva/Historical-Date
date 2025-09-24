import * as React from "react";
import Title from "../../components/mainComponents/Title/Title";
import Slider from "../../components/mainComponents/Slider/Slider";
import DateCircle from "../../components/mainComponents/DateCircle/DateCircle";
import './mobile.scss'

export default function Mobile () {
    return (
        <div className='containerForMobile'>
            <Title />
        <DateCircle />
            <Slider />
        </div>
    )
}