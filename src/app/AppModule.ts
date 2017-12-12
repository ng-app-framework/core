import {Component, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {NgCoreModule} from "./NgCoreModule";

@Component({
    selector: 'app',
    template: `
        <div>It works!</div>
    `
})
export class AppComponent {

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
