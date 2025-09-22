    import {useContext, useRef, useState} from 'react';
    import { gsap } from 'gsap';
    import mainData from "./mainData.js";
    import {PropsContext} from "./Context.jsx";
    import './date.scss'

    export const animateToNextPeriod = (activeDataIndex, currentDates, animationRef, setCurrentDates,
                                        setActiveDataIndex,   previousDataIndex,
                                        setIsNumberAnimationRunning
    ) => {
        if (activeDataIndex > mainData.length - 1) return;

        const pastIndex = previousDataIndex;
        const activeIndex = activeDataIndex
        console.log('dates', mainData[pastIndex].dates)
        console.log('currentDates', currentDates)
        console.log('targetDates', mainData[activeIndex].dates)
        const pastDates = mainData[pastIndex].dates
        const targetDates = mainData[activeIndex].dates;
        const [currentStart, currentEnd] = pastDates;
        const [targetStart, targetEnd] = targetDates;

        // Останавливаем предыдущую анимацию если есть
        if (animationRef.current) {
            animationRef.current.kill();
        }

        // Создаем объекты для анимации
        const animationData = {
            startDate: currentStart,
            endDate: currentEnd
        };

        // Анимация с GSAP
        animationRef.current = gsap.to(animationData, {
            startDate: targetStart,
            endDate: targetEnd,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
                setCurrentDates([Math.round(animationData.startDate), Math.round(animationData.endDate)]);
            },
            onComplete: () => {
                setIsNumberAnimationRunning('done rolling')
                //    console.log('ok') setActiveDataIndex(nextIndex);
                //setCurrentDates(targetDates);
            }
        });

    };
   export default function DateAnimation() {
       const {
           activeDataIndex,
           setActiveDataIndex,
           animationRef,
           setCurrentDates,
           currentDates,
           endDateRef,
           startDateRef,
           previousDataIndex,
           setPreviousDataIndex

       } = useContext(PropsContext);



        const resetAnimation = () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
            setActiveDataIndex(0);
            setCurrentDates(mainData[0].dates);
        };

        return (
            <div style={{ textAlign: 'center' }} className='dates'>

                <div >
        <span ref={startDateRef} style={{ fontWeight: 'bold', color: '#ff6b6b' }}>
          {currentDates[0]}
        </span>
                    {' '}
                    <span ref={endDateRef} style={{ fontWeight: 'bold', color: '#4a90e2' }}>
          {currentDates[1]}
        </span>
                </div>

            </div>
        );
    }