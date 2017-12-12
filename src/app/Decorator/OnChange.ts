import {EventEmitter} from "@angular/core";
import {Value} from "../Service/Value";

export const OnChange: PropertyDecorator = function (target: any, key: string) {
    target[`_${key}`] = target[key];
    return {
        set         : function (value) {
            let hasChanged  = this[`_${key}`] !== value;
            this[`_${key}`] = value;
            if (hasChanged && Value.isInstanceOf(this[`${key}Change`], EventEmitter)) {
                this[`${key}Change`].emit(value);
            }
        },
        get         : function () {
            return this[`_${key}`];
        },
        enumerable  : true,
        configurable: true
    };
};
