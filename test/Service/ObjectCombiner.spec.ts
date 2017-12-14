import {ObjectCombiner} from "../../src/lib/Service/ObjectCombiner";

class DummyClass {

    testProperty = 'What!?';

    testFunction() {
        return 'What!?';
    }
}

describe('Class: ObjectCombiner', () => {
    describe('After Instantiation', () => {
        describe('Object Combining', () => {
            let baseObject: DummyClass;
            beforeEach(() => {
                baseObject = new DummyClass();
            });
            it('should overwrite values of a base object', () => {
                let newObject = {
                    testProperty: 'new value'
                };
                ObjectCombiner.combine(baseObject, newObject);
                expect(baseObject.testProperty).toEqual(newObject.testProperty);
            });
            it('should not overwrite functions', () => {
                let newObject = {
                    testFunction: function () {
                        return 'WRONG!';
                    }
                };
                ObjectCombiner.combine(baseObject, newObject);
                expect(baseObject.testFunction()).not.toEqual(newObject.testFunction());
            });
            it('should not add properties', () => {
                let newObject = {
                    newProperty: 'word'
                };
                ObjectCombiner.combine(baseObject, newObject);
                expect(baseObject['newProperty'] === undefined).toBeTruthy();
            });
            it('should not set values to null', () => {
                let newObject = {
                    testProperty: null
                };
                ObjectCombiner.combine(baseObject, newObject);
                expect(baseObject.testProperty).not.toEqual(newObject.testProperty);
            });
            it('should allow an omission list of keys', () => {
                let newObject = {
                    testProperty: 'Should not have combined'
                };
                ObjectCombiner.combine(baseObject, newObject, ['testProperty']);
                expect(baseObject.testProperty).not.toEqual(newObject.testProperty);
            })
        })
    });
});
