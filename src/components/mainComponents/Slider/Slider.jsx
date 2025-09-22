import React, {useContext, useEffect, useState} from 'react'
//import SwiperTool from "./swiper.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './slider.scss'
import { gsap } from 'gsap';
import {animateToNextPeriod, rotatePoints} from "../../../functions/functions.js";
import mainData, {centerX, centerY, radius} from "../../../constants/data.js";
import {PropsContext} from "../../../context/context.jsx";
import Text from '../../templateComponents/Text/Text.jsx'
import Date from '../../templateComponents/Date/Date.jsx'
export function Slider () {
    const {
        setSwiperInstance,
        activeDataIndex,
        setActiveDataIndex,
        activeMessageIndex,
        setActiveMessageIndex,
        pointsRef,
        currentAnglesRef,
        animationRef,
        setCurrentDates,
        currentDates,
        setPreviousDataIndex,
        swiperContainerRef,
        shouldAnimate,
        setShouldAnimate,
        setIsVisible,
        isNumberAnimationRunning,
        setIsNumberAnimationRunning,
        textRef
            } = useContext(PropsContext);


    const currentMessages = mainData[activeDataIndex].messages || [];

    const handleNextData = () => {
        if (activeDataIndex < mainData.length - 1) {
            setIsNumberAnimationRunning('')
            setPreviousDataIndex(activeDataIndex)
            setActiveDataIndex(activeDataIndex + 1);
            setActiveMessageIndex(0);
            setShouldAnimate(true);
            setTimeout(() => {
                setActiveDataIndex(activeDataIndex + 1);
                setShouldAnimate(false);
            }, 100);


            rotatePoints(pointsRef, currentAnglesRef, centerX, radius, centerY, textRef,  mainData)
            let previousIndex = activeDataIndex
            let activeIndex = activeDataIndex + 1
           animateToNextPeriod(activeIndex, currentDates, animationRef,
                setCurrentDates, setActiveDataIndex,  previousIndex, setIsNumberAnimationRunning, mainData)
        }
    };

    const handlePrevData = () => {
        if (activeDataIndex > 0) {
            setIsNumberAnimationRunning('')
            setPreviousDataIndex(activeDataIndex)
            setActiveDataIndex(activeDataIndex - 1);
            setActiveMessageIndex(0);
            setShouldAnimate(true);
            setTimeout(() => {
                setActiveDataIndex(activeDataIndex - 1);
                setShouldAnimate(false);
            }, 100);
            rotatePoints(pointsRef, currentAnglesRef, centerX, radius,
                centerY, textRef, mainData)
            let previousIndex = activeDataIndex
            let activeIndex = activeDataIndex - 1
            animateToNextPeriod(activeIndex, currentDates, animationRef,
                setCurrentDates, setActiveDataIndex,  previousIndex, setIsNumberAnimationRunning, mainData)
        }
    };

    const handleSlideChange = (swiper) => {
        setActiveMessageIndex(swiper.activeIndex);
    };

    const handleSwiper = (swiper) => {
        setSwiperInstance(swiper);
        swiper.slideTo(activeMessageIndex);
    };
    useEffect(() => {
        if (shouldAnimate && swiperContainerRef.current) {
            animateFade();
        }
    }, [shouldAnimate]);

    useEffect(() => {
        if (isNumberAnimationRunning === 'done rolling') {
            showSwiper()
        }
    }, [isNumberAnimationRunning]);

    const animateFade = () => {
        const container = swiperContainerRef.current;

        gsap.to(container, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
                setIsVisible(false);
            }
        });
    };

    const showSwiper = () => {
        if (swiperContainerRef.current) {
            setIsVisible(true);
            gsap.to(swiperContainerRef.current, {
                opacity: 1,
                duration: 0.8,
                ease: "power2.inOut",
                delay: 0.1
            });
        }
    };
    return (
        <div className='containerForMessages'>
            <div className="messages-container">
                <div className="counter">
                    {`0${activeDataIndex + 1}`} / {`0${mainData.length}`}
                </div>

                <div className="navigation-buttons">
                    <button
                        onClick={handlePrevData}
                        disabled={activeDataIndex === 0}
                        className="nav-button previous-button"
                    >
                    </button>


                    <button
                        onClick={handleNextData}
                        disabled={activeDataIndex === mainData.length - 1}
                        className="nav-button next-button"
                    >
                    </button>
                </div>


            </div>
            <div ref={swiperContainerRef} className="swiper-container">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={2}
                    onSlideChange={handleSlideChange}
                    onSwiper={handleSwiper}
                    className="messages-swiper"
                    key={activeDataIndex}
                >
                    {currentMessages.map((message, index) => (
                        <SwiperSlide key={index}>
                            <div className="message-item">
                                <Date date = {message.date} />
                                <Text text = {message.text} />

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
