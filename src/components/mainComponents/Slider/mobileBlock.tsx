import * as React from "react";
import './slider.scss'

type Props = {
    type: string;
}
export default function MobileBlock ({type}: Props) {
    return (
        <>
            <div className='type'>
                {type}
            </div>
            <div className='border'>
            </div>
        </>
    )
}