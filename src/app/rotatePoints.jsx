import mainData from "./mainData.js";
import {gsap} from "gsap";

export const rotatePoints = (pointsRef, currentAnglesRef, textRef, centerX, radius, centerY) => {
    const angleStep = (2 * Math.PI) / mainData.length;
    const duration = 1;

    pointsRef.current.forEach((pointElement, index) => {
        if (!pointElement) return;

        const startAngle = currentAnglesRef.current[index];
        const endAngle = startAngle + angleStep;

        // Анимация движения по окружности
        gsap.to(pointElement, {
            duration: duration,
            ease: "sine.inOut",
            onUpdate: function () {
                const progress = this.progress();
                const currentAngle = startAngle + (endAngle - startAngle) * progress;

                // Вычисляем новые координаты на окружности
                const newX = centerX + radius * Math.cos(currentAngle);
                const newY = centerY + radius * Math.sin(currentAngle);

                // Обновляем позицию точки
                pointElement.setAttribute('cx', newX);
                pointElement.setAttribute('cy', newY);
                // Обновляем позицию текста
                console.log('indexThis', index)
                console.log('textRef.current[index]', textRef.current[index])
                const textElement = textRef.current[index];
                if (textElement) {
                    textElement.setAttribute('x', newX);
                    textElement.setAttribute('y', newY);
                }

                // Сохраняем текущий угол
                currentAnglesRef.current[index] = currentAngle;
            },
            onComplete: function () {
                currentAnglesRef.current[index] = endAngle;

                // Финальное позиционирование для точности
                const finalX = centerX + radius * Math.cos(endAngle);
                const finalY = centerY + radius * Math.sin(endAngle);
                pointElement.setAttribute('cx', finalX);
                pointElement.setAttribute('cy', finalY);

                // Финальное позиционирование текста
                const textElement = textRef.current[index];
                if (textElement) {
                    textElement.setAttribute('x', finalX);
                    textElement.setAttribute('y', finalY);
                }
            }
        });
    });
};