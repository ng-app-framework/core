import {EventEmitter, Injectable} from '@angular/core';
import {Value} from './Value';

@Injectable()
export class WindowEvents {

    onMessage = new EventEmitter<any>();

    listen(window: Window) {
        if (Value.isDefined(window.addEventListener)) {
            window.addEventListener('message', (event: any) => {
                this.onMessage.emit(event);
            });
        }
    }
}
