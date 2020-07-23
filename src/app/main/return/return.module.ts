import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManifestreturnModule} from "./manifestreturn/manifestreturn.module";
import {ManifestreturnlistModule} from "./manifestreturnlist/manifestreturnlist.module";
import {ReversepickupModule} from "./reversepickup/reversepickup.module";
import {CrlistModule} from "./crlist/crlist.module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ManifestreturnModule,
        ManifestreturnlistModule,
        ReversepickupModule,
        CrlistModule
    ]
})
export class ReturnModule {
}
