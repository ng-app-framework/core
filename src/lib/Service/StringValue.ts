import {Value} from "./Value";

export class StringValue {
    static replace(target: string, stringToReplace: string, replacement: string) {
        let escaped            = this.escapeCharacters(stringToReplace);
        let escapedReplacement = this.escapeDollarSigns(replacement);
        return target.replace(new RegExp(escaped, 'g'), escapedReplacement);
    }

    protected static escapeDollarSigns(string: string) {
        return string.replace(/\$/g, '$$$$');
    }

    protected static escapeCharacters(string: string) {
        return string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    }


    static isVowel(value: string) {
        return /[aeiouAEIOU]/.test(value);
    }

    static startsWithAVowel(value: string) {
        return this.isPopulated(value) && this.isVowel(value[0]);
    }

    static isPopulated(value: string) {
        return Value.isString(value) && Value.hasLength(value);
    }
}
