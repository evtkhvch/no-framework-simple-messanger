import { FormState } from './validator.js';
import { sanitize } from './sanitize.js';

export class FormGroupControl<T extends FormState> {
    constructor(public form: HTMLElement | null, public state: T) {
    }

    public initialize(): void {
        this.initControls();
        this.setButtonStatus();
        this.form?.addEventListener('input', this.listen.bind(this), true);
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
            this.state = { ...this.state, [field]: { ...this.state[field], value: sanitize(input.value) } };
        }

        if (validator?.isValid(input?.value)) {
            FormGroupControl.setErrorMessage(input, '');
        } else {
            FormGroupControl.setErrorMessage(input, validator?.getDescription());
        }

        this.setButtonStatus();
    }

    private setButtonStatus(): void {
        const submit = this.form?.querySelector('button[type="submit"]') as HTMLButtonElement | null;

        if (submit) {
            submit.disabled = !this.isFormValid();
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
}
