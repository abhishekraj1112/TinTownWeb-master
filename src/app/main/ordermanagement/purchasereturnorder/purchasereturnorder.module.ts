import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProlistModule} from "./prolist/prolist.module";
import {ProcreateModule} from "./procreate/procreate.module";
import {ProviewModule} from "./proview/proview.module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ProlistModule,
        ProcreateModule,
        ProviewModule
    ]
})
export class PurchasereturnorderModule {
}
