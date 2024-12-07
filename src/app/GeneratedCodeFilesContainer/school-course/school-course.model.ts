

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

  export interface ISchoolCourse {

id: string 
Code: string
Name: string
Specialty: string
Level: string
Size: string
Active: boolean
Description: string


  } // end of interface

  export class SchoolCourse implements ISchoolCourse {

id: string = ''
Code: string = null
Name: string = null
Specialty: string = null
Level: string = null
Size: string = null
Active: boolean = false
Description: string = null


    constructor() {

    }

    fromValueObject(obj: any) {
      if(!obj) return

this.id = obj.id 
this.Code = obj.Code
this.Name = obj.Name
this.Specialty = obj.Specialty
this.Level = obj.Level
this.Size = obj.Size
this.Active = obj.Active
this.Description = obj.Description


    } // end of function

    toValueObject(): any {
      let obj:any = {}

obj.id = this.id 
obj.Code = this.Code
obj.Name = this.Name
obj.Specialty = this.Specialty
obj.Level = this.Level
obj.Size = this.Size
obj.Active = this.Active
obj.Description = this.Description


      return obj

    } // end of function

    static createFrom(obj: any) {
      let inst = new SchoolCourse()
      inst.fromValueObject(obj)
      return inst
    }

    static topComponentType: Enum_EditorComponent_Type

  }  // end of class

//#endregion

//#region More

//#endregion
  