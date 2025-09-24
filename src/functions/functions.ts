import {DateType, NumberAnimationStatus} from "../context/context";

const isDefinedString = (value: string) =>
    typeof value === 'string' && value.length > 0;
export const cn = (...args: string[])=>
    args.filter((arg) => isDefinedString(arg)).join(' ');


import {gsap} from "gsap";
import {DataType} from "../constants/data";

export const rotatePoints = (pointsRef: React.RefObject<SVGCircleElement[]>, currentAnglesRef:  React.RefObject<number[]>, centerX: number, radius: number, centerY: number, textRef: React.RefObject<SVGTextElement[]>,  mainData: DataType) => {
    const angleStep = (2 * Math.PI) / mainData.length;
    const duration = 1;

    pointsRef.current.forEach((pointElement, index: number) => {
        if (!pointElement) return;

        const startAngle = currentAnglesRef.current[index];
        const endAngle = startAngle + angleStep;


        gsap.to(pointElement, {
            duration: duration,
            ease: "sine.inOut",
            onUpdate: function () {
                const progress = this.progress();
                const currentAngle = startAngle + (endAngle - startAngle) * progress;


                const newX = centerX + radius * Math.cos(currentAngle);
                const newY = centerY + radius * Math.sin(currentAngle);


                pointElement.setAttribute('cx', newX.toString());
                pointElement.setAttribute('cy', newY.toString());
                console.log('textRef', textRef)
                console.log('textRef.current', textRef.current)
                console.log('indexThis', index)
                console.log('textRef.current[index]', textRef.current[index])
                const textElement = textRef.current[index];
                if (textElement) {
                    textElement.setAttribute('x', newX.toString());
                    textElement.setAttribute('y', newY.toString());
                }


                currentAnglesRef.current[index] = currentAngle;
            },
            onComplete: function () {
                currentAnglesRef.current[index] = endAngle;


                const finalX = centerX + radius * Math.cos(endAngle);
                const finalY = centerY + radius * Math.sin(endAngle);
                pointElement.setAttribute('cx', finalX.toString());
                pointElement.setAttribute('cy', finalY.toString());


                const textElement = textRef.current[index];
                if (textElement) {
                    textElement.setAttribute('x', finalX.toString());
                    textElement.setAttribute('y', finalY.toString());
                }
            }
        });
    });
};

export const animateToNextPeriod = (activeDataIndex: number, currentDates: DateType, animationRef: React.RefObject<gsap.core.Tween | null>, setCurrentDates: (dates: DateType) => void,
                                    setActiveDataIndex: (index: number) => void,   previousDataIndex: number,
                                    setIsNumberAnimationRunning: React.Dispatch<React.SetStateAction<NumberAnimationStatus>>, mainData: DataType
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

    if (animationRef.current) {
        animationRef.current.kill();
    }

    const animationData = {
        startDate: currentStart,
        endDate: currentEnd
    };

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
        }
    });

};