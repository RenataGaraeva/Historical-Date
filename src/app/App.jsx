import React, {useRef, useState} from "react";
import "./index.scss";
import Circle from "../components/Circle.jsx";
import mainData, {title} from "../constants/data.js";
import {PropsContext} from "../context/context.jsx";

export default function App () {
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [activeDataIndex, setActiveDataIndex] = useState(0);
    const [activeMessageIndex, setActiveMessageIndex] = useState(0);
    const [previousDataIndex, setPreviousDataIndex] = useState(0);
    const pointsRef = useRef([]);
    const [rotationAngle, setRotationAngle] = useState(0);
    const isAnimating = useRef(false);
    const currentAnglesRef = useRef([]);
    const [currentDates, setCurrentDates] = useState(mainData[0].dates);
    const startDateRef = useRef();
    const endDateRef = useRef();
    const animationRef = useRef(null);
    const swiperContainerRef = useRef(null);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isNumberAnimationRunning, setIsNumberAnimationRunning] = useState('not rolling');
    const divBlock = useRef(null);
    const textRef = useRef([])

    return (
        <PropsContext value={{
            swiperInstance,
            setSwiperInstance,
            activeDataIndex,
            setActiveDataIndex,
            activeMessageIndex,
            setActiveMessageIndex,
            pointsRef,
            rotationAngle,
            isAnimating,
            setRotationAngle,
            currentAnglesRef,
            currentDates,
            setCurrentDates,
            startDateRef,
            endDateRef,
            animationRef,
            previousDataIndex,
            setPreviousDataIndex,
            swiperContainerRef,
            shouldAnimate,
            setShouldAnimate,
            isVisible,
            setIsVisible,
            isNumberAnimationRunning,
            setIsNumberAnimationRunning,
            divBlock,
            textRef
        }}>
            <div className='main'>
                <div className='innerContainer' ref={divBlock}>
                    <div className='titleAndCircle'>
                        <div className='circleAndDate'>
                        </div>
                       <Circle />
                    </div>
                </div>

            </div>
        </PropsContext>
    )
}