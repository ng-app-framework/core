import {ValueMapper} from "../../src/app/Service/ValueMapper";

describe('Class: ValueMapper', () => {

    describe('After Instantiation', () => {
        let subject: ValueMapper;

        beforeEach(() => {
            subject = new ValueMapper();
        });

        describe('Method: Map To New Object', () => {
            let example = {
                id   : 1,
                name : 'bob',
                empty: null
            };
            it('should map properties from one to another', () => {
                subject.addMap('id', 'randomChange');
                let result = subject.mapToNewObject(example);
                expect(result['id'] !== undefined).toBeFalsy('The id property was still here');
                expect(result['randomChange'] !== undefined).toBeTruthy('The randomChange property does not exist');
            });
            it('should not map null', () => {
                subject.addMap('empty', 'newEmpty');
                let result = subject.mapToNewObject(example);
                expect(result['newEmpty'] === undefined).toBeTruthy('The newEmpty property should not have been mapped');
            });
            it('should only map keys from the defined maps', () => {
                subject.addMap('id', 'newId');
                subject.addMap('name', 'newName');
                expect(subject.mapToNewObject(example)).toEqual({
                    newId  : 1,
                    newName: 'bob'
                });
            })
        });
    });

});
