import {Value} from "../../src/app/Service/Value";

describe('Class: Value', () => {
    describe('Method: Coalesce', () => {

        it('should return null if an empty string value is provided', () => {
            expect(Value.coalesce('')).toEqual(null);
        });
    });
    describe('Method: Get Date As String', () => {
        it('should return a mysql date string', () => {
            let date = new Date('10/10/2017');
            expect(Value.getDateAsString(date)).toEqual('2017-10-10');
        });
        it('should return an empty string if the date is not provided', () => {
            expect(Value.getDateAsString(null)).toEqual('');
        });
        it('should return an empty string if the value is not a date', () => {
            expect(Value.getDateAsString(<any>'20123')).toEqual('');
        });
    });
});
