import './dateCircle.scss'
import {useContext} from "react";
import {PropsContext} from "../../../context/context.jsx";

export default function DateCircle () {
    const {
        currentDates,
        endDateRef,
        startDateRef,
} = useContext(PropsContext);

    return (
        <div className='dates'>
            <div >
        <span ref={startDateRef} className='startDate'>
          {currentDates[0]}
        </span>
                {' '}
                <span ref={endDateRef} className='finishDate'>
          {currentDates[1]}
        </span>
            </div>
        </div>
    );
}