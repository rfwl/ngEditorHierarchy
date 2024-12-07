

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

  export interface ISchoolClass {

id: string 
Code: number
Name: string
Active: boolean
Course: string
Room: string
Students: string[]
Teacher: string
StartDateTime: string
Hours: string
Weeks: number


  } // end of interface

  export class SchoolClass implements ISchoolClass {

id: string = ''
Code: number = null
Name: string = null
Active: boolean = false
Course: string = null
Room: string = null
Students: string[] = []
Teacher: string = null
StartDateTime: string = null
Hours: string = null
Weeks: number = null


    constructor() {

    }

    fromValueObject(obj: any) {
      if(!obj) return

this.id = obj.id 
this.Code = obj.Code
this.Name = obj.Name
this.Active = obj.Active
this.Course = obj.Course
this.Room = obj.Room
this.Students = obj.Students
this.Teacher = obj.Teacher
this.StartDateTime = obj.StartDateTime
this.Hours = obj.Hours
this.Weeks = obj.Weeks


    } // end of function

    toValueObject(): any {
      let obj:any = {}

obj.id = this.id 
obj.Code = this.Code
obj.Name = this.Name
obj.Active = this.Active
obj.Course = this.Course
obj.Room = this.Room
obj.Students = this.Students
obj.Teacher = this.Teacher
obj.StartDateTime = this.StartDateTime
obj.Hours = this.Hours
obj.Weeks = this.Weeks


      return obj

    } // end of function

    static createFrom(obj: any) {
      let inst = new SchoolClass()
      inst.fromValueObject(obj)
      return inst
    }

    static topComponentType: Enum_EditorComponent_Type

  }  // end of class

//#endregion

//#region More

//#endregion
  