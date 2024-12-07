

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

  export interface ISchoolRoom {

id: string 
Code: number
Name: string
Active: boolean
Capacity: string
AddressLine1: string
AddressLine2: string
Suburb: string


  } // end of interface

  export class SchoolRoom implements ISchoolRoom {

id: string = ''
Code: number = null
Name: string = null
Active: boolean = false
Capacity: string = null
AddressLine1: string = null
AddressLine2: string = null
Suburb: string = null


    constructor() {

    }

    fromValueObject(obj: any) {
      if(!obj) return

this.id = obj.id 
this.Code = obj.Code
this.Name = obj.Name
this.Active = obj.Active
this.Capacity = obj.Capacity
this.AddressLine1 = obj.AddressLine1
this.AddressLine2 = obj.AddressLine2
this.Suburb = obj.Suburb


    } // end of function

    toValueObject(): any {
      let obj:any = {}

obj.id = this.id 
obj.Code = this.Code
obj.Name = this.Name
obj.Active = this.Active
obj.Capacity = this.Capacity
obj.AddressLine1 = this.AddressLine1
obj.AddressLine2 = this.AddressLine2
obj.Suburb = this.Suburb


      return obj

    } // end of function

    static createFrom(obj: any) {
      let inst = new SchoolRoom()
      inst.fromValueObject(obj)
      return inst
    }

    static topComponentType: Enum_EditorComponent_Type

  }  // end of class

//#endregion

//#region More

//#endregion
  