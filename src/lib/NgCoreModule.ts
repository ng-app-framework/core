import {NgModule} from '@angular/core';
import {WindowEvents} from "./Service/WindowEvents";


@NgModule({
    providers: [
        WindowEvents
    ]
})
export class NgCoreModule {

    constructor(events: WindowEvents) {
        events.listen(window);
    }
}

