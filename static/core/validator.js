export class FormControl {
    constructor(value, isDisabled, validator) {
        this.value = value;
        this.isDisabled = isDisabled;
        this.validator = validator;
    }
}
export class EmptyValidator {
    isValid(value) {
        return Boolean(value.length);
    }
    getDescription() {
        return 'Поле должно быть заполнено';
    }
}
export class MaxLengthValidator {
    constructor(maxLength) {
        this.maxLength = maxLength;
    }
    isValid(value) {
        return value.length < this.maxLength;
    }
    getDescription() {
        return `Длинна должна быть больше ${this.maxLength}`;
    }
}
export class MinLengthValidator {
    constructor(minLength) {
        this.minLength = minLength;
    }
    isValid(value) {
        return value.length > this.minLength;
    }
    getDescription() {
        return `Длинна должна быть больше ${this.minLength}`;
    }
}
export class ValidatorComposer {
    constructor(validatorList) {
        this.validatorList = validatorList;
        this.description = '';
    }
    isValid(value) {
        return this.validatorList.every(item => {
            if (!item.isValid(value)) {
                this.description = item.getDescription();
                return false;
            }
            return true;
        });
    }
    getDescription() {
        return this.description;
    }
}
//# sourceMappingURL=validator.js.map