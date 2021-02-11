import { FormState } from './validator.js';

export class FormValidator {
    constructor(public form: HTMLElement | null, public state: FormState) {
    }

    public initialize(): void {
        this.initControls();
        this.setButtonStatus();
        this.form?.addEventListener('input', this.listen.bind(this), true);
        this.form?.addEventListener('submit', this.listen.bind(this), true);
    }

    public initControls(): void {
        const fields = Object.entries(this.state);

        fields.forEach(([field, control]) => {
            if (control.validator) {
                this.setControl(field);
            }
        });
    }

    private setControl(field: string): void {
        const input = this.form?.querySelector(`#${field}`) as HTMLInputElement | null;

        if (input) {
            input.value = this.state[field].value;
            input.disabled = this.state[field].isDisabled;
        }
    }

    private listen(event: Event): void {
        const input = event.target as HTMLInputElement | null;
        const field = input?.getAttribute('id') as string;
        const validator = this.state[field]?.validator;

        if (input) {
            this.state = { ...this.state, [field]: { ...this.state[field], value: input?.value } };
        }

        if (validator?.isValid(input?.value)) {
            FormValidator.setErrorMessage(input, '');
        } else {
            FormValidator.setErrorMessage(input, validator?.getDescription());
        }

        this.setButtonStatus();
    }

    private setButtonStatus(): void {
        const submit = this.form?.querySelector('button[type="submit"]') as HTMLButtonElement | null;
        const isFormValid = this.isFormValid();

        if (submit) {
            submit.disabled = !isFormValid;
        }
    }

    private static setErrorMessage(field: HTMLElement | null, message: string): void {
        const errorField = field?.parentElement?.querySelector('.error-message') as HTMLElement;

        if (errorField) {
            errorField.innerText = message;
        }
    }

    public isFormValid(): boolean {
        return Object.values(this.state).every(item => item.validator?.isValid(item.value));
    }

    public removeListeners(): void {
        this.form?.removeEventListener('input', this.listen.bind(this), true);
        this.form?.removeEventListener('submit', this.listen.bind(this), true);
    }
}
