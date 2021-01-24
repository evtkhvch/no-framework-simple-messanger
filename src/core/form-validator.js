import { Observable } from './observable.js';
export class FormValidator {
    constructor(form, state) {
        this.form = form;
        this.state = state;
        this.observable = new Observable();
    }
    initialize() {
        var _a, _b, _c;
        this.initControls();
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addEventListener('blur', this.listen.bind(this), true);
        (_b = this.form) === null || _b === void 0 ? void 0 : _b.addEventListener('focus', this.listen.bind(this), true);
        (_c = this.form) === null || _c === void 0 ? void 0 : _c.addEventListener('submit', this.listen.bind(this), true);
    }
    initControls() {
        const fields = Object.entries(this.state);
        fields.forEach(([field, control]) => {
            if (control.validator) {
                this.setControl(field);
            }
        });
    }
    setControl(field) {
        var _a;
        const input = (_a = this.form) === null || _a === void 0 ? void 0 : _a.querySelector(`#${field}`);
        if (input) {
            input.value = this.state[field].value;
            input.disabled = this.state[field].isDisabled;
        }
    }
    listen(event) {
        var _a;
        const input = event.target;
        const field = input === null || input === void 0 ? void 0 : input.getAttribute('id');
        const validator = (_a = this.state[field]) === null || _a === void 0 ? void 0 : _a.validator;
        if (input) {
            this.state = Object.assign(Object.assign({}, this.state), { [field]: Object.assign(Object.assign({}, this.state[field]), { value: input === null || input === void 0 ? void 0 : input.value }) });
        }
        this.observable.next('state', this.state, this.isFormValid());
        if (validator === null || validator === void 0 ? void 0 : validator.isValid(input === null || input === void 0 ? void 0 : input.value)) {
            FormValidator.setErrorMessage(input, '');
        }
        else {
            FormValidator.setErrorMessage(input, validator === null || validator === void 0 ? void 0 : validator.getDescription());
        }
    }
    static setErrorMessage(field, message) {
        var _a;
        const errorField = (_a = field === null || field === void 0 ? void 0 : field.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.error-message');
        if (errorField) {
            errorField.innerText = message;
        }
    }
    isFormValid() {
        return Object.values(this.state).every(item => item.validator.isValid(item.value));
    }
    listenFormState(callback) {
        this.observable.subscribe('state', callback);
    }
    unsubscribe(callback) {
        var _a;
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.removeEventListener('input', this.listen.bind(this));
        this.observable.unsubscribe('state', callback);
    }
}
//# sourceMappingURL=form-validator.js.map