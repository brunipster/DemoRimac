import { FormHelper } from './FormHelper';

export interface iInputModel {
    name: string;
  
    value?: any;
    type?: "email" | "text" | "tel" | "decimal";
    pattern?: any;
    isRequired?: boolean;
    isVisible?: boolean;
    minLength?: number;
    maxLength?: number;
    isLoading?: boolean;
  
    validationError?: { valid: boolean, errorMessage: string };
    validations?: Array<(value: any) => { valid: boolean, errorMessage: string }>;
    postSubmitError?: string;
  
    validity?: ValidityState;
    errorText?: any;
  
  
    autoFocus?: boolean;
    autoComplete?: "on" | "off";
    icon?: any;
    classgroup?: string;
    disabled?: boolean;
    captiontext?: string;
    prefix?: string;
    suffix?: string;
    placeholder?: string;
    formatRegex?: RegExp;
    toUpperCase?: boolean;
    toLowerCase?: boolean;
    /**
    * Custom data
    */
    data?: any;
}

export interface iCheckboxModel {
  name: string;
  value?: boolean;
  isRequired?: boolean;
  isVisible?: boolean;
  /**
  * Custom data
  */
  data?: any;
}

export interface iSelectModel<iValue = any> {
  name: string;

  keyCode?: string;
  keyText?: string;
  value?: iValue;
  valueText?: any;
  isRequired?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isVisible?: boolean;
  data?: any;

  onChange?: (value: any, form: any) => any
}

export interface iOnChangeSelect {
  name: string,
  keyCode: string,
  keyText: any,
}

export interface iSelectModel<iValue = any> {
  name: string;

  keyCode?: string;
  keyText?: string;
  value?: iValue;
  valueText?: any;
  isRequired?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isVisible?: boolean;
  data?: any;

  onChange?: (value: any, form: any) => any
}

export class FormValidationHelper {
  oFormHelper = new FormHelper();

  

  runValidations = (value:any, field: any, validity:any, form:any) => {
    let validationError = { valid: true }
    if (validity.valid && field.validations) {
      for (const validation of field.validations) {
        if (validationError.valid) {
          validationError = validation(value, form)
        }
      }
      if (!validationError.valid) {
        validity.valid = false;
      }
    }
    return { validity, validationError }
  }

  getStateInput = (form: any, event: any) => {
    let fieldName = event.target.name;
    let value = event.target.value;
    let validity = this.oFormHelper.getValidityInput(event.target.validity)

    if (event.target.customValidity) {
      validity = Object.assign({}, validity, event.target.customValidity)
    }

    let validations = this.runValidations(value, form[fieldName], validity, form)

    return {
      ...form,
      [fieldName]: {
        ...form[fieldName],
        value,
        isDirty: true,
        postSubmitError: '',
        validity: validations.validity,
        validationError: validations.validationError,
      } as iInputModel
    }
  }

  getStateCheckbox = (form: any, event: any) => {
    let fieldName = event.target.name;
    let value = event.target.checked;
    console.log(fieldName, value)
    return {
      ...form,
      [fieldName]: {
        ...form[fieldName],
        value,
        isDirty: true,
        validity: value,
      } as iCheckboxModel
    }
  }

  getStateSelect = (form: any, event: iOnChangeSelect) => {

    return {
      ...form,
      [event.name]: {
        ...form[event.name],
        value: event.keyCode,
        valueText: event.keyText,
        validity: true
      } as iSelectModel,
    }
  }
}