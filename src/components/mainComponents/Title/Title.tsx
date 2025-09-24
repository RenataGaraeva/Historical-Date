import './title.scss'
import {title} from "../../../constants/data";
import * as React from "react";
import {useContext} from "react";
import {PropsContext} from "../../../context/context";

export default function Title () {

    const {
      isMobile
    } = useContext(PropsContext);

    return (
        <>
            {!isMobile ? <div className='gradient'></div>  : <></>}
            <div className='title'>{title}</div>
            </>
    )
}