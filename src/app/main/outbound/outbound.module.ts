import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PickcreateModule} from "./pickcreate/pickcreate.module";
import {PickModule} from "./pick/pick.module";
import {TraysortingModule} from "./traysorting/traysorting.module";
import {ConsolidationModule} from "./consolidation/consolidation.module";
import {OqcModule} from "./oqc/oqc.module";
import {SingleoqcModule} from "./singleoqc/singleoqc.module";
import {PartialputwayModule} from "./partialputway/partialputway.module";
import {PickmanualModule} from "./pickmanual/pickmanual.module";
import {PicklistModule} from "./picklist/picklist.module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        PickcreateModule,
        PickModule,
        TraysortingModule,
        ConsolidationModule,
        SingleoqcModule,
        OqcModule,
        PartialputwayModule,
        PickmanualModule,
        PicklistModule
    ]
})
export class OutboundModule {
}
