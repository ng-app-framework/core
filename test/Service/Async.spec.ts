import {Async} from "../../src/app/Service/Async";
import {Observable} from "rxjs/Rx";

describe('Class: Async', () => {


    describe('For Each', () => {
        it('should execute something for each element in an array (but not edit the element)', (done) => {
            let executed = 0;
            Async.forEach$([1, 2, 3, 4], (element) => {
                executed++;
                return "This should not edit the array";
            }).toArray().subscribe((arr) => {
                expect(executed).toEqual(4);
                expect(arr).toEqual([1, 2, 3, 4]);
                done();
            });
        })
    });

    describe('Map', () => {
        it('should manipulate each element in an array', (done) => {
            Async.map$([1, 2, 3, 4], (element) => element * 2).toArray().subscribe((arr) => {
                expect(arr).toEqual([2, 4, 6, 8]);
                done();
            })
        })
    });

    describe('Merge', () => {

        it('should operate just like the Observable merge', (done) => {
            Observable.from([1, 2, 3]).merge([4, 5]).toArray().subscribe((arr) => {
                expect(arr).toEqual([1, 2, 3, 4, 5]);
                done();
            });
        });
        it('should combine multiple observables', (done) => {
            Async.merge$([Observable.from([1, 2, 3]), Observable.from([4, 5])])
                .toArray()
                .subscribe((arr) => {
                    expect(arr).toEqual([1, 2, 3, 4, 5]);
                    done();
                });
        });
    });

    describe('Filter', () => {
        it('should only return elements that meet a condition', (done) => {
            Async.filter$([1, 2, 3, 4], (element) => element % 2 === 0).toArray().subscribe((arr) => {
                expect(arr).toEqual([2, 4]);
                done();
            })
        })
    });

    describe('Map To Observable', () => {
        it('should execute an observable on each element', (done) => {
            Async.mapToObservable$([1, 2, 3], (element, index) => {
                return Observable.from([index]);
            }).toArray().subscribe((arr) => {
                expect(arr).toEqual([0, 1, 2]);
                done();
            })
        })
    });

    describe('Get Observable For Value', () => {
        it('should return an observable that emits a single value', (done) => {
            let executed         = 0;
            let elementsReturned = [];
            Async.getObservableForValue$([1, 2, 3]).subscribe({
                next    : (element) => {
                    executed++;
                    elementsReturned.push(element);
                },
                complete: () => {
                    expect(executed).toEqual(1);
                    expect(elementsReturned).toEqual([[1, 2, 3]]);
                    done();
                }
            })
        })
    });

    describe('If Then Else', () => {
        it('should return an observable based on a condition', (done) => {
            Async.ifThenElse$(
                Observable.from([1, 2, 3]),
                (element) => element === 2,
                (element) => Observable.from(['then']),
                (element) => Observable.from(['else'])
            )
                .toArray()
                .subscribe((elements) => {
                    expect(elements).toEqual(['else', 'then', 'else']);
                    done();
                })
        });
        it('should not return values if no else is provided', (done) => {
            Async.ifThenElse$(
                Observable.from([1, 2, 3]),
                (element) => element === 2,
                (element) => Observable.from(['then'])
            )
                .toArray()
                .subscribe((elements) => {
                    expect(elements).toEqual(['then']);
                    done();
                })
        });
    });
});
