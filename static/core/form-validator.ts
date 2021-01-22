import { FormField } from './validator.js';

export class FormValidator {
    constructor(public form: HTMLElement | null, public fields: FormField[]) {
    }

    public initialize(): void {
        this.validate('submit');
        this.validate('input');
    }

    public validate(type: string): void {
        this.fields.forEach(field => {
            const input = document.querySelector(`#${field.name}`) as HTMLInputElement | null;
            const errorMessage = input?.parentElement?.querySelector('.error-message') as HTMLElement;

            input?.addEventListener(type, () => {
                if (field.validator) {
                    if (field.validator.isValid(input?.value)) {
                        errorMessage.innerText = '';
                    } else {
                        errorMessage.innerText = field.validator.getDescription();
                    }
                }
            });
        });
    }
}
