import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemmanagementModule} from "./itemmanagement/itemmanagement.module";
import {BinmanagementModule} from "./binmanagement/binmanagement.module";
import {DspModule} from "./dsp/dsp.module";
import {BarcodelistModule} from "./barcodelist/barcodelist.module";
import {CustomerModule} from "./customer/customer.module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ItemmanagementModule,
        BinmanagementModule,
        DspModule,
        BarcodelistModule,
        CustomerModule
    ]
})
export class AdminModule {
}
