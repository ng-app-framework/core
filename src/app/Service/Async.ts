import {Observable} from "rxjs/Rx";

export interface PipeCallback {
    (element: any, index ?: number): any;
}

export interface BooleanPipeCallback extends PipeCallback {
    (element: any, index ?: number): boolean;
}

export interface VoidPipeCallback extends PipeCallback {
    (element: any, index ?: number): void;
}

export interface ObservablePipeCallback extends PipeCallback {
    (element: any, index ?: number): Observable<any>;
}

export class Async {

    static forEach$(elements: any[], doThis: VoidPipeCallback): Observable<any> {
        return Observable.from(elements)
            .map((element, index) => {
                doThis(element, index);
                return element;
            });
    }

    static map$(elements: any[], mapTo: PipeCallback): Observable<any> {
        return Observable.from(elements)
            .map((option, index) => mapTo(option, index));
    }

    static merge$(observables: Observable<any>[]): Observable<any> {
        return Observable.merge(...observables);
    }

    static filter$(elements: any[], filterBy: BooleanPipeCallback): Observable<any> {
        return Observable.from(elements)
            .filter((option, index) => filterBy(option, index));
    }

    static mapToObservable$(elements: any[], mapTo: ObservablePipeCallback): Observable<any> {
        return Observable.from(elements)
            .flatMap((element, index) => mapTo(element, index));
    }

    static getObservableForValue$<T>(value: T): Observable<T> {
        return Observable.of(value);
    }

    static ifThenElse$(observable: Observable<any>, condition: BooleanPipeCallback, then$: ObservablePipeCallback, else$ ?: ObservablePipeCallback) {
        return observable.flatMap(value => {
            if (condition(value)) {
                return then$(value);
            }
            return else$ ? else$(value) : Observable.empty();
        })
    }

}
