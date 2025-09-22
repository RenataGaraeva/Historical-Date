import React, {useContext, useEffect, useState} from 'react';
import {gsap} from 'gsap';
import "./circle.scss";

import {PropsContext} from "../context/context.jsx";
import mainData, {centerX, centerY, radius} from "../constants/data";
import {cn, rotatePoints} from "../functions/functions";

export default function Circle () {
    return (
        <>
            <PointsOnCircle />
        </>
    )
}

function PointsOnCircle () {
    const {
        pointsRef,
        currentAnglesRef,
        divBlock,
        activeDataIndex,
        setActiveDataIndex,
        textRef
    } = useContext(PropsContext);

    const [points, setPoints] = useState([]);
    const [widthOfBlock, setWidthOfBlock] = useState(0)

    useEffect(() => {
        const initialPoints = [];
        const initialAngles = [];

        for (let i = 0; i < mainData.length; i++) {
            const angle = (i / mainData.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            initialPoints.push({ x, y, angle });
            initialAngles.push(angle);
        }

        setPoints(initialPoints);
        currentAnglesRef.current = initialAngles;

    }, []);


    useEffect(() => {
        setWidthOfBlock(divBlock.current.getBoundingClientRect().width)
    }, [divBlock]);

    const handlePointClick = (index) => {
        const constIndex = index
        setActiveDataIndex(constIndex)
        rotatePoints(pointsRef, currentAnglesRef, textRef, centerX, radius, centerY, mainData);
    };

    const extraSpace  =  ( centerY, radius) => widthOfBlock - centerY - radius - radius - radius / 2
    const handleMouseEnter = (circleRef, index) => {
        gsap.to(circleRef, {
            r: 10,
            duration: 0.3,
            ease: "power2.out",
            fill: "white",
            stroke: "black",
            strokeWidth: 1
        });

        if (textRef.current[index]) {
            gsap.to(textRef.current[index], {
                opacity: 1,
                duration: 0.3,
                delay: 0.1,
                ease: "power2.out"
            });
        }
    };

    const handleMouseLeave = (circleRef, index) => {
        gsap.to(circleRef, {
            r: 5,
            duration: 0.3,
            ease: "power2.out",
            fill: "black",
            stroke: "none",
            strokeWidth: 0
        });
        if (textRef.current[index]) {
            gsap.to(textRef.current[index], {
                opacity: 0,
                duration: 0.2,
                ease: "power2.out"
            });
        }
    };
    console.log('activeDataIndex ', activeDataIndex )
    return (
        <div>

            <svg width="530" height="530" className='circle'>
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill="none"
                    stroke="gray"
                    className='circleTwo'
                />

                <line
                    x1={centerX}
                    y1={centerY - radius - extraSpace(centerY, radius)}
                    x2={centerX}
                    y2={centerY + radius + extraSpace(centerY, radius)}
                    stroke="black"
                    strokeWidth="1"
                    className='verticalLine'
                />

                <line
                    x1={centerX - radius - extraSpace(centerX, radius)}
                    y1={centerY}
                    x2={centerX + radius + extraSpace(centerX, radius)}
                    y2={centerY}
                    stroke="black"
                    strokeWidth="1"
                    className='horisontalLine'
                />

                {points.map((point, index) => (
                    <g key={index}>
                        <circle
                            onClick={() => handlePointClick(index)}
                            cx={point.x}
                            cy={point.y}
                            r={index === activeDataIndex - 1 ? '10' : '5'}
                            fill={index === activeDataIndex - 1 ? 'white' : 'black'}
                            ref={el => {
                                if (el) {
                                    pointsRef.current[index] = el;
                                }
                            }}
                            onMouseEnter={() => handleMouseEnter(pointsRef.current[index], index)}
                            onMouseLeave={() => handleMouseLeave(pointsRef.current[index], index)}
                            className={cn('point', `point-${index}`, index === activeDataIndex ? 'point-active' : '')}
                        />

                        <text
                            x={point.x}
                            y={point.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="8"
                            fill="black"
                            opacity="0"
                            ref={el => {
                                if (el) {
                                    textRef.current[index] = el;
                                }
                            }}
                            className="point-number"
                            style={{pointerEvents: 'none'}}
                        >
                            {index + 1}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
};