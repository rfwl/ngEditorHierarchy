

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

  export interface IProjectDiaryRecord {

id: string 
Code: string
Name: string
Description: string
Status: string
Comment: string
Updated: string
Structure: any
Design: any
Feature: any
Bug: any
Reference: any
Document: any


  } // end of interface

  export class ProjectDiaryRecord implements IProjectDiaryRecord {

id: string = ''
Code: string = null
Name: string = null
Description: string = null
Status: string = null
Comment: string = null
Updated: string = null
Structure: any = null
Design: any = null
Feature: any = null
Bug: any = null
Reference: any = null
Document: any = null


    constructor() {

    }

    fromValueObject(obj: any) {
      if(!obj) return

this.id = obj.id 
this.Code = obj.Code
this.Name = obj.Name
this.Description = obj.Description
this.Status = obj.Status
this.Comment = obj.Comment
this.Updated = obj.Updated
this.Structure = obj.Structure
this.Design = obj.Design
this.Feature = obj.Feature
this.Bug = obj.Bug
this.Reference = obj.Reference
this.Document = obj.Document


    } // end of function

    toValueObject(): any {
      let obj:any = {}

obj.id = this.id 
obj.Code = this.Code
obj.Name = this.Name
obj.Description = this.Description
obj.Status = this.Status
obj.Comment = this.Comment
obj.Updated = this.Updated
obj.Structure = this.Structure
obj.Design = this.Design
obj.Feature = this.Feature
obj.Bug = this.Bug
obj.Reference = this.Reference
obj.Document = this.Document


      return obj

    } // end of function

    static createFrom(obj: any) {
      let inst = new ProjectDiaryRecord()
      inst.fromValueObject(obj)
      return inst
    }

    static topComponentType: Enum_EditorComponent_Type

  }  // end of class

//#endregion

//#region More

//#endregion
  