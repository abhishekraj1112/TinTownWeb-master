export class TransferOrderInfoModel {
  transferOrder:Array<{
    condition: string
    created_by: string
    created_date: string
    document_no: string
    document_type: string
    freight_type: string
    grand_total: number
    gst_amount: number
    gst_applicable: number
    is_pick_created: number
    item_no: string
    order_status: string
    ordered_quantity: number
    pick_ready_quantity: number
    reservation_status: string
    reserved_qty: number
    total:number
  }>
  toLocation:location;
  fromLocation:location;
}

export class location {
  address: string
  contact_no: string
  country: string
  email: string
  gst_no: string
  gst_type: string
  location_type: string
  name: string
  state: string
}


