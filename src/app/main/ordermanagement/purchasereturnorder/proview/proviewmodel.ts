export class ProSalesInfoModel {
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
}

export class location {
  address: string
  condition:string
  contact_no: string
  country: string
  email: string
  gst_no: string
  gst_type: string
  name: string
  state: string
}

export class vendor {
  city: string
  condition: string
  contact_person_name: string
  country: string
  email_id: string
  gst_reg_no: string
  gst_type: string
  mobile_no: number
  phone_no: number
  pincode: number
  state: string
  vendor_address: string
  vendor_name: string
  vendor_type: string
}
