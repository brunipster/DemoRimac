import React from 'react';
import { iCheckboxModel } from '@helpers/FormValidatorHelper.ts';
import './index.scss';
interface iProps{
    label: JSX.Element;
    className?: string;
    model:iCheckboxModel;
    onChange?: (event: any) => void;
}
const Component:React.FunctionComponent<iProps> = (props:iProps) => {
    function handleChange(event: any) {
        console.log("GG")
        props.onChange && props.onChange(event);
    }
    return (
        <div className="c_checkbox">
            <input 
            className="c_checkbox__input" 
            id={props.model.name} 
            type="checkbox"
            name={props.model.name}
            checked={props.model.value || false}
            onChange={handleChange}
            ></input>
            <label className=" c_checkbox__label e-text-light">{props.label}</label>
        </div>
    )
}

export default Component;