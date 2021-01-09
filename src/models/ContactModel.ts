import { iInputModel, iCheckboxModel ,FormValidationHelper, iSelectModel } from '@helpers/FormValidatorHelper.ts';
import { DocumentTypeConstant } from "@helpers/DocumentTypeConstant";
const oDocumentTypeConstant = new DocumentTypeConstant();
export class ContactModel extends FormValidationHelper {
    
    sltDocumentType: iSelectModel<"DNI" | "CE" | "PAS" | "PTP"> = {
        name: "sltDocumentType",
        value: oDocumentTypeConstant.DNI.codeText as any,
        isRequired: true,
        keyCode: "codeText",
        keyText: "name",
        onChange: (value: any, form: ContactModel) => {
          const found: any = oDocumentTypeConstant.listAllDocuments.find(({ codeText }) => codeText === value);
    
          return {
            inpDocumentNumber: {
              pattern: found.pattern,
              formatRegex: found.regex,
              maxLength: Number(found.maxLength),
              value: (form.inpDocumentNumber.value || "").replace(found.regex, "").substring(0, found.maxLength),
            } as iInputModel
          }
        },
    };

    inpDocumentNumber: iInputModel = {
        name: "inpDocumentNumber",
        isRequired: true,
        type: "tel",
        autoFocus: true,
    };

    inpBirthDate: iInputModel = {
        name: "inpBirthDate",
        isRequired: true,
        type: "tel",
        maxLength: 9,
        pattern: "9[0-9]{8}",
    };

    inpMobilephoneNumber: iInputModel = {
        name: "inpMobilephoneNumber",
        isRequired: true,
        type: "tel",
        maxLength: 9,
        pattern: "9[0-9]{8}",
    };

    chkAllowPolicyProtection: iCheckboxModel = {
        name: "chkAllowPolicyProtection",
        isRequired: true,
    };
    chkAllowPolicyDelivery: iCheckboxModel = {
        name: "chkAllowPolicyDelivery",
        isRequired: true,
    };
}