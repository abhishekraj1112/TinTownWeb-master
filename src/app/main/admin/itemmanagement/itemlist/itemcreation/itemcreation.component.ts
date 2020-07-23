import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {EncriptDecript} from "../../../../../../@pristine/process/EncriptDecript";
import {WebApiHttp} from "../../../../../../@pristine/process/WebApiHttp.services";
import {BaseUomCodeModel, categorymodel, GstGroupIdModel, GstHsnCodeModel, subcategorymodel} from "./itemcreationmodel";
import {ItemcreationService} from "./itemcreation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionManageMent} from "../../../../../../@pristine/process/SessionManageMent";

@Component({
    selector: 'app-itemcreation',
    templateUrl: './itemcreation.component.html',
    styleUrls: ['./itemcreation.component.scss']
})
export class ItemcreationComponent implements OnInit {
    GeneralInformation: FormGroup;
    ItemCategoryList: Array<categorymodel> = []
    ItemSubcategoryList: Array<subcategorymodel> = []
    GetGstGroupId: Array<GstGroupIdModel> = []
    GetGstHsnCode: Array<GstHsnCodeModel> = []
    GetBaseUom: Array<BaseUomCodeModel> = []
    data: any;
    type: string

    constructor(private  fb: FormBuilder,
                private httpClient: HttpClient,
                private _encryptdecrypt: EncriptDecript,
                private WebApihttp: WebApiHttp,
                private _toster: ToastrService,
                private _itemcreationservice: ItemcreationService,
                private  router: Router,
                public sessionManageMent: SessionManageMent,
                private  route: ActivatedRoute) {
        this.GeneralInformation = this.fb.group({
            itemCode: [null, Validators.required],
            description: [null, Validators.required],
            baseUom: [null, Validators.required],
            salesUom: [null, Validators.required],
            purchaseUom: [null],
            category: [null, Validators.required],
            subCategory: [null, Validators.required],
            imageUrl: [null],
            mrp: [null, Validators.required],
            unitPrice: [null, Validators.required],
            cost: [null, Validators.required],
            gstGroup: [null, Validators.required],
            hsnCode: [null, Validators.required],
        })
        this.ItemCategoryList = this._itemcreationservice.ItemCategoryList
        this.GetGstGroupId = this._itemcreationservice.GetGstGroupId
        this.GetBaseUom = this._itemcreationservice.GetBaseUom
    }


    ngOnInit(): void {

        this.type = this.route.snapshot.paramMap.get('type')
        if (this.type == 'edit') {
            this.data = JSON.parse(this._encryptdecrypt.decrypt(this.route.snapshot.paramMap.get('res')));
            this.getGstHsnCode(this.data.gst_group);
            this.getItemSubCategory(this.data.main_category)
            this.GeneralInformation.get('itemCode').setValue(this.data.item_no),
                this.GeneralInformation.get('itemCode').disable()
            this.GeneralInformation.get('description').setValue(this.data.description),
                this.GeneralInformation.get('purchaseUom').setValue(this.data.purchase_unit_of_measure),
                this.GeneralInformation.get('salesUom').setValue(this.data.sale_unit_of_measure),
                this.GeneralInformation.get('baseUom').setValue(this.data.base_unit_of_measure),
                this.GeneralInformation.get('category').setValue(this.data.main_category),
                this.GeneralInformation.get('subCategory').setValue(this.data.sub_category),
                this.GeneralInformation.get('unitPrice').setValue(this.data.unit_price),
                this.GeneralInformation.get('gstGroup').setValue(this.data.gst_group),
                this.GeneralInformation.get('hsnCode').setValue(this.data.hsn_code),
                this.GeneralInformation.get('cost').setValue(this.data.cost_per_unit),
                this.GeneralInformation.get('mrp').setValue(this.data.mrp),
                this.GeneralInformation.get('imageUrl').setValue(this.data.image_url)

        }
    }

    getItemSubCategory(data) {
        try {
            this.WebApihttp.Get(this.WebApihttp.ApiURLArray.ItemSubCategoryList + data)
                .then(result => {
                    if (Array.isArray(result) && result.length) {
                        this.ItemSubcategoryList = result as subcategorymodel[];
                        //this.GeneralInformation.get('subCategory').setValue('')
                    } else {
                        this._toster.error('error', 'Sub category not found');
                        this.GeneralInformation.get('subCategory').setValue('')
                    }
                }, error => {
                    this._toster.error('error', error)
                })
        } catch (e) {
            this._toster.error('error', e)

        }
    }

    getGstHsnCode(data: any) {
        try {
            this.WebApihttp.Get(this.WebApihttp.ApiURLArray.GetGstHsnCode + data)
                .then(result => {
                    if (Array.isArray(result) && result.length) {
                        this.GetGstHsnCode = result as GstHsnCodeModel[];
                    } else {
                        this._toster.error('error', 'Hsn code not found')
                    }
                }, error => {
                    this._toster.error('error', error)
                })
        } catch (e) {
            this._toster.error('error', e)
        }
    }

    ItemCreate() {
        var json = {}
        if (this.type == 'edit') {
            json = {
                item_no: this.data.item_no,
                name: this.GeneralInformation.get('description').value,
                description: this.GeneralInformation.get('description').value,
                purchaseUom: this.GeneralInformation.get('purchaseUom').value,
                saleUom: this.GeneralInformation.get('salesUom').value,
                base_uom: this.GeneralInformation.get('baseUom').value,
                category: this.GeneralInformation.get('category').value,
                subCategory: this.GeneralInformation.get('subCategory').value,
                unitPrice: this.GeneralInformation.get('unitPrice').value,
                gstGroupId: this.GeneralInformation.get('gstGroup').value,
                gstHsnCode: this.GeneralInformation.get('hsnCode').value,
                costPerUnit: this.GeneralInformation.get('cost').value,
                mrp: this.GeneralInformation.get('mrp').value,
                image_url: this.GeneralInformation.get('imageUrl').value,
                flag: 'update',
                created_by: '',
                updated_by: this._encryptdecrypt.decrypt(localStorage.getItem('ZV_SSID')),
            }
        } else {
            json = {
                item_no: this.GeneralInformation.get('itemCode').value,
                name: this.GeneralInformation.get('description').value,
                description: this.GeneralInformation.get('description').value,
                purchaseUom: this.GeneralInformation.get('purchaseUom').value,
                saleUom: this.GeneralInformation.get('salesUom').value,
                base_uom: this.GeneralInformation.get('baseUom').value,
                category: this.GeneralInformation.get('category').value,
                subCategory: this.GeneralInformation.get('subCategory').value,
                unitPrice: this.GeneralInformation.get('unitPrice').value,
                gstGroupId: this.GeneralInformation.get('gstGroup').value,
                gstHsnCode: this.GeneralInformation.get('hsnCode').value,
                costPerUnit: this.GeneralInformation.get('cost').value,
                mrp: this.GeneralInformation.get('mrp').value,
                image_url: this.GeneralInformation.get('imageUrl').value,
                flag: 'insert',
                created_by: this._encryptdecrypt.decrypt(localStorage.getItem('ZV_SSID')),
                updated_by: '',
            }
        }

        try {
            this.WebApihttp.Post(this.WebApihttp.ApiURLArray.ItemCreate, json)
                .then(result => {
                    if (result[0].condition.toLowerCase() == 'true') {
                        this._toster.success('success', result[0].message)
                        this.router.navigate(['/admin/itemlist'])
                    } else {
                        this._toster.error('error', result[0].message)
                    }
                }, error => {
                    this._toster.success('success', error)
                })
        } catch (e) {
            this._toster.success('success', e)
        }

    }
}
