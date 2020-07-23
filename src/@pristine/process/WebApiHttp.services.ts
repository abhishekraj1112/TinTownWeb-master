import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import * as data from '../../assets/static.json';

@Injectable({
  providedIn: 'root'
})

export class WebApiHttp {

  public globalurl: string = data.url;

  public ApiURLArray: any = {


    //todo User URL Start

    login: '/api/User/Login',
    Logout: '/api/User/Logout',
    createUser: '/api/User/CreateUser',
    roleProcess: '/api/Role/RoleProcess',
    signalRNotification: '/Notification',
    locationlist: '/api/User/LocationList',
    //todo User URL End

    //todo GateEntry URL Start

    AllGateEntryList: '/api/GateEntry/AllGateEntryList?location=',
    GateEntryInfoByid: '/api/GateEntry/GateEntryInfoByid?gateentry_no=',
    CreateGateEntry: '/api/GateEntry/CreateGateEntry',

    //todo GateEntry URL End

    //todo GRN URL Stat

    GRNactivedocumentno: '/api/GRN/GrnActiveDocumentNo',
    DocumentInfoForGRN: '/api/GRN/DocumentInfoForGRN',
    CreateGRNHeader: '/api/GRN/CreateGRNHeader',
    GRNQuantityInWithoutScan: '/api/GRN/GRNQuantityInWithoutScan',
    GRNQuantityInWithScan: '/api/GRN/GRNQuantityInWithScan',
    GateEntryInfoByDocumentNo: '/api/GRN/GateEntryByDocumentNo',
    GRNInfo: '/api/GRN/GRNInfo',
    BarcodeInByPOLineInfo: '/api/GRN/BarcodeInByPOLineInfo',
    DeleteBarcode: '/api/GRN/DeleteScannedBarcode',
    CompleteGRN: '/api/GRN/CompleteGRN',

    //todo GRN URL end


    //todo Vendor URL start

    GetVendorDetail: '/api/Vendor/GetVendorDetail?no_or_name=',
    GetAllVendorList: '/api/Vendor/AllVendorList',
    CreateVendor: '/api/Vendor/CreateVendor',
    VendorCatalogueList: '/api/Vendor/VendorCatalogueList',
    VendorCatalogueCreateUpdate: '/api/Vendor/CreateUpdateVendorCatalogue',
    VendorCatalogueDelete: '/api/Vendor/DeleteVendorCatalogue',

    //todo Vendor URL end

    //todo Purchase URL start

    ActivePurchaseOrderByVendor: '/api/Purchase/ActivePurchaseOrderByVendor?vendor_no=',
    PurchaseOrderlist: '/api/Purchase/PurchaseOrderlist?location_id=',
    GetVendorCompleteDetailWithPoNo: '/api/Purchase/GetVendorCompleteDetailWithPoNo?vendor_no=',
    GetVendorItem: '/api/Purchase/GetVendorItem',
    PurchaseOrderCreation: '/api/Purchase/PurchaseOrderCreation',
    POForApporoval: '/api/Purchase/POForApporoval?locationid=',
    POApporoved: '/api/Purchase/POApporoved',
    POInfo: '/api/Purchase/POInfo',
    POGRNInfo: '/api/Purchase/POGRNInfo',
    POInfoforUpdate: '/api/Purchase/POInfoForUpdate',
    //todo Purchase URL end

    //todo Item URL start

    FindItem: '/api/Item/FindItem?name_or_no=',
    ItemList: '/api/Item/ItemList?location_id=',
    ItemCategoryList: '/api/Item/ItemCategoryList',
    ItemCategoryCreate: '/api/Item/ItemCategoryCreate',
    ItemSubCategoryList: '/api/Item/ItemSubCategoryList?id=',
    ItemCategoryDelete: '/api/Item/ItemCategoryDelete',
    ItemAttributeTypelIst: '/api/Item/ItemAttributeTypeList',
    ItemAttributeTypeCreate: '/api/Item/ItemAttributeTypeCreate',
    ItemAttributeValueList: '/api/Item/ItemAttributeValueList?attribute_type_no=',
    ItemAttributeValueCreate: '/api/Item/ItemAttributeValueCreate',
    ItemAttributeDelete: '/api/Item/ItemAttributeDelete',
    GetGstGroupId: '/api/Item/GstGroupIdValue',
    GetGstHsnCode: '/api/Item/GstHsnCode?GstGroupId=',
    GetBaseUomValue: '/api/Item/BaseUomValue',
    ItemCreate: '/api/Item/ItemCreate',
    ItemFullInfo: '/api/Item/ItemFullInfo',


    //todo Item URL end


    //todo Bin URL start

    BinList: '/api/Bins/BinList?locationid=',
    BinInfo: '/api/Bins/BinInfo',
    AddBin: '/api/Bins/AddBin',
    DeleteBin: '/api/Bins/DeleteBin',
    BarcodeInBin: '/api/Bins/BarcodeInBin',

    //todo Bin URL end


    //todo IQC URL start

    GRNListForIQC: '/api/IQC/GRNListForIQC?locationid=',
    IQCData: '/api/IQC/IQCData',
    GRNScannedBarcodeInfo: '/api/IQC/GRNScannedBarcodeInfo',
    IQCScanBincode: '/api/IQC/IQCBinScan',
    IQCScanBarcode: '/api/IQC/IQCScanBarcode',
    IQCDeleteLine: '/api/IQC/IQCDeleteLine',
    IQCComplete: '/api/IQC/IQCComplete',


    //todo IQC URL end


    //todo Putway URL start

    PutwayList: '/api/Putway/PutwayList?locationid=',
    PutwayGRNList: '/api/Putway/PutwayGRNList',
    PutwayHeaderCreate: '/api/Putway/PutwayHeaderCreate',
    PutwayData: '/api/Putway/PutwayData',
    PutwayLineinfo: '/api/Putway/PutwayLineinfo',
    PutwayBarcodeinfo: '/api/Putway/PutwayBarcodeinfo',
    PutwayScanBarcode: '/api/Putway/PutwayScanBarcode',
    PutwayWithoutScanBarcode: '/api/Putway/PutwayWithoutScanBarcode',
    PutwayDeleteLine: "/api/Putway/PutwayDeleteLine",
    PutwayComplete: "/api/Putway/PutwayComplete",

    //todo Putway URL end

    //todo Customer URL start

    CreateCustomer: '/api/Customer/CreateCustomer',
    FindCustomer: '/api/Customer/FindCustomer?name=',
    CustomerInfo: '/api/Customer/CustomerInfo?customerid=',
    CustomerList:'/api/Customer/CustomerList',

    //todo Customer URL end

    //todo Rejection URL start

    RejectionWork: '/api/Rejection/RejectionWork',

    //todo Rejection URL end

    //todo Sale Order URL start

    SaleOrderlist: '/api/Sale/SaleOrderlist',
    GetSaleNo: '/api/Sale/GetSaleNo',
    AddItem: '/api/Sale/AddItem',
    SaleOrderCreation: '/api/Sale/SaleOrderCreation',
    SOForApporoval: '/api/Sale/SOForApporoval?locationid=',
    SOApporoved: '/api/Sale/SOApporoved',
    SaleInfo: '/api/Sale/SaleInfo',
    SaleInvoiceList: '/api/Sale/SaleInvoiceList',
    SaleInvoiceInfo: '/api/Sale/SaleInvoiceInfo',

    //todo Sale Order URL end

    //todo Pick Creation URL start

    FindOrder: '/api/PickCreate/FindOrder',
    PickCreation: '/api/PickCreate/PickCreation',

    //todo Pick Creation URL end


    //todo dashboard
    DashboardData: '/api/OutBoundDashboard/dashboard_Data?order_type=',
    WaveWiseZoneActivity: '/api/OutBoundDashboard/WaveWiseZoneActivity?emailid=',

    //todo shift Api
    allShift: '/api/Shift/AllShift?location_id=',
    allUser: '/api/User/AllUser?name=',
    createShift: '/api/Shift/CreateShift',
    deleteShift: '/api/Shift/DeleteShift',
    updateShift: '/api/Shift/UpdateShift',
    current_shift: '/api/Shift/CurrentShift',
    ManagerDataRoster: '/api/Roster/ManagerData?location_id=',
    //todo end

    //todo roaster Api
    createRoster: '/api/Roster/CreateRoster',
    allRoster: '/api/Roster/AllRoster?Email=',
    //todo end roaster

    //todo pick admin
    pickZone: '/api/Pick/PickZone',
    PickPriority: '/api/Pick/PickPriority?worktype=',
    PriorityListMaster: '/api/Pick/PriorityList',
    ChangePickPriority: '/api/Pick/ChangePickPriority',
    //

    // todo outbound pick

    pickinfo: '/api/Pick/PickerInfo?email=',
    picktrayscan: "/api/Pick/PickStart",
    pickbinbarcodescan: "/api/Pick/ScanBinBarcode",
    picknotfound: "/api/Pick/ProductNotFound",
    pickclosetray: "/api/Pick/CloseTray",
    PickerList: "/api/PickManual/PickerListByPick",
    PickListManual: '/api/PickManual/PickList',
    PickManualInfo: '/api/PickManual/PickManualInfo',
    PickStartManual: '/api/PickManual/PickStart',
    PickScanManual: '/api/PickManual/Scanning',
    PickNFManual: '/api/PickManual/NotFound',
    PickHold: '/api/PickManual/Hold',
    PickComplete: '/api/PickManual/Complete',

    //

    //todo Report Section

    PickInfoReport: '/api/Report/PickInfo?pickno=',
    BinZoneSearchReport: '/api/Report/BinZoneSearch?filter=',
    PickDistribution: '/api/Report/PickDistribution',
    OutboundQualityCheck_reprintReport: '/api/OutboundQualityCheck/Report?order_no=',
    slot_Report: '/api/Report/SlotInfo',
    Slotinfo_report: '/api/Report/SlotSingleReport',
    OqcRangeDetail: '/api/Report/OQCRangeReport',
    ConsolidationRangeDetail: '/api/Report/ConsolidationRangeReport',
    MarketPlace_invoice: '/api/MarketPlace/MarketPlace_invoice?order_no=',
    MarketPlace_invoice_sync: '/api/MarketPlace/MarketPlace_invoice_sync?order_no=',

    //todo tray master

    AllTray: '/api/Tray/AllTray?location_id=',
    DeleteTray: '/api/Tray/DeleteTray',
    NewTray: '/api/Tray/NewTray',

    //todo force assignment

    PickInfoForForceAssigment: '/api/Pick/PickInfoForForceAssigment',
    ForceAssigment_submit: '/api/Pick/ForceAssigment',

    //todo Manifest posting

    SelectShippingOrder: '/api/ManifestPost/shipment_partner',
    CreateManifest: '/api/ManifestPost/manifest_create',
    excel_ReportManifestPost: '/api/ManifestPost/excel_ReportManifestPost?location_id=',
    MarkedCreated: '/api/ManifestPost/manifest_mark_Created',
    MarkedRelease: '/api/ManifestPost/manifest_mark_release',

    //todo Manifest Handover

    GetPendingShippingManifestNo: '/api/ManifestHandover/get_handover_ship_agent_code?ship_agent_code=',
    getManifestHandoverLine: '/api/ManifestHandover/get_lines_with_ship_agent_code',
    CreateManifestHandover: '/api/ManifestHandover/handover_create',
    Handover_reprint: '/api/ManifestHandover/reprint_handover?handoverno=',

    //todo Setup

    RoleMasterProcess: '/api/Role/RoleProcess',
    SaleInfoReport: '/api/Report/SaleOrder?source_no=',
    PickSetupAll: '/api/Pick/PickSetupAll',
    RolePermissionDetail: '/api/Role/RolePermissionDetail/',
    RolePermissionUpdate: '/api/Role/RolePermissionUpdate',

    //todo UserSetup

    GetAllUser: '/api/User/allUser',
    CreateUser: '/api/User/createUser',
    GetAllWorktype: '/api/User/Worktype',
    UpdateUserPassword: '/api/User/UpdatePassword',
    AddPrinterIPaddress: '/api/User/AddIPandPort',

    //todo cage master

    CageList: '/api/Cage/CageList?location_id=',
    cage_ZoneList: '/api/Consolidation/ZoneList?location_id=',
    AddCage: '/api/Cage/AddCage',
    getConfigStyleImages: "/api/BarcodeGenrate/SeachByStyle?stylecode=",
    SeachByStyleAndColor: "/api/BarcodeGenrate/SeachByStyleAndColor?stylecode=",
    PrintBarcodeReport: "/api/BarcodeGenrate/PrintBarcodeReport",


    //todo tray sorting

    ScanTray: '/api/Sorting/ScanTray',
    ScanCage: '/api/Sorting/ScanCage',

    //todo DSP

    DSPPartnerList: '/api/DSP/DSPPartnerList?location=',
    CreateUpdateDSP: '/api/DSP/CreateUpdateDSP',
    DSPServiceList: '/api/DSP/DSPServiceList?location=',
    CreateUpdateDSPService: '/api/DSP/CreateUpdateDSPService',
    DspAwb: '/api/DSP/DspAwb',
    UploadAWB: '/api/DSP/UploadAWB',

    //todo manifest sorting

    ScanAwbNoManifestCreate: '/api/ManifestSorting/ScanAwbNoManifestCreate',

    //todo reshipment
    AwbList: '/api/Reshipment/AwbList?location=',
    NewDspandAwb: '/api/Reshipment/NewDspandAwb',

    //todo return manifest
    ReturnManifestList: '/api/ReturnManifest/ReturnManifestList?locationid=',
    CreateReturn: '/api/ReturnManifest/CreateReturn',
    ReturnManifestInfo: '/api/ReturnManifest/ReturnManifestInfo?return_manifest_no=',
    AWBScan: '/api/ReturnManifest/AWBScan',
    Complete: '/api/ReturnManifest/Complete',

    //todo customer return
    CRList: '/api/CustomerReturn/CRList?location_id=',
    CreateCR: '/api/CustomerReturn/CreateCR',

    //todo transfer order
    InboundList: '/api/TransferOrder/InboundList',
    AddNewItem: '/api/TransferOrder/AddItem',
    NewTransferNo: '/api/TransferOrder/NewTransferNo',
    CompleteTransfer: '/api/TransferOrder/Complete',
    TransferOrderInfo:'/api/TransferOrder/TransferOrderInfo',

    //todo Return GatePass
    RGPList: '/api/ReturnGatePass/RGPList',
    PartyList: '/api/ReturnGatePass/PartyList',
    NewRGPNo: '/api/ReturnGatePass/NewRGPNo',
    AddItemRGP: '/api/ReturnGatePass/AddItem',
    CompleteRGP: '/api/ReturnGatePass/Complete',

    //todo purchasr return order
    PROList: '/api/PurchaseReturnOrder/PROList',
    AddNewPROItem: '/api/PurchaseReturnOrder/AddItem',
    NewPRONo: '/api/PurchaseReturnOrder/NewPRONo',
    CompletePRO: '/api/PurchaseReturnOrder/Complete',
    PROInfo:'/api/PurchaseReturnOrder/PurchaseReturnOrderInfo'

  };

  constructor(private httpClient: HttpClient
  ) {

  }

  get getHTTPHeader(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getHTTPHeaderAuth(token: string): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
  }

  // post data to server
  async Post(path: string, jsondata: any): Promise<any> {
    try {
      path = this.globalurl + path;
      var headers = this.getHTTPHeader;
      return await new Promise<any>((resolve, reject) => {
        this.httpClient.post<any>(path, JSON.stringify(jsondata), headers).toPromise()
          .then(result => resolve(result), error => reject({
            condition: 'False',
            message: error.message
          })).catch(err => reject({condition: 'False', message: err.message}));
      });

    } catch (e) {
      return new Promise<any>((resolve) => {
        resolve({condition: 'False', message: e.message})
      });
    }
  }

  // get data to the server
  async Get(path: string): Promise<any> {
    try {
      path = this.globalurl + path;
      var headers = this.getHTTPHeader;
      return await new Promise<any>((resolve, reject) => {
        this.httpClient.get<any>(path, headers).toPromise()
          .then(result => resolve(result), error => reject({
            condition: 'False',
            message: error.message
          })).catch(err => reject({condition: 'False', message: err.message}));
      });
    } catch (e) {
      return new Promise<any>((resolve) => {
        resolve({condition: 'False', message: e.message})
      });
    }
  }

  //todo For formdata
  async PostFormData(path: string, formdata: any): Promise<any> {
    try {
      path = this.globalurl + path;
      var header = this.getHTTPHeader;
      return await new Promise<any>((resolve, reject) => {
        this.httpClient.post<any>(path, formdata).toPromise()
          .then(result => resolve(result), error => reject({
            condition: 'false',
            message: error.message
          })).catch(error => reject({
          condition: 'false',
          message: error.message
        }))
      })

    } catch (e) {
      return new Promise<any>((resolve) => {
        resolve({condition: 'false', message: e.message})
      })
    }
  }

  // post data to server and get two type of response
  Post_Data_GetFile(path: string, jsondata: any) {
    path = this.globalurl + path;
    const request = new HttpRequest('POST', path, jsondata, {
      responseType: 'blob',
      reportProgress: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
    return this.httpClient.request(request);
  }

  Get_Data_With_DownloadStatus_GetFile(path: string) {
    path = this.globalurl + path;
    const request = new HttpRequest('GET', path, {
      responseType: 'blob',
      reportProgress: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
    return this.httpClient.request(request);
  }

  blobToString(b) {
    var urldata, x;
    urldata = URL.createObjectURL(b);
    x = new XMLHttpRequest();
    x.open('GET', urldata, false); // although sync, you're not fetching over internet
    x.send();
    URL.revokeObjectURL(urldata);
    return x.responseText;
  }
}
