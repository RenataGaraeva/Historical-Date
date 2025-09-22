//const React = require("react");
import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components';
import SwiperTool from "./swiper.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import mainData from './mainData.js'
import {PropsContext} from "./Context.jsx";
import {radius, centerX, centerY, numPoints, points} from "./consts.js";
import {animateToNextPeriod} from "./date.jsx";
import './messages.scss'
import { gsap } from 'gsap';
import {rotatePoints} from "./rotatePoints.jsx";
export function Meassages () {
    const { swiperInstance,
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
        previousDataIndex,
        setPreviousDataIndex,
        swiperContainerRef,
        shouldAnimate,
        setShouldAnimate,
        setIsVisible,
        isNumberAnimationRunning,
        setShouldAnimateSwiper,
        startNumberAnimation,
        messageSwiperRef,
        setIsNumberAnimationRunning,
        textRef





    } = useContext(PropsContext);


// Компонент для отображения списка записей
  /*  const MessageList = ({messages}) => {
        // Проверка на пустой массив или отсутствие данных
        if (!messages || messages.length === 0) {
            return <div className="no-messages">Нет сообщений для отображения</div>;
        }


   */

    const MessagesContainer = styled.div`
  display: flex;
  flex-direction: row; /* Элементы в ряд */
  gap: 20px; /* Расстояние между элементами */
  padding: 20px;
  overflow-x: auto; /* Горизонтальная прокрутка если нужно */
  border-radius: 12px;
  margin: 20px 0;
`;

    const MessageCard = styled.div`
  flex: 0 0 auto; /* Не растягивается, не сжимается */
  width: 250px;
  min-height: 150px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #007bff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

    const MessageDate = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
  font-weight: 500;
`;

    const MessageText = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #333;
`;

    const Title = styled.h2`
  color: #333;
  margin-bottom: 15px;
  font-size: 24px;
`;

    // Текущий массив сообщений
    const currentMessages = mainData[activeDataIndex].messages || [];

    // Навигация по mainData (верхние кнопки)
    const handleNextData = () => {
        if (activeDataIndex < mainData.length - 1) {
            setIsNumberAnimationRunning('')
            setPreviousDataIndex(activeDataIndex)
            setActiveDataIndex(activeDataIndex + 1);
            setActiveMessageIndex(0); // Сбрасываем к первому сообщению
            // Сначала запускаем анимацию исчезновения swiper
          /*  setShouldAnimateSwiper(true);

            // Запускаем анимацию чисел
            startNumberAnimation(() => {
                // Этот callback вызовется когда анимация чисел завершится
                setActiveDataIndex(activeDataIndex + 1);
                setShouldAnimateSwiper(false);

                // Показываем swiper снова
                messageSwiperRef.current?.showSwiper();
            });

           */
           setShouldAnimate(true);
            setTimeout(() => {
                setActiveDataIndex(activeDataIndex + 1);
                setShouldAnimate(false);
            }, 100); // Небольшая задержка для начала анимации


            rotatePoints(pointsRef, currentAnglesRef, centerX, radius,
                centerY, points, textRef)
            let previousIndex = activeDataIndex
            let activeIndex = activeDataIndex + 1
            animateToNextPeriod(activeIndex, currentDates, animationRef, setCurrentDates, setActiveDataIndex,  previousIndex, setIsNumberAnimationRunning)
        }
    };

    const handlePrevData = () => {
        if (activeDataIndex > 0) {
            setIsNumberAnimationRunning('')
            setPreviousDataIndex(activeDataIndex)
            setActiveDataIndex(activeDataIndex - 1);
            setActiveMessageIndex(0); // Сбрасываем к первому сообщению
         setShouldAnimate(true);
            setTimeout(() => {
                setActiveDataIndex(activeDataIndex - 1);
                setShouldAnimate(false);
            }, 100);
            rotatePoints(pointsRef, currentAnglesRef, centerX, radius,
                centerY, points, textRef)
            let previousIndex = activeDataIndex
            let activeIndex = activeDataIndex - 1
            animateToNextPeriod(activeIndex, currentDates, animationRef, setCurrentDates, setActiveDataIndex,  previousIndex, setIsNumberAnimationRunning)
        }
    };

    const handleSlideChange = (swiper) => {
        setActiveMessageIndex(swiper.activeIndex);
    };

    const handleSwiper = (swiper) => {
        setSwiperInstance(swiper);
        // Устанавливаем начальную позицию
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

    const animateSwiper = () => {
        const container = swiperContainerRef.current;
        if (!container) return;

        // Определяем направление анимации
        const direction = activeDataIndex > previousDataIndex ? 1 : -1;

        // Анимация исчезновения
        gsap.to(container, {
            opacity: 0,
            x: 100 * direction, // Сдвиг в сторону
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
                // После исчезновения - появление с новой позиции
               gsap.set(container, {
                    opacity: 0,
                    x: -100 * direction
                });

                gsap.to(container, {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power2.inOut"
                });
            }
        });

        setPreviousDataIndex(activeDataIndex);
    };
    const animateFade = () => {
        const container = swiperContainerRef.current;

        // Исчезновение (растворение)
        gsap.to(container, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
                setIsVisible(false);
                // Сообщаем родителю, что анимация исчезновения завершена
             //   onAnimationComplete?.();
            }
        });
    };

    // Функция для появления (вызывается извне)
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

                {/* Верхние кнопки - навигация по mainData */}

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
                    key={activeDataIndex} // Важно: пересоздаем Swiper при смене массива
                >
                    {currentMessages.map((message, index) => (
                        <SwiperSlide key={index}>
                            <div className="message-item">
                                <div className="message-date">
                                    {message.date}
                                </div>
                                <div className="message-text">{message.text}</div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
                {/* ДЛЯ ТЕЛЕФОННОЙ ВЕРСИИ Быстрая навигация по наборам
                <div className="data-quick-nav">
                    {mainData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToDataIndex(index)}
                            className={`quick-nav-button ${activeDataIndex === index ? 'active' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                */}


                {/* Swiper с сообщениями текущего массива */}

            </div>
            );
            };
/*
export const animateFade = (swiperContainerRef, setIsVisible, onAnimationComplete) => {
    const container = swiperContainerRef.current;

    // Исчезновение (растворение)
    gsap.to(container, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
            setIsVisible(false);
            // Сообщаем родителю, что анимация исчезновения завершена
            onAnimationComplete?.();
        }
    });
};

// Функция для появления (вызывается извне)
export const showSwiper = (swiperContainerRef, setIsVisible) => {
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

 */