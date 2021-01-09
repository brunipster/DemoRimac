import React, {useState} from 'react';
import './index.scss';
import {ReactComponent as ShieldIcon} from '@icons/shield.svg'
import {ContactModel} from '@models/ContactModel'
import InputComponent from '@components/InputComponent'
import SelectComponent from '@components/SelectComponent'
import CheckboxComponent from '@components/CheckboxComponent'
import ButtonComponent from '@components/ButtonComponent'
import { DocumentTypeConstant } from "@helpers/DocumentTypeConstant";
import { iOnChangeSelect } from '@helpers/FormValidatorHelper';

const oDocumentTypeConstant = new DocumentTypeConstant();
const Component:React.FunctionComponent = () => {
    const [form, setForm] = useState<ContactModel>(new ContactModel())


    const handleInput = (event: any) => {
        setForm(form.getStateInput(form, event))
    }


    const handleCheckbox = (event: any) => {
        // let inputName = event.target.name;
        // let inputValue = event.target.checked;
    
        let currentForm = form.getStateCheckbox(form, event);

        setForm(currentForm)
      }

    const handleSelect = (select: iOnChangeSelect) => {
        let currentForm = form.getStateSelect(form, select);

        setForm(currentForm)
    }

    return (
        <div className="p_home">
            <div className="p_home__info">
                <h1 className="p_home__info_title e-h2 e-text-light">Seguro de <br/><span className="e-text-regular">Salud</span></h1>
                <ul className="p_home__info_list">
                    <li className="p_home__info_list_item">
                        <ShieldIcon className="p_home__info_list_item_icon"></ShieldIcon>
                        <span className="p_home__info_list_item_text e-p4">Cómpralo de manera fácil y rápida</span>
                    </li>
                </ul>
            </div>
            <div className="p_home__form">
                <div className="p_home__form_wrapper">
                    <h3 className="p_home__form_title e-h5 e-text-light">Obtén tu <span className="p_home__form_title__Blue e-text-regular">seguro ahora</span></h3>
                    <p className="p_home__form_subtitle e-p4 e-text-light">Ingresa los datos para comenzar</p>
                    <div className="p_home__form_wrapper_container">
                        <form>
                            <SelectComponent
                                className={``}
                                label="Tipo de documento*"
                                options={oDocumentTypeConstant.listMainDocuments.map((elm)=>{return({...elm, name:elm.codeText})})}
                                model={form.sltDocumentType}
                                onChange={handleSelect}
                            />
                            <InputComponent
                                className=""
                                label="Número de Documento*"
                                model={form.inpDocumentNumber}
                                onChange={handleInput}
                            />
                            <InputComponent
                                className=""
                                label="Fecha de Nacimiento*"
                                model={form.inpBirthDate}
                                onChange={handleInput}
                            />
                            <InputComponent
                                className=""
                                label="Celular*"
                                model={form.inpMobilephoneNumber}
                                onChange={handleInput}
                            />

                            <CheckboxComponent
                                className=""
                                label={<>Acepto la <a className="p_home__form_wrapper_container_check_link e-text-regular" href="#">Politica de Datos Personales y los Términos y Condiciones</a></>}
                                model={form.chkAllowPolicyProtection}
                                onChange={handleCheckbox}
                            />


                            <CheckboxComponent
                                className=""
                                label={<>Acepto la <a className="p_home__form_wrapper_container_check_link e-text-regular" href="#">Politica de Envío de Comunicaciones Comerciales</a></>}
                                model={form.chkAllowPolicyDelivery}
                                onChange={handleCheckbox}
                            />
                            <ButtonComponent loading={false}>COMENCEMOS</ButtonComponent>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Component;