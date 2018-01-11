import {Component, EventEmitter, NgModule} from "@angular/core";
import {BrowserModule}                     from "@angular/platform-browser";
import {CommonModule}                      from "@angular/common";
import {NgCoreModule}                      from "../lib/NgCoreModule";
import {OnChange}                          from "../lib/Decorator/OnChange";

@Component({
    selector: 'app',
    template: `
        <div>It works!</div>
    `
})
export class AppComponent {

    @OnChange value: string = '';
              valueChange   = new EventEmitter<string>();

    constructor() {

    }
}

@NgModule({
    declarations: [AppComponent],
    imports     : [
        BrowserModule,
        CommonModule,
        NgCoreModule
    ],
    exports     : [AppComponent],
    providers   : [],
    bootstrap   : [AppComponent]

})
export class AppModule {

}
