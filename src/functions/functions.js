
const isDefinedString = (value) =>
    typeof value === 'string' && value.length > 0;
export const cn = (...args)=>
    args.filter((arg) => isDefinedString(arg)).join(' ');


import {gsap} from "gsap";

export const rotatePoints = (pointsRef, currentAnglesRef, centerX, radius, centerY, textRef,  mainData) => {
    const angleStep = (2 * Math.PI) / mainData.length;
    const duration = 1;

    pointsRef.current.forEach((pointElement, index) => {
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


                pointElement.setAttribute('cx', newX);
                pointElement.setAttribute('cy', newY);
                console.log('textRef', textRef)
                console.log('textRef.current', textRef.current)
                console.log('indexThis', index)
                console.log('textRef.current[index]', textRef.current[index])
                const textElement = textRef.current[index];
                if (textElement) {
                    textElement.setAttribute('x', newX);
                    textElement.setAttribute('y', newY);
                }


                currentAnglesRef.current[index] = currentAngle;
            },
            onComplete: function () {
                currentAnglesRef.current[index] = endAngle;


                const finalX = centerX + radius * Math.cos(endAngle);
                const finalY = centerY + radius * Math.sin(endAngle);
                pointElement.setAttribute('cx', finalX);
                pointElement.setAttribute('cy', finalY);


                const textElement = textRef.current[index];
                if (textElement) {
                    textElement.setAttribute('x', finalX);
                    textElement.setAttribute('y', finalY);
                }
            }
        });
    });
};

export const animateToNextPeriod = (activeDataIndex, currentDates, animationRef, setCurrentDates,
                                    setActiveDataIndex,   previousDataIndex,
                                    setIsNumberAnimationRunning, mainData
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