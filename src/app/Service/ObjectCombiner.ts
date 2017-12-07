import {Value} from "./Value";

export class ObjectCombiner {
    static combine(baseObject: any, otherObject: any, omitKeys: string[] = []) {
        Object.keys(baseObject)
            .filter(key => Value.isNotNull(otherObject[key]))
            .filter(key => !Value.contains(omitKeys, key))
            .forEach(key => {
                baseObject[key] = otherObject[key];
            });
    }
}
