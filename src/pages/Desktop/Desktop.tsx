import Title from "../../components/mainComponents/Title/Title";
import Circle from "../../components/mainComponents/Circle/Circle";
import DateCircle from "../../components/mainComponents/DateCircle/DateCircle";
import Slider from "../../components/mainComponents/Slider/Slider";
import BottomButtons from "../../components/mainComponents/BottomButtons/BottomButtons";
import * as React from "react";
import {useContext} from "react";
import {PropsContext} from "../../context/context";
import './desktop.scss'

export default function Desktop () {
    const { divBlock
    } = useContext(PropsContext);

    return (
        <div className='main'>
            <div className='innerContainer' ref={divBlock}>
                <div className='titleAndCircle'>
                    <Title/>
                    <div className='circleAndDate'>
                    </div>
                    <Circle/>
                    <DateCircle/>
                </div>
                <div className="messages-section">
                    <Slider/>
                </div>
            </div>
            <BottomButtons/>
        </div>
)
}