export class Itemviewmodel {
    condition: string;
    item_no: string;
    purchase_unit_of_measure: string;
    sale_unit_of_measure: string;
    base_unit_of_measure: string;
    unit_price: string;
    cost_per_unit: string;
    mrp: string;
    description: string;
    main_category: string;
    sub_category: string;
    gst_group: string;
    hsn_code: string;
    tracking: string;
    Bininfo: Array<Binitem>;
    good_inventory: number;
    bad_inventory: number;
    quantity_to_take: number;
    reservation_quantity: number;
}

export class Binitem {
    condition: string;
    message: string;
    item_no: string;
    bincode: string;
    quantity: string;
    vendor_lot_no: string;
    expiry_date: string;
    quantity_to_take: string;
    reservation_quantity: string;
}