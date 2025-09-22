
const isDefinedString = (value) =>
    typeof value === 'string' && value.length > 0;
export const cn = (...args)=>
    args.filter((arg) => isDefinedString(arg)).join(' ');


import {gsap} from "gsap";

export const rotatePoints = (pointsRef, currentAnglesRef, textRef, centerX, radius, centerY, mainData) => {
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