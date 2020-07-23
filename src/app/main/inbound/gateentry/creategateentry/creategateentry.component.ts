import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SessionManageMent} from "../../../../../@pristine/process/SessionManageMent";
import {WebApiHttp} from "../../../../../@pristine/process/WebApiHttp.services";
import {LocationList, Order, VendorList} from "./creategateentry";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-creategateentry',
    templateUrl: './creategateentry.component.html',
    styleUrls: ['./creategateentry.component.scss']
})

export class CreategateentryComponent implements OnInit {
    registerForm: FormGroup;


    freightType: string[] = ['Pay', 'To Pay'];
    documentType: string[] = ['Purchase Order', 'Inbound Transfer Order', 'Sales Return Order'];
    searchByvendorname: string = '';
    vendorlist: VendorList[];
    orderlist: Order[];
    searchBydocumentNo: string;
    searchBylocation: string;
    locationlist: LocationList[];
    currentdate: any = Date.now();

    constructor(
        public sessionManageMent: SessionManageMent,
        private webApiHttp: WebApiHttp,
        private _formBuilder: FormBuilder,
        private _toster: ToastrService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private datePipe: DatePipe
    ) {
        this.registerForm = this._formBuilder.group({
            VehicleNo: ['', Validators.required],
            DriverName: ['', Validators.required],
            DriverNumber: ['', Validators.required],
            Transpoter: ['', Validators.required],
            LRNo: ['', Validators.required],
            LRDate: ['', Validators.required],
            Freight: ['', Validators.required],
            FreightAmount: ['0'],
            DocumentType: ['', Validators.required],
            DocumentNo: ['', Validators.required],
            VendorNoorFromLocation: ['', Validators.required],
            ChallanNo: [''],
            ChallanDate: [''],
            NoofBox: ['', Validators.required],
            ItemDescription: ['', <any>Validators.maxLength(200)]

        });
    }

    ngOnInit(): void {
        this.get_vendor();
        this.get_location();
    }

    get_location() {
        try {
            this.spinner.show();
            this.webApiHttp.Get(this.webApiHttp.ApiURLArray.locationlist).then(result => {
                this.locationlist = result as LocationList[];
                this.spinner.hide();
            }).catch(e => {
                this.spinner.hide();
                this._toster.error(e, 'Error');
            })
        } catch (e) {
            this.spinner.hide();
            this._toster.error(e, 'Error');
        }
    }

    get_vendor() {
        try {
            this.spinner.show();
            this.webApiHttp.Get(this.webApiHttp.ApiURLArray.GetVendorDetail + this.searchByvendorname).then(result => {
                this.vendorlist = result as VendorList[];
                if (this.vendorlist[0].condition.toLowerCase() != 'true') {
                    this._toster.error(this.vendorlist[0].message, 'Error');
                }
                this.spinner.hide();
            }).catch(e => {
                this.spinner.hide();
                this._toster.error(e, 'Error');
            })
        } catch (e) {
            this.spinner.hide();
            this._toster.error(e, 'Error');
        }
    }

    get_purchase_no_by_vendor() {
        try {
            this.spinner.show();
            this.webApiHttp.Get(this.webApiHttp.ApiURLArray.ActivePurchaseOrderByVendor + this.registerForm.get('VendorNoorFromLocation').value + '&locationid=' + this.sessionManageMent.getLocationId).then(result => {
                this.orderlist = result as Order[];
                if (this.orderlist[0].condition.toLowerCase() != 'true') {
                    this._toster.error(this.orderlist[0].message, 'Error');
                }
                this.spinner.hide();
            }).catch(e => {
                this.spinner.hide();
                this._toster.error(e, 'Error');
            })
        } catch (e) {
            this.spinner.hide();
            this._toster.error(e, 'Error');
        }
    }


    get_transfer_no_by_location() {


    }

    CreategateEntry() {
        try {
            console.log(this.registerForm.value);
            this.spinner.show();
            const json = {
                LocationId: this.sessionManageMent.getLocationId,
                VehicleNo: this.registerForm.get('VehicleNo').value,
                DriverName: this.registerForm.get('DriverName').value,
                DriverNumber: this.registerForm.get('DriverNumber').value,
                Transporter: this.registerForm.get('Transpoter').value,
                LRNo: this.registerForm.get('LRNo').value,
                LRDate: this.datePipe.transform(this.registerForm.get('LRDate').value.toLocaleString(), 'MM-dd-yyyy'),
                Freight: this.registerForm.get('Freight').value,
                FreightAmount: this.registerForm.get('FreightAmount').value,
                VendorNo: this.registerForm.get('VendorNoorFromLocation').value,
                DocumentType: this.registerForm.get('DocumentType').value,
                DocumentNo: this.registerForm.get('DocumentNo').value,
                ChallanDate: this.datePipe.transform(this.registerForm.get('ChallanDate').value.toLocaleString(), 'MM-dd-yyyy'),
                ChallanNo: this.registerForm.get('ChallanNo').value,
                NoofBox: this.registerForm.get('NoofBox').value,
                CreatedBy: this.sessionManageMent.getEmail,
                Description: this.registerForm.get('ItemDescription').value
            }

            this.webApiHttp.Post(this.webApiHttp.ApiURLArray.CreateGateEntry, json).then(result => {
                this.orderlist = result as Order[];
                if (this.orderlist[0].condition.toLowerCase() === 'true') {
                    this._toster.success(this.orderlist[0].message, 'Message');
                    this.spinner.hide();
                    this.router.navigateByUrl('/inbound/gateentrylist');
                } else {
                    this.spinner.hide();
                    this._toster.error(this.orderlist[0].message, 'Error');
                }
            }).catch(e => {
                this.spinner.hide();
                this._toster.error(e, 'Error');
            })
        } catch (e) {
            this.spinner.hide();
            this._toster.error(e, 'Error');
        }
    }
}
