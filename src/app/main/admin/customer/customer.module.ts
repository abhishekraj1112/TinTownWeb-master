import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerviewModule} from "./customerview/customerview.module";
import {CustomerlistModule} from "./customerlist/customerlist.module";
import {CustomercreateModule} from "./customercreate/customercreate.module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CustomerviewModule,
        CustomerlistModule,
        CustomercreateModule
    ]
})
export class CustomerModule {
}
