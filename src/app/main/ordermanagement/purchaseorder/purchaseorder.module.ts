import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PurchaseordercreateModule} from "./purchaseordercreate/purchaseordercreate.module";
import {PurchaseorderlistModule} from "./purchaseorderlist/purchaseorderlist.module";
import {PurchaseorderviewModule} from "./purchaseorderview/purchaseorderview.module";
import {PurchaseorderapprovalModule} from "./purchaseorderapproval/purchaseorderapproval.module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        PurchaseordercreateModule,
        PurchaseorderlistModule,
        PurchaseorderviewModule,
        PurchaseorderapprovalModule

    ]
})
export class PurchaseorderModule {
}
