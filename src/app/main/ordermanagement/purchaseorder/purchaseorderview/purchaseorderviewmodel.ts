export class Purchaseorderviewmodel {
    condition: string;
    vendor_address: string;
    document_no: string;
    vendor_no: string;
    order_date: string;
    exp_date: string;
    expiry_date_receipt: string;
    pay_terms: string;
    document_status: string;
    created_by: string;
    item_no: string;
    quantity: string;
    mrp: string;
    amount: string;
    discount: string;
    gst_percentage: string;
    gst_amount: string;
    net_amount: string;
    total_amount: string;
    received_quantity: string;
    accepted_quantity: string;
    rejected_quantity: string;
    total_ordered_qty: string;
    total_received_qty: string;
    total_accepted_qty: string;
    total_reject_qty: string;
}

export class PurchaseorderGRN {
    gate_entry_no: string;
    grn_no: string;
    grn_status: string;
    grn_created_by: string;
    grn_created_datetime: string;
    document_type: string;
    external_document_no: string;
    external_document_date: string;
    accpeted_qty: string;
    rejected_qty: string;
    grn_completed_by: string;
    grn_completed_datetime: string;
    gib: Array<PurchaseorderGRNItems>
}

export class PurchaseorderGRNItems {
    item_no: string;
    accepted_qty: string;
    rejected_qty: string;
    putway_qty: string;
    vendor_lot_no: string;
    expire_date: string;
}