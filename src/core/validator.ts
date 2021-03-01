export interface Validator<T> {
    isValid(value: T): boolean;

    getDescription(): string;
}

export interface FormState {
    [key: string]: FormControl;
}

export class FormControl {
    constructor(public value: string, public isDisabled: boolean, public validator: Validator<unknown>) {
    }
}

export class EmptyValidator implements Validator<string> {
    public isValid(value: string): boolean {
        return Boolean(value.length);
    }

    public getDescription(): string {
        return 'Поле должно быть заполнено';
    }
}

export class PhoneNumberValidator implements Validator<string> {
    public isValid(value: string): boolean {
        // eslint-disable-next-line
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(String(value).toLowerCase());
    }

    public getDescription(): string {
        return 'Введите корректный номер телефона';
    }
}

export class EmailValidator implements Validator<string> {
    public isValid(value: string): boolean {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    }

    public getDescription(): string {
        return 'Не валидный email';
    }
}

export class MaxLengthValidator implements Validator<string> {
    constructor(public maxLength: number) {
    }

    public isValid(value: string): boolean {
        return value.length < this.maxLength;
    }

    public getDescription(): string {
        return `Длинна должна быть больше ${this.maxLength}`;
    }
}

export class MinLengthValidator implements Validator<string> {
    constructor(public minLength: number) {
    }

    public isValid(value: string): boolean {
        return value.length > this.minLength;
    }

    public getDescription(): string {
        return `Длинна должна быть больше ${this.minLength}`;
    }
}

export class ValidatorComposer<T> implements Validator<T> {
    private description = '';

    constructor(public validatorList: Validator<T>[]) {
    }

    public isValid(value: T): boolean {
        return this.validatorList.every(item => {
            if (!item.isValid(value)) {
                this.description = item.getDescription();
                return false;
            }
            return true;
        });
    }

    public getDescription(): string {
        return this.description;
    }
}
