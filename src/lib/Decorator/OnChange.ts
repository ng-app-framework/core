import {EventEmitter} from "@angular/core";
import {Value}        from "../Service/Value";

export function OnChange(target: any, key: string): any {
    return {
        set         : function (value) {
            let hasChanged  = this['_' + key] !== value;
            this['_' + key] = value;
            if (hasChanged && Value.isInstanceOf(this[key + 'Change'], EventEmitter)) {
                this[key + 'Change'].emit(value);
            }
        },
        get         : function () {
            if (this['_' + key] === undefined) {
                target['_' + key] = target[key];
            }
            return this['_' + key];
        },
        enumerable  : true,
        configurable: true
    };
};
