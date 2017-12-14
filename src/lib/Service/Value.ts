export class Value {

    static isProvided(value: any) {
        return value !== undefined && value !== null;
    }

    static isScalar(value: any) {
        return (/string|number|boolean/).test(typeof value);
    }

    static isNumber(value: any) {
        return this.isNotNull(value) && this.isTypeOf(Number, value);
    }

    static isBoolean(value: any) {
        return this.isNotNull(value) && this.isTypeOf(Boolean, value);
    }

    static isString(value: any) {
        return this.isNotNull(value) && this.isTypeOf(String, value);
    }

    static isArray(value: any) {
        return Array.isArray(value);
    }


    static isInstanceOf(instance: any, of: Function) {
        if (of === Object && Value.isArray(instance)) {
            return false;
        }
        return this.isSameClassAs(instance, of) || instance instanceof of;
    }

    static isSameClassAs(instance: any, otherClass: Function) {
        return this.isNotNull(instance) && instance['constructor'] !== undefined && instance.constructor === otherClass;
    }

    static isTypeOf(type, value) {
        if (!this.isNotNull(value)) {
            return false;
        }
        if (this.isSameClassAs(value, type)) {
            return true;
        }
        if (this.isScalarType(type)) {
            return this.isScalar(value) && this.isSameClassAs(value, type);
        }
        return !this.isScalar(value)
            && !this.isArray(value)
            && this.isInstanceOf(value, type);
    }


    static hasArrayElements(value) {
        return this.isNotNull(value) && this.isArray(value) && this.hasLength(value);
    }

    static hasProperties(value) {
        return this.isNotNull(value) && !this.isArray(value) && this.isInstanceOf(value, Object) && Object.keys(value).length > 0;
    }

    static isNotNull(value) {
        return value !== undefined && value !== null;
    }

    static isDefined(value) {
        return value !== undefined;
    }

    static hasLength(value) {
        return Value.isProvided(value) && Value.isDefined(value.length) && value.length > 0;
    }


    static hasKey(value: any, key: string) {
        return this.isDefined(value[key]);
    }

    static contains(container: any, value: any) {
        return (Value.isArray(container) || Value.isString(value)) && container.indexOf(value) > -1;
    }

    static isScalarType(type: Function) {
        return type === String || type === Number || type === Boolean;
    }

    static coalesce(value: any, defaultValue: any = null) {
        if (Value.isString(value) && !Value.hasLength(value)) {
            return defaultValue;
        }
        return Value.isProvided(value) ? value : defaultValue;
    }

    static getDateAsString(value: Date) {
        if (!Value.isProvided(value) || !Value.isSameClassAs(value, Date)) {
            return '';
        }
        let dateString  = this.getDatePaddedValue(value.getDate());
        let monthString = this.getDatePaddedValue(value.getMonth() + 1);
        let yearString  = value.getFullYear();
        return `${yearString}-${monthString}-${dateString}`;
    }

    private static getDatePaddedValue(value: number) {
        return value.toString().length === 2 ? '' + value : `0${value}`;
    }
}
