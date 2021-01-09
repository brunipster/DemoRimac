import React from 'react';
import { iInputModel } from '@helpers/FormValidatorHelper.ts';
import './index.scss';

interface iProps{
    label: string;
    className: string;
    model:iInputModel;
    onChange?: (event: any) => void;
}

const Component:React.FunctionComponent<iProps> = (props:iProps) => {
  let value = props.model.value || "";

    function handleChange(event: any) {
        let targetValue = event.target.value
        let targetType = event.target.type
    
        if (props.model.formatRegex) {
          targetValue = targetValue.replace(props.model.formatRegex, "");
        }
    
        if (targetType === "tel") {
          targetValue = targetValue.replace(/[^0-9]/g, "");
        }
    
        if (props.model.toUpperCase) {
          targetValue = targetValue.toUpperCase()
        }
    
        if (props.model.toLowerCase) {
          targetValue = targetValue.toLowerCase()
        }
    
        /*if (targetValue && type === "decimal") {
          targetValue = targetValue.replace(/[^0-9.]/g, "");
          if (targetValue.length) {
            targetValue = targetValue.match(/([0-9]+.?[0-9]?[0-9]?)/g)[0];
          }
        }*/
    
        /*
        if (targetValue && type === "percentage") {
          targetValue = targetValue.replace(/[^0-9.]/g, "");
          if (targetValue.length && !targetValue.endsWith('.')) {
            targetValue = targetValue.match(/([0-9]{1,2}\.[0-9]{1,2})|([0-9]{1,2})/g)[0];
          }
        }
    
        if (targetValue && type === "percent") {
          targetValue = targetValue.replace(/^0+/g, "") + "%";
          if (targetSelectionStart === targetValue.length) {
            targetSelectionStart--
          }
        }*/
    
        event.target.value = targetValue;
        props.onChange && props.onChange(event);
      }

    let classHasValue = value.length ? "c_input__wrapper__HasValue" : "";
    return (
        <div className={`c_input ${props.className}`}>
            <div className={`c_input__wrapper ${classHasValue}`}>
                <input className="c_input__wrapper_field"
                    name={props.model.name}
                    required={props.model.isRequired || false}
                    disabled={props.model.disabled || false}
                    onChange={handleChange}
                    minLength={props.model.minLength}
                    maxLength={props.model.maxLength}
                >
                </input>
                <label className="c_input__label e-text-regular">{props.label}</label>
            </div>
        </div>
    )
}

export default Component;