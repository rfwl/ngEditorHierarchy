

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

  export interface IDeliveryProduct {

id: string 
Category: string
Code: string
Model: string
Make: string
Price: number
Specifications: any


  } // end of interface

  export class DeliveryProduct implements IDeliveryProduct {

id: string = ''
Category: string = null
Code: string = null
Model: string = null
Make: string = null
Price: number = null
Specifications: any = null


    constructor() {

    }

    fromValueObject(obj: any) {
      if(!obj) return

this.id = obj.id 
this.Category = obj.Category
this.Code = obj.Code
this.Model = obj.Model
this.Make = obj.Make
this.Price = obj.Price
this.Specifications = obj.Specifications


    } // end of function

    toValueObject(): any {
      let obj:any = {}

obj.id = this.id 
obj.Category = this.Category
obj.Code = this.Code
obj.Model = this.Model
obj.Make = this.Make
obj.Price = this.Price
obj.Specifications = this.Specifications


      return obj

    } // end of function

    static createFrom(obj: any) {
      let inst = new DeliveryProduct()
      inst.fromValueObject(obj)
      return inst
    }

    static topComponentType: Enum_EditorComponent_Type

  }  // end of class

//#endregion

//#region More

//#endregion
  