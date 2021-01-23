export class FormValidator {
    constructor(form, state) {
        this.form = form;
        this.state = state;
    }
    initialize() {
        this.validate('submit');
        this.validate('blur');
    }
    validate(type) {
        const fields = Object.entries(this.state);
        fields.forEach(([field, control]) => {
            if (control.validator) {
                this.listen(field, control.validator, type);
            }
        });
    }
    listen(field, validator, type) {
        const input = document.querySelector(`#${field}`);
        if (input) {
            input.value = this.state[field].value;
            input.disabled = this.state[field].isDisabled;
        }
        input === null || input === void 0 ? void 0 : input.addEventListener(type, () => {
            this.state = Object.assign(Object.assign({}, this.state), { [field]: Object.assign(Object.assign({}, this.state[field]), { value: input === null || input === void 0 ? void 0 : input.value }) });
            if (validator === null || validator === void 0 ? void 0 : validator.isValid(input === null || input === void 0 ? void 0 : input.value)) {
                FormValidator.setErrorMessage(input, '');
            }
            else {
                FormValidator.setErrorMessage(input, validator === null || validator === void 0 ? void 0 : validator.getDescription());
            }
        });
    }
    static setErrorMessage(field, message) {
        var _a;
        const errorField = (_a = field === null || field === void 0 ? void 0 : field.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.error-message');
        if (errorField) {
            errorField.innerText = message;
        }
    }
}
//# sourceMappingURL=form-validator.js.map