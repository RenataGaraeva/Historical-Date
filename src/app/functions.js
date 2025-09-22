import mainData from "./mainData";
import {gsap} from "gsap";

const isDefinedString = (value) =>
    typeof value === 'string' && value.length > 0;
export const cn = (...args)=>
    args.filter((arg) => isDefinedString(arg)).join(' ');