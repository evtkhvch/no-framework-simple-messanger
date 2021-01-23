export interface Validator<T> {
    isValid(value: T): boolean;

    getDescription(): string;
}

export interface FormState {
    [name: string]: FormControl;
}

export class FormControl {
    constructor(public value: string, public validator: Validator<unknown>) {
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
    private description: string = '';

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
