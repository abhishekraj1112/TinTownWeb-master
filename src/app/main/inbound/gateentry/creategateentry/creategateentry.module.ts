import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {CreategateentryComponent} from "./creategateentry.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../../../../@pristine/process/AuthGuard";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {pristineSharedModule} from "../../../../../@pristine/shared.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
    {
        path: 'creategateentry',
        component: CreategateentryComponent,
        canActivate: [AuthGuard]
    }
];


@NgModule({
    declarations: [CreategateentryComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatIconModule,
        MatDividerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule,
        pristineSharedModule,
        MatDatepickerModule,
        MatButtonModule
    ],
    providers: [DatePipe]
})
export class CreategateentryModule {
}
