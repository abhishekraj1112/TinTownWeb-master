import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemlistModule} from "./itemlist/itemlist.module";
import {ItemcreationModule} from "./itemlist/itemcreation/itemcreation.module";
import {ItemcategoryModule} from "./itemcategory/itemcategory.module";
import {ItemsubcategoryModule} from "./itemcategory/itemsubcategory/itemsubcategory.module";
import {ItemattributeModule} from "./itemattribute/itemattribute.module";
import {ItemviewModule} from "./itemlist/itemview/itemview.module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ItemlistModule,
        ItemcreationModule,
        ItemcategoryModule,
        ItemsubcategoryModule,
        ItemattributeModule,
        ItemviewModule
    ]
})
export class ItemmanagementModule {
}
