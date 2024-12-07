

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

  export interface IContactPersonList {

id: string 
Title: string
FirstName: string
MiddleName: string
LastName: string
Gender: string
DOB: string
Address: any
Contact: any
Alias: string[]
StartDate: string
Category: string
Status: string
Comment: string
Extensions: any
Correspondences: any


  } // end of interface

  export class ContactPersonList implements IContactPersonList {

id: string = ''
Title: string = null
FirstName: string = null
MiddleName: string = null
LastName: string = null
Gender: string = null
DOB: string = null
Address: any = null
Contact: any = null
Alias: string[] = []
StartDate: string = null
Category: string = null
Status: string = null
Comment: string = null
Extensions: any = null
Correspondences: any = null


    constructor() {

    }

    fromValueObject(obj: any) {
      if(!obj) return

this.id = obj.id 
this.Title = obj.Title
this.FirstName = obj.FirstName
this.MiddleName = obj.MiddleName
this.LastName = obj.LastName
this.Gender = obj.Gender
this.DOB = obj.DOB
this.Address = obj.Address
this.Contact = obj.Contact
this.Alias = obj.Alias
this.StartDate = obj.StartDate
this.Category = obj.Category
this.Status = obj.Status
this.Comment = obj.Comment
this.Extensions = obj.Extensions
this.Correspondences = obj.Correspondences


    } // end of function

    toValueObject(): any {
      let obj:any = {}

obj.id = this.id 
obj.Title = this.Title
obj.FirstName = this.FirstName
obj.MiddleName = this.MiddleName
obj.LastName = this.LastName
obj.Gender = this.Gender
obj.DOB = this.DOB
obj.Address = this.Address
obj.Contact = this.Contact
obj.Alias = this.Alias
obj.StartDate = this.StartDate
obj.Category = this.Category
obj.Status = this.Status
obj.Comment = this.Comment
obj.Extensions = this.Extensions
obj.Correspondences = this.Correspondences


      return obj

    } // end of function

    static createFrom(obj: any) {
      let inst = new ContactPersonList()
      inst.fromValueObject(obj)
      return inst
    }

    static topComponentType: Enum_EditorComponent_Type

  }  // end of class

//#endregion

//#region More

//#endregion
  