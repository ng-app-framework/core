import {Value} from "./Value";

export class ValueMapper {
    protected propertyMap: { [key: string]: any } = {};

    addMap(from: string, to: string) {
        this.propertyMap[from] = to;
    }

    mapToNewObject<T>(oldObject: T): T {
        let obj: T = <any>{};
        for (let key in this.propertyMap) {
            if (Value.isNotNull(oldObject[key])) {
                this.mapByKey(obj, key, oldObject);
            }
        }
        return obj;
    }

    mapByKey(newObject: any, key, oldObject: any) {
        newObject[this.propertyMap[key]] = oldObject[key];
    }
}
