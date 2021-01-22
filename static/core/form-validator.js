export class FormValidator {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
    }
    initialize() {
        this.validate('submit');
        this.validate('input');
    }
    validate(type) {
        this.fields.forEach(field => {
            var _a;
            const input = document.querySelector(`#${field.name}`);
            const errorMessage = (_a = input === null || input === void 0 ? void 0 : input.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.error-message');
            input === null || input === void 0 ? void 0 : input.addEventListener(type, () => {
                if (field.validator) {
                    if (field.validator.isValid(input === null || input === void 0 ? void 0 : input.value)) {
                        errorMessage.innerText = '';
                    }
                    else {
                        errorMessage.innerText = field.validator.getDescription();
                    }
                }
            });
        });
    }
}
//# sourceMappingURL=form-validator.js.map