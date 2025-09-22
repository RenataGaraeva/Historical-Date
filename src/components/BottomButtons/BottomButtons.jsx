import React, {useContext} from "react";
import {PropsContext} from "../../context/context.jsx";
import mainData from "../../constants/data.js";
import './bottomButtons.scss'

export default function BottomButtons () {

    const { swiperInstance,
        activeMessageIndex,
        activeDataIndex
    } = useContext(PropsContext);

    const currentMessages = mainData[activeDataIndex].messages || [];

    const handleNextMessage = () => {
        if (swiperInstance && activeMessageIndex < currentMessages.length - 1) {
            swiperInstance.slideNext();
        }
    };

    const handlePrevMessage = () => {
        if (swiperInstance && activeMessageIndex > 0) {
            swiperInstance.slidePrev();
        }
    };

    return (
        <div>
            {activeMessageIndex !== 0 ? <button
                onClick={handlePrevMessage}
                disabled={activeMessageIndex === 0}
                className="nav-buttonMessages previous-buttonMessages"
            >
            </button> : <></>}

            {activeMessageIndex !== currentMessages.length - 1 ? <button
                onClick={handleNextMessage}
                disabled={activeMessageIndex === currentMessages.length - 1}
                className="nav-buttonMessages next-buttonMessages"
            >
            </button> : <></>}
        </div>
    )
}