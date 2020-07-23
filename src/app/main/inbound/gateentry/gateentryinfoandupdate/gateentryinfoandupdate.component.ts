import {Component, OnInit} from '@angular/core';
import {SessionManageMent} from "../../../../../@pristine/process/SessionManageMent";
import {WebApiHttp} from "../../../../../@pristine/process/WebApiHttp.services";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {EncriptDecript} from "../../../../../@pristine/process/EncriptDecript";
import {DatePipe} from "@angular/common";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'app-gateentryinfoandupdate',
    templateUrl: './gateentryinfoandupdate.component.html',
    styleUrls: ['./gateentryinfoandupdate.component.scss']
})
export class GateentryinfoandupdateComponent implements OnInit {
    Pagetype: any;
    infoForm: FormGroup

    constructor(
        public sessionManageMent: SessionManageMent,
        private webApiHttp: WebApiHttp,
        private _formBuilder: FormBuilder,
        private _toster: ToastrService,
        private _encriptDecript: EncriptDecript,
        private router: Router,
        private route: ActivatedRoute,
        private datePipe: DatePipe,
        private spinner: NgxSpinnerService
    ) {
        this.infoForm = this._formBuilder.group({
            VehicleNo: ['',],
            DriverName: [''],
            DriverNumber: [''],
            Transpoter: [''],
            LRNo: [''],
            LRDate: [''],
            Freight: [''],
            FreightAmount: ['0'],
            DocumentType: [''],
            DocumentNo: [''],
            VendorNoorFromLocation: [''],
            ChallanNo: [''],
            ChallanDate: [''],
            NoofBox: [''],
            GateEntryNo: [''],
            GateEntryDateTime: [''],
            CreatedBy: [''],
            ItemDescription: [''],
            Location: ['']
        })
    }

    ngOnInit(): void {
        try {
            this.spinner.show();
            var inputjson = JSON.parse(this._encriptDecript.decrypt(this.route.snapshot.paramMap.get('response')))
            this.webApiHttp.Get(this.webApiHttp.ApiURLArray.GateEntryInfoByid + inputjson.gateentryid).then(
                result => {
                    if (result[0].condition == 'True') {
                        this.infoForm.get('VehicleNo').setValue(result[0].vehicle_no);
                        this.infoForm.get('DriverName').setValue(result[0].drive_name);
                        this.infoForm.get('DriverNumber').setValue(result[0].driver_number);
                        this.infoForm.get('Transpoter').setValue(result[0].transporter);
                        this.infoForm.get('LRNo').setValue(result[0].lr_no);
                        this.infoForm.get('LRDate').setValue(result[0].lr_date);
                        this.infoForm.get('Freight').setValue(result[0].freight);
                        this.infoForm.get('FreightAmount').setValue(result[0].freight_amount);
                        this.infoForm.get('DocumentType').setValue(result[0].document_type);
                        this.infoForm.get('DocumentNo').setValue(result[0].document_no);
                        this.infoForm.get('VendorNoorFromLocation').setValue(result[0].vender_no_or_company);
                        this.infoForm.get('ChallanNo').setValue(result[0].challan_no);
                        this.infoForm.get('ChallanDate').setValue(result[0].challan_date);
                        this.infoForm.get('NoofBox').setValue(result[0].no_of_boxes);
                        this.infoForm.get('GateEntryNo').setValue(result[0].gate_entry_no);
                        this.infoForm.get('GateEntryDateTime').setValue(this.datePipe.transform(result[0].gate_entry_datetime, 'dd/MM/yyyy hh:mm a'))
                        this.infoForm.get('CreatedBy').setValue(result[0].created_by);
                        this.infoForm.get('ItemDescription').setValue(result[0].item_description);
                        this.infoForm.get('Location').setValue(this.sessionManageMent.getLocationName);
                        this.infoForm.disable({onlySelf: true});
                    }
                    this.spinner.hide();
                }
            ).catch(e => {
                this.spinner.hide();
                this._toster.error(e, 'Error');
            })
        } catch (e) {
            this.spinner.hide();
            this._toster.error(e, 'Error');
        }
    }

}
