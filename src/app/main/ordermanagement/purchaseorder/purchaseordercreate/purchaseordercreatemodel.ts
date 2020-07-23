export class VendorList {
    condition: string;
    message: string;
    vendor_no: string;
    vendor_name: string;
}

export class PurchaseOrderInfo {
    condition: string;
    message: string;
    vendor_no: string;
    vendor_name: string;
    vendor_address: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
    mobile_no: string;
    rejection_reason: string;
    purchase_order_no: string;
}

export class ItemList {
    condition: string;
    message: string;
    item_no: string;
    name: string;
}

export class PurchaseOrderItemList {
    condition: string;
    message: string;
    item_no: string;
    item_descrition: string;
    quantity: number;
    cost_per_unit: number;
    gst_percentage: number;
    amount: number;
    discount: number;
    total_amount: number;
    gst_amount: number;
    grand_total: number;
    is_expire_date: number;
    is_vendor_lotno: number;
}
