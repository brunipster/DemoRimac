import React, {useState} from 'react';
import InputComponent from '@components/InputComponent'
import InputDateComponent from '@components/InputDateComponents'
import SelectComponent from '@components/SelectComponent'
import RadioComponent from '@components/RadioComponent'
import CheckboxComponent from '@components/CheckboxComponent'
import ButtonComponent from '@components/ButtonComponent'
import { iOnChangeSelect } from '@helpers/FormValidatorHelper';
import { DocumentTypeConstant } from "@helpers/DocumentTypeConstant";
import {OwnerInfoModel} from '@models/OwnerInfoModel'


import './index.scss';

const oDocumentTypeConstant = new DocumentTypeConstant();

interface iProps {
    currentStep: number;
    totalSteps: number;
    prevCustomStep?: number;
  
    wizardNextstep: Function
    wizardPrevstep: Function
  }
const Component:React.FunctionComponent<iProps> = (props:iProps) => {
    const [form, setForm] = useState<OwnerInfoModel>(new OwnerInfoModel())
    const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false)
    const [isEnable, setIsEnable] = useState<boolean>(false)
    const [stepActive, setStepActive] = useState<number>(0)
    const [totalSteps, setTotalStep] = useState<number>(5)
    const [] = useState<boolean>(false)

    async function submitForm(e: any) {
        e.preventDefault();
        props.wizardNextstep();
    }

    const handleInput = (event: any) => {
        setForm(form.getStateInput(form, event))
    }

    const handleCheckbox = (event: any) => {
        let currentForm = form.getStateCheckbox(form, event);
                
        setForm(currentForm)
      }

    const handleSelect = (select: iOnChangeSelect) => {
        let currentForm = form.getStateSelect(form, select);

        setForm(currentForm)
    }

    return (
        <div className="s_personal_info">
            <h3 className="s_personal_info__title e-h5 e-text-light">Hola, <span className="s_personal_info__title__Blue e-text-regular">Pepito</span></h3>
            <p className="s_personal_info__subtitle e-p4 e-text-light">Valida de los datos sean correctos.</p>
            <div className="p_home__form_wrapper_container">
                <h3 className="e-p2 e-text-light">Datos personales del titular</h3>
                <form onSubmit={submitForm}>
                    <div className="p_home__form_input_group">    
                        <SelectComponent
                            className="p_home__form_input_group_item"
                            label="Tipo de documento*"
                            options={oDocumentTypeConstant.listMainDocuments.map((elm)=>{return({...elm, name:elm.codeText})})}
                            model={form.sltDocumentType}
                            onChange={handleSelect}
                        />
                        <InputComponent
                            className="p_home__form_input_group_item"
                            label="Número de Documento*"
                            model={form.inpDocumentNumber}
                            onChange={handleInput}
                        />
                    </div>

                    <InputComponent
                        className=""
                        label="Primer Nombre*"
                        model={form.inpFirstName}
                        onChange={handleInput}
                    />

                    <InputComponent
                        className=""
                        label="Segundo Nombre*"
                        model={form.inpSecondName}
                        onChange={handleInput}
                    />

                    <InputComponent
                        className=""
                        label="Apellido Paterno*"
                        model={form.inpLastname}
                        onChange={handleInput}
                    />

                    <InputComponent
                        className=""
                        label="Apellido Materno*"
                        model={form.inpLastnameSecond}
                        onChange={handleInput}
                    />

                    <InputDateComponent
                        className=""
                        label="Fecha de Nacimiento*"
                        model={form.inpBirthDate}
                        onChange={handleInput}
                    />

                    <RadioComponent
                        onChange={handleInput}
                        classItem="col-sm-6 radio_card_hour"
                        model={form.rdGenre}
                        label={"Género"}
                        options={[
                            {
                            code: 'M', 
                            name: <>Masculino</>
                            },
                            {
                            code: 'F', 
                            name: <>Femenino</>
                            }
                        ]}
                    />

<RadioComponent
                        onChange={handleInput}
                        classItem="col-sm-6 radio_card_hour"
                        model={form.rdNumberInsurance}
                        label={"¿A quién vamos a asegurar?"}
                        options={[
                            {
                            code: '1', 
                            name: <>Solo a mí</>
                            },
                            {
                            code: '2', 
                            name: <>A mí y a mi familia</>
                            }
                        ]}
                    />

                    <div className="s_personal_info__form_buttons">

                        <ButtonComponent className="s_personal_info__form_button" type={"submit"} loading={isLoadingForm} disabled={!isEnable}>CONTINUAR</ButtonComponent>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Component;