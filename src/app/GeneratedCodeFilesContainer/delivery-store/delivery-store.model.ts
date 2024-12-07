

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

  export interface IDeliveryStore {

id: string 
Name: string
Phone: string
Managers: string[]
Address: any
Comment: string


  } // end of interface

  export class DeliveryStore implements IDeliveryStore {

id: string = ''
Name: string = null
Phone: string = null
Managers: string[] = []
Address: any = null
Comment: string = null


    constructor() {

    }

    fromValueObject(obj: any) {
      if(!obj) return

this.id = obj.id 
this.Name = obj.Name
this.Phone = obj.Phone
this.Managers = obj.Managers
this.Address = obj.Address
this.Comment = obj.Comment


    } // end of function

    toValueObject(): any {
      let obj:any = {}

obj.id = this.id 
obj.Name = this.Name
obj.Phone = this.Phone
obj.Managers = this.Managers
obj.Address = this.Address
obj.Comment = this.Comment


      return obj

    } // end of function

    static createFrom(obj: any) {
      let inst = new DeliveryStore()
      inst.fromValueObject(obj)
      return inst
    }

    static topComponentType: Enum_EditorComponent_Type

  }  // end of class

//#endregion

//#region More

//#endregion
  