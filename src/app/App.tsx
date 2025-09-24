import {useRef, useState} from "react";
import "./index.scss";
import Circle from "../components/mainComponents/Circle/Circle";
import mainData from "../constants/data";
import {DateType, NumberAnimationStatus, PropsContext} from "../context/context";
import Slider from "../components/mainComponents/Slider/Slider";
import BottomButtons from "../components/mainComponents/BottomButtons/BottomButtons";
import DateCircle from "../components/mainComponents/DateCircle/DateCircle";
import Title from "../components/mainComponents/Title/Title";
import * as React from "react";
import {Swiper} from "swiper/types";

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
    //RefObject<HTMLSpanElement>
    const pointsRef = useRef<SVGCircleElement[]>([]);
    const isAnimating = useRef<boolean>(false);
    const currentAnglesRef = useRef<number[]>([]);
    const startDateRef = useRef<HTMLSpanElement>(null);
    const endDateRef = useRef<HTMLSpanElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);//useRef<number | null>(null);
    const swiperContainerRef = useRef<HTMLDivElement | null>(null);
    const divBlock = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<SVGTextElement[]>([]);

    /* const [swiperInstance, setSwiperInstance] = useState(null);
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


    */

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
            <div>
            <div className='main'>
                <div className='innerContainer' ref={divBlock}>
                    <div className='titleAndCircle'>
                        <Title />
                        <div className='circleAndDate'>
                        </div>
                        <Circle/>
                        <DateCircle />
                    </div>
                <div className="messages-section">
                    <Slider />
                </div>
            </div>
<BottomButtons />
        </div>
            </div>
</PropsContext>
    )
}