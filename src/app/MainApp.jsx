import React, {useRef, useState} from "react";
import {Meassages} from "./messages.jsx";
import {PropsContext} from "./Context.jsx"
import Circle from "./circle.jsx";
import DateAnimation from './date.jsx'
import "./index.scss";
import {title} from "./consts.js";
import mainData from "./mainData";
import {Swiper, SwiperSlide} from "swiper/react";
import './messages.scss'
//import MessageSwiperWithGSAP from "./Example.jsx";
export default function MainApp () {
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [activeDataIndex, setActiveDataIndex] = useState(0);
    const [activeMessageIndex, setActiveMessageIndex] = useState(0);
    const [previousDataIndex, setPreviousDataIndex] = useState(0);
    const pointsRef = useRef([]);
    const [rotationAngle, setRotationAngle] = useState(0);
    const isAnimating = useRef(false);
    const currentAnglesRef = useRef([]);
  //  const [currentIndex, setCurrentIndex] = useState(0);
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
    // Навигация по messages (нижние кнопки)
    const handleNextMessage = () => {
        if (swiperInstance && activeMessageIndex < currentMessages.length - 1) {
            swiperInstance.slideNext();
        }
    };

    const handlePrevMessage = () => {
        if (swiperInstance && activeMessageIndex > 0) {
            swiperInstance.slidePrev();
        }
    };



    // Переход к конкретному массиву данных
    const goToDataIndex = (index) => {
        if (index >= 0 && index < mainData.length) {
            setPreviousDataIndex(activeDataIndex)
            setActiveDataIndex(index);
            setActiveMessageIndex(0);
        }
    };
    // Текущий массив сообщений
    const currentMessages = mainData[activeDataIndex].messages || [];
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
<div className='maino'>
            {/*  <AdvancedPointsOnCircle />*/}
            {/*     <MessageSwiperWithGSAP />*/}
    <div className='innerContainer' ref={divBlock}>

        <div className='titleAndCircle'>
            <div className='title'>{title}</div>
            <div className='circleAndDate'>

            </div>

            <Circle/>
            <DateAnimation/>
        </div>
        <div className="messages-section">
            <Meassages/>
        </div>

        {/* Нижние кнопки - навигация по messages */}


    </div>

    {activeMessageIndex !== 0 ? <button
        onClick={handlePrevMessage}
        disabled={activeMessageIndex === 0}
        className="nav-buttonMessages previous-buttonMessages"
    >
    </button> : <></>}

                {activeMessageIndex !== currentMessages.length - 1 ? <button
                    onClick={handleNextMessage}
                    disabled={activeMessageIndex === currentMessages.length - 1}
                    className="nav-buttonMessages next-buttonMessages"
                >
                </button> : <></>}
    </div>



        </PropsContext>
    )
}