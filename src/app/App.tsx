import {useEffect, useRef, useState} from "react";
import "./index.scss";
import mainData from "../constants/data";
import {DateType, NumberAnimationStatus, PropsContext} from "../context/context";
import * as React from "react";
import {Swiper} from "swiper/types";
import Desktop from "../pages/Desktop/Desktop";
import Mobile from "../pages/Mobile/Mobile";

export default function App () {
    const [swiperInstance, setSwiperInstance] = useState<Swiper | null>(null);
    const [activeDataIndex, setActiveDataIndex] = useState<number>(0);
    const [activeMessageIndex, setActiveMessageIndex] = useState<number>(0);
    const [previousDataIndex, setPreviousDataIndex] = useState<number>(0);
    const [rotationAngle, setRotationAngle] = useState<number>(0);
    const [currentDates, setCurrentDates] = useState<DateType>(mainData[0].dates);
    const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [isNumberAnimationRunning, setIsNumberAnimationRunning] = useState<NumberAnimationStatus>('not rolling');
    const pointsRef = useRef<SVGCircleElement[]>([]);
    const isAnimating = useRef<boolean>(false);
    const currentAnglesRef = useRef<number[]>([]);
    const startDateRef = useRef<HTMLSpanElement>(null);
    const endDateRef = useRef<HTMLSpanElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const swiperContainerRef = useRef<HTMLDivElement | null>(null);
    const divBlock = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<SVGTextElement[]>([]);
    const divRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkWidth = () => {
            if (divRef.current) {
                const width = divRef.current.offsetWidth;
                setIsMobile(width < 1280);
            }
        };

        checkWidth();

        window.addEventListener('resize', checkWidth);

        return () => {
            window.removeEventListener('resize', checkWidth);
        };
    }, []);

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
            textRef,
            divRef,
            isMobile
        }}>
            <div ref={divRef} className='containerForDesign'>
                {isMobile ? <Mobile /> : <Desktop />}
            </div>
</PropsContext>
    )
}