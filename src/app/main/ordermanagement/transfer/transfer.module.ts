import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransferlistModule} from "./transferlist/transferlist.module";
import {TransfercreateModule} from "./transfercreate/transfercreate.module";
import {TransferviewModule} from "./transferview/transferview.module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TransferlistModule,
        TransfercreateModule,
        TransferviewModule
    ]
})
export class TransferModule {
}
