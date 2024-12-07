

  export enum Enum_EditorComponent_Type {
    EditorForm = 1,
    EditorAgGrid = 2,
    EditorPTable = 3
  }

  export enum EnumSelectorOptionSource {
    ValueArray = "ValueArray",
    LabelledValueArray = "LabelledValueArray",
    ObjectArray = "ObjectArray"
  }

  export interface IDeliveryTrackRecord {

id: string 
Product: string
Store: string
Contractor: string
Customer: any
Address: any
StartDateTime: string
Status: string
Comment: string


  } // end of interface

  export class DeliveryTrackRecord implements IDeliveryTrackRecord {

id: string = ''
Product: string = null
Store: string = null
Contractor: string = null
Customer: any = null
Address: any = null
StartDateTime: string = null
Status: string = null
Comment: string = null


    constructor() {

    }

    fromValueObject(obj: any) {
      if(!obj) return

this.id = obj.id 
this.Product = obj.Product
this.Store = obj.Store
this.Contractor = obj.Contractor
this.Customer = obj.Customer
this.Address = obj.Address
this.StartDateTime = obj.StartDateTime
this.Status = obj.Status
this.Comment = obj.Comment


    } // end of function

    toValueObject(): any {
      let obj:any = {}

obj.id = this.id 
obj.Product = this.Product
obj.Store = this.Store
obj.Contractor = this.Contractor
obj.Customer = this.Customer
obj.Address = this.Address
obj.StartDateTime = this.StartDateTime
obj.Status = this.Status
obj.Comment = this.Comment


      return obj

    } // end of function

    static createFrom(obj: any) {
      let inst = new DeliveryTrackRecord()
      inst.fromValueObject(obj)
      return inst
    }

    static topComponentType: Enum_EditorComponent_Type

  }  // end of class

//#endregion

//#region More

//#endregion
  