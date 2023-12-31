import { FormControl, FormGroup } from "@angular/forms";

export class FormValidators {
  static passwordValidator(
    control: FormControl
  ): { [key: string]: any } | null {
    const password = control.value;
    if (password && password !== "") {
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      return passwordPattern.test(password) ? null : { invalidPassword: true };
    }

    return null;
  }

  static equalsTo(otherField: string) {
    const validator = (control: FormControl) => {
      if (otherField == null) {
        throw new Error("É necessário informar um campo.");
      }
      if (!control.root || !(<FormGroup>control.root).controls) {
        return null;
      }
      const field = (<FormGroup>control.root).get(otherField);
      if (!field) {
        throw new Error("É necessário informar um campo válido.");
      }
      if (field.value !== control.value) {
        return { equalsTo: otherField };
      }
      return null;
    };

    return validator;
  }

  static getErrorMsg(
    fieldName: string,
    validatorName: string,
    validatorValue: any
  ) {
    const config: { [key: string]: string } = {
      required: `Campo obrigatório.`,
      email: "Email inválido.",
      invalidPassword:
        "Sua senha deve conter letras maiscúlas, letras minúsculas, números e caracteres especiais",
      equalsTo: `As senhas não coincidem.`,
      min: `Campo não tem o valor mínimo.`,
      emailExists: "Email já cadastrado.",
    };
    return config[validatorName];
  }
}
