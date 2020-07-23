import {Component, OnInit, ViewChild} from '@angular/core';
import {SessionManageMent} from "../../../../../@pristine/process/SessionManageMent";
import {WebApiHttp} from "../../../../../@pristine/process/WebApiHttp.services";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {ItemList, PurchaseOrderInfo, PurchaseOrderItemList, VendorList} from "./purchaseordercreatemodel";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DatePipe} from "@angular/common";
import {EncriptDecript} from "../../../../../@pristine/process/EncriptDecript";

@Component({
  selector: 'app-purchaseordercreate',
  templateUrl: './purchaseordercreate.component.html',
  styleUrls: ['./purchaseordercreate.component.scss']
})
export class PurchaseordercreateComponent implements OnInit {

  displayedColumns: string[] = ['item_no', 'item_descrition', 'quantity', 'cost_per_unit', 'amount', 'discount', 'total_amount', 'gst_amount', 'grand_total', 'Action'];
  dataSource: MatTableDataSource<PurchaseOrderItemList>;

  @ViewChild("matpaginator", {static: true}) paginator: MatPaginator;
  @ViewChild("matSort", {static: true}) sort: MatSort;

  currentdate: any = Date.now();
  purchaseForm: FormGroup;
  find_purchaseForm: FormGroup;
  complete: FormGroup;
  start: boolean = true;
  searchByVendorNameorNo: string = '';
  vendorlist: VendorList[];
  VendorInfoWithPO: PurchaseOrderInfo[]=[];
  itemlist: ItemList[];
  searchByItemNameorNo: string = '';
  purchaselist: Array<PurchaseOrderItemList>;
  paymentTerms: string[] = ['COD', ' 7 Days', '14 Days', '21 Days', 'Credit Memo'];
  minDateexp: any;
  inputjson: any;


  constructor(public sessionManageMent: SessionManageMent,
              private webApiHttp: WebApiHttp,
              private _formBuilder: FormBuilder,
              private _encriptDecript: EncriptDecript,
              private route: ActivatedRoute,
              private _toster: ToastrService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private datePipe: DatePipe) {
    this.purchaseForm = _formBuilder.group({
      ItemNo: ['', Validators.required],
      Quantity: [0, Validators.required],
      Discount: [0, Validators.required],
      IsExpireDate: [false, Validators.required],
      IsVandorLotNo: [false, Validators.required]
    });

    this.find_purchaseForm = _formBuilder.group({
      VendorNameorNo: ['', Validators.required]
    });


    this.complete = _formBuilder.group({
      PaymentTerms: ['', Validators.required],
      ExpiryDate: ['', Validators.required],
      ExpiryDateReceipt: ['', Validators.required],

    });

    this.dataSource = new MatTableDataSource<PurchaseOrderItemList>(this.purchaselist);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.minDateexp = new Date();


  }

  ngOnInit(): void {
    this.inputjson = JSON.parse(this._encriptDecript.decrypt(this.route.snapshot.paramMap.get('response')));

    switch (this.inputjson.type) {
      case 'create':
        this.get_VendorNo();
        break;
      case 'update':
        this.start = false;
        this.update_info();
        break;
    }
  }

  get_VendorNo() {
    try {
      this.spinner.show();
      this.webApiHttp.Get(this.webApiHttp.ApiURLArray.GetVendorDetail + this.searchByVendorNameorNo).then(result => {
        if (result[0].condition.toLowerCase() == 'true') {
          this.vendorlist = result;
        } else {
          this.vendorlist = [];
        }
        this.spinner.hide();
      }).catch(e => {
        this._toster.error(e, 'Error');
        this.spinner.hide();
      })
    } catch (e) {
      this._toster.error(e, 'Error');
      this.spinner.hide();
    }
  }

  get_purchase_orderno_with_vendorinfo() {
    try {
      this.spinner.show();
      this.webApiHttp.Get(this.webApiHttp.ApiURLArray.GetVendorCompleteDetailWithPoNo + this.find_purchaseForm.get('VendorNameorNo').value).then(result => {
        this.VendorInfoWithPO = result as PurchaseOrderInfo[];
        if (this.VendorInfoWithPO[0].condition.toLowerCase() === 'true') {
          this.start = false;
          this.spinner.hide();
        } else {
          this._toster.error(this.VendorInfoWithPO[0].message, 'Error');
          this.spinner.hide();
        }
      }).catch(e => {
        this._toster.error(e, 'Error');
        this.spinner.hide();
      })
    } catch (e) {
      this._toster.error(e, 'Error');
      this.spinner.hide();
    }
  }

  update_info(){
    try {
      this.spinner.show();
      this.webApiHttp.Post(this.webApiHttp.ApiURLArray.POInfoforUpdate ,{ PurchaseOrderNo:this.inputjson.document_no }).then(result => {
        if (result[0].condition.toLowerCase() === 'true') {
          this.VendorInfoWithPO = result;
          this.purchaselist =  result[0].lines;

          this.complete.get('PaymentTerms').setValue(result[0].pay_terms);
          this.complete.get('ExpiryDate').setValue(result[0].exp_date);
          this.complete.get('ExpiryDateReceipt').setValue(result[0].expiry_date_receipt);

          this.dataSource = new MatTableDataSource<PurchaseOrderItemList>(this.purchaselist);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this._toster.error(result[0].message, 'Error');
        }
        this.spinner.hide();
      }).catch(e => {
        this._toster.error(e, 'Error');
        this.spinner.hide();
      })

    }catch (e) {

    }
  }

  get_Item() {
    try {
      this.spinner.show();
      this.webApiHttp.Get(this.webApiHttp.ApiURLArray.FindItem + this.searchByItemNameorNo).then(result => {
        if (result[0].condition.toLowerCase() === 'true') {
          this.itemlist = result as ItemList[];
        } else {
          this._toster.error(result[0].message, 'Error');
        }
        this.spinner.hide();
      }).catch(e => {
        this._toster.error(e, 'Error');
        this.spinner.hide();
      })
    } catch (e) {
      this._toster.error(e, 'Error');
      this.spinner.hide();
    }
  }

  AddItem() {
    try {
      if (this.purchaseForm.get('Quantity').value > 0 && this.purchaseForm.get('Discount').value >= 0) {
        this.spinner.show();
        const json = {
          ItemNo: this.purchaseForm.get('ItemNo').value,
          VendorNo: this.VendorInfoWithPO[0].vendor_no,
          Quantity: this.purchaseForm.get('Quantity').value,
          Discount: this.purchaseForm.get('Discount').value,
        }
        this.webApiHttp.Post(this.webApiHttp.ApiURLArray.GetVendorItem, json).then(result => {
          if (result[0].condition.toLowerCase() === 'true') {
            this.purchaselist = result as PurchaseOrderItemList[];

            this.purchaselist[0].is_expire_date = (this.purchaseForm.get('IsExpireDate').value ? 1 : 0);
            this.purchaselist[0].is_vendor_lotno = (this.purchaseForm.get('IsVandorLotNo').value ? 1 : 0);


            this.purchaseForm.get('IsExpireDate').setValue(false);
            this.purchaseForm.get('IsVandorLotNo').setValue(false);
            this.purchaseForm.get('ItemNo').setValue('');
            this.purchaseForm.get('Quantity').setValue(0);
            this.purchaseForm.get('Discount').setValue(0);


            if (this.dataSource?.data?.length == undefined || this.dataSource?.data?.length == 0) {
              this.dataSource = new MatTableDataSource<PurchaseOrderItemList>(this.purchaselist);
            } else {
              this.dataSource.data.push(this.purchaselist[0]);
              this.dataSource = new MatTableDataSource<PurchaseOrderItemList>(this.dataSource.data);
            }
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this._toster.error(result[0].message, 'Error');

          }
          this.spinner.hide();
        }).catch(e => {
          this._toster.error(e, 'Error');
          this.spinner.hide();
        })
      } else if (this.purchaseForm.get('Quantity').value <= 0) {
        this._toster.warning('Put Some Quantity Before Adding it.', 'Warning');
      } else if (this.purchaseForm.get('Discount').value < 0) {
        console.log(this.purchaseForm.get('Quantity').value);
        this._toster.warning('No negative Discount', 'Warning');
      }
    } catch (e) {
      this._toster.error(e, 'Error');
      this.spinner.hide();
    }
  }

  delete_line(element: any) {

    this.dataSource.data.splice(this.dataSource.data.indexOf(element), 1);
    this.dataSource = new MatTableDataSource<PurchaseOrderItemList>(this.dataSource.data);
  }

  sum_footer(items: Array<PurchaseOrderItemList>, attr: string): number {
    let sum_total: number = 0
    for (let i = 0; i < items.length; i++) {
      sum_total += items[i][attr]
    }
    return parseFloat(sum_total.toFixed(2));
  }

  applyFilter(filterValue: string, keyName: string) {
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      if (data[keyName] != undefined && data[keyName] != null && data[keyName] != '') {
        return (data[keyName] != null && data[keyName] != undefined ? data[keyName].toString().toLowerCase() : '').includes(filter.toLowerCase());
      } else {
        return false
      }

    };
  }

  complete_po() {
    try {
      this.spinner.show();
      const json = {
        VendorNo: this.VendorInfoWithPO[0].vendor_no,
        PurchaseOrderNo: this.VendorInfoWithPO[0].purchase_order_no,
        ExpiryDate: this.datePipe.transform(this.complete.get('ExpiryDate').value.toLocaleString(), 'MM-dd-yyyy'),
        ExpiryDateReceipt: this.datePipe.transform(this.complete.get('ExpiryDateReceipt').value.toLocaleString(), 'MM-dd-yyyy'),
        PaymentTerms: this.complete.get('PaymentTerms').value,
        LocationId: this.sessionManageMent.getLocationId,
        CreatedBy: this.sessionManageMent.getEmail,
        lines: this.dataSource.data
      }

      this.webApiHttp.Post(this.webApiHttp.ApiURLArray.PurchaseOrderCreation, json).then(
        result => {
          if (result[0].condition == 'True') {
            this._toster.success(result[0].message, 'Success');
            this.spinner.hide();
            this.router.navigateByUrl('/ordermanagement/purchaseorderlist');

          } else {
            this._toster.error(result[0].message, 'Error');

          }
          this.spinner.hide();
        }
      ).catch(error => {
        this._toster.error(error, 'Error');
        this.spinner.hide();
      })
    } catch (e) {
      this._toster.error(e, 'Error');
      this.spinner.hide();
    }
  }
}
