import { FormState, Validator } from './validator.js';

export class FormValidator {
    constructor(public form: HTMLElement | null, public state: FormState) {
    }

    public initialize(): void {
        this.validate('submit');
        this.validate('blur');
    }

    public validate(type: string): void {
        const fields = Object.entries(this.state);

        fields.forEach(([field, control]) => {
            if (control.validator) {
                this.listen(field, control.validator, type);
            }
        });
    }

    private listen(field: string, validator: Validator<unknown>, type: string): void {
        const input = document.querySelector(`#${field}`) as HTMLInputElement | null;

        input?.addEventListener(type, () => {
            this.state = { ...this.state, [field]: { ...this.state[field], value: input?.value } };

            if (validator?.isValid(input?.value)) {
                FormValidator.setErrorMessage(input, '');
            } else {
                FormValidator.setErrorMessage(input, validator?.getDescription());
            }
        });
    }

    private static setErrorMessage(field: HTMLElement | null, message: string): void {
        const errorField = field?.parentElement?.querySelector('.error-message') as HTMLElement;

        if (errorField) {
            errorField.innerText = message;
        }
    }
}
