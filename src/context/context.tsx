import {createContext} from "react";
import { Swiper } from 'swiper/types';
import * as React from "react";
export type NumberAnimationStatus = 'not rolling' | 'done rolling' | '';
export type DateType = number[]
interface AppContextType {

    swiperInstance: Swiper | null;
    setSwiperInstance: React.Dispatch<React.SetStateAction<Swiper | null>>;


    activeDataIndex: number;
    setActiveDataIndex: React.Dispatch<React.SetStateAction<number>>;
    activeMessageIndex: number;
    setActiveMessageIndex: React.Dispatch<React.SetStateAction<number>>;
    previousDataIndex: number;
    setPreviousDataIndex: React.Dispatch<React.SetStateAction<number>>;


    pointsRef: React.RefObject<SVGCircleElement[]>; //RefObject<SVGCircleElement[]> было React.RefObject<HTMLElement[]>
    swiperContainerRef: React.RefObject<HTMLDivElement | null>;
    divBlock: React.RefObject<HTMLDivElement | null>;
    textRef: React.RefObject<SVGTextElement[]>;


    rotationAngle: number;
    setRotationAngle: React.Dispatch<React.SetStateAction<number>>;
    isAnimating: React.RefObject<boolean>;
    currentAnglesRef: React.RefObject<number[]>;
    animationRef:React.RefObject<gsap.core.Tween | null>;

    currentDates: DateType;
    setCurrentDates: React.Dispatch<React.SetStateAction<DateType>>;
    startDateRef: React.RefObject<HTMLSpanElement>; // было React.RefObject<number | undefined>
    endDateRef: React.RefObject<HTMLSpanElement>;// было React.RefObject<number | undefined

    shouldAnimate: boolean;
    setShouldAnimate: React.Dispatch<React.SetStateAction<boolean>>;
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isNumberAnimationRunning: NumberAnimationStatus;
    setIsNumberAnimationRunning: React.Dispatch<React.SetStateAction<NumberAnimationStatus>>;
}

export const PropsContext = createContext<AppContextType>({} as AppContextType);