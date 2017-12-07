import {StringValue} from "../../src/app/Service/StringValue";

describe('Class: StringValue', () => {

    let subject = StringValue;

    describe('Method: Replace', () => {
        it('should replace all instances of a string with another', () => {
            // Native replace only replaces one instance
            expect('old other old'.replace('old', 'new')).toEqual('new other old');
            // New implementation replaces ALL instances
            expect(subject.replace('old other old', 'old', 'new')).toEqual('new other new');
        });
    });
    describe('Method: Is Vowel', () => {
        it('should return true if a vowel is provided', () => {
            let vowels = ['a', 'e', 'i', 'o', 'u'];
            for (let vowel of vowels) {
                expect(subject.isVowel(vowel)).toBeTruthy();
            }
        });
        it('should not consider a y as a vowel', () => {
            expect(subject.isVowel('y')).toBeFalsy();
        });
        it('should not consider consonants to be vowels', () => {
            let consonants = ['q', 'w', 'r', 't', 'p', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
            for (let consonant of consonants) {
                expect(subject.isVowel(consonant)).toBeFalsy();
            }
        });
    });
    describe('Method: Starts With A Vowel', () => {
        it('should return true if the value provided begins with a vowel', () => {
            expect(subject.startsWithAVowel('apple')).toBeTruthy();
            expect(subject.startsWithAVowel('Operation')).toBeTruthy();
        });
        it('should return false if the value does not begin with a vowel', () => {
            expect(subject.startsWithAVowel('Stupendous')).toBeFalsy();
        });
    });
});
