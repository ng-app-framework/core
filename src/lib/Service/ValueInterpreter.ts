import {Value} from "./Value";

export class ValueInterpreter {

    constructor(public valueProperty: string) {

    }

    getValueOfObject(obj) {
        if (Value.isDefined(obj[this.valueProperty])) {
            return obj[this.valueProperty];
        }
        return obj;
    }
}
