

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

  export interface IDeliveryContractor {

id: string 
Code: string
Name: string
Mobile: string
Phone: string
Address: any
Comment: string


  } // end of interface

  export class DeliveryContractor implements IDeliveryContractor {

id: string = ''
Code: string = null
Name: string = null
Mobile: string = null
Phone: string = null
Address: any = null
Comment: string = null


    constructor() {

    }

    fromValueObject(obj: any) {
      if(!obj) return

this.id = obj.id 
this.Code = obj.Code
this.Name = obj.Name
this.Mobile = obj.Mobile
this.Phone = obj.Phone
this.Address = obj.Address
this.Comment = obj.Comment


    } // end of function

    toValueObject(): any {
      let obj:any = {}

obj.id = this.id 
obj.Code = this.Code
obj.Name = this.Name
obj.Mobile = this.Mobile
obj.Phone = this.Phone
obj.Address = this.Address
obj.Comment = this.Comment


      return obj

    } // end of function

    static createFrom(obj: any) {
      let inst = new DeliveryContractor()
      inst.fromValueObject(obj)
      return inst
    }

    static topComponentType: Enum_EditorComponent_Type

  }  // end of class

//#endregion

//#region More

//#endregion
  