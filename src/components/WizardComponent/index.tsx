import React, {useState,useRef} from 'react';
import {ReactComponent as BackIcon} from '@icons/left-arrow.svg'
import './index.scss';

interface iProps {
    handleChangeStep?: Function;
    enableClickStep?: boolean;
    hideStepContent?: boolean;
    classStepContent?: string;
    items: Array<{
      Component: any
      props: any
    }>;
    ref?: any;
    hideSteps?: boolean;
  }
  

const Component:React.FunctionComponent<iProps> = (props:iProps) => {
    const refComponent: Array<any> = [];
    const [active, setActive] = useState(0)
    const [isResetSteps, setIsResetSteps] = useState<boolean>(false)

    const changeStep = (index: number) => {
        setActive(index)
        
        if (props.handleChangeStep) props.handleChangeStep(index)
  
        if (props.items[index].props.ref) {
          props.items[index].props.ref.current.wizardOnShowContent && props.items[index].props.ref.current.wizardOnShowContent()
        }
        else {
          refComponent[index].current.wizardOnShowContent && refComponent[index].current.wizardOnShowContent()
        }
    }

    const nextStep = () => {
        changeStep(active + 1)
      }
    
    const  prevStep = () => {
        changeStep(active - 1)
    }
    
    const  resetStep = () => {
        setIsResetSteps(true)
        changeStep(0)
    };
    

    const Component = props.items[active].Component
    refComponent[active] = React.createRef();
    return (
        <div className="c_wizard">
            <div className="c_wizard__step">
                <button className="c_wizard__step_back_button"><BackIcon/></button>
                <p className="c_wizard__step_title e-p3"><span className="c_wizard__step_title__Blue e-p3">Paso {active+1}</span> de {props.items.length}</p>
            </div>
            <div className="c_wizard__content">
                <div
                className={`c_wizard__content_item`}
                >
                <Component
                    {...props}
                    wizardPrevstep={prevStep}
                    wizardNextstep={nextStep}
                    wizardResetStep={resetStep}
                    wizardGoStep={changeStep}
                    ref={props.ref || refComponent![active]}
                />
                </div>
            </div>
        </div>
    )
}

export default Component;