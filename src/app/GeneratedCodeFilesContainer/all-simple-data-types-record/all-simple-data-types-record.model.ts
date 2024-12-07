

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

  export interface IAllSimpleDataTypesRecord {

id: string 
AString: string
ANumber: number
ABoolean: boolean
AEmail: string
AUrl: string
AColor: string
ADate: string
ATime: string
ADatetime: string
AObject: any
AObjects: any


  } // end of interface

  export class AllSimpleDataTypesRecord implements IAllSimpleDataTypesRecord {

id: string = ''
AString: string = null
ANumber: number = null
ABoolean: boolean = false
AEmail: string = null
AUrl: string = null
AColor: string = null
ADate: string = null
ATime: string = null
ADatetime: string = null
AObject: any = null
AObjects: any = null


    constructor() {

    }

    fromValueObject(obj: any) {
      if(!obj) return

this.id = obj.id 
this.AString = obj.AString
this.ANumber = obj.ANumber
this.ABoolean = obj.ABoolean
this.AEmail = obj.AEmail
this.AUrl = obj.AUrl
this.AColor = obj.AColor
this.ADate = obj.ADate
this.ATime = obj.ATime
this.ADatetime = obj.ADatetime
this.AObject = obj.AObject
this.AObjects = obj.AObjects


    } // end of function

    toValueObject(): any {
      let obj:any = {}

obj.id = this.id 
obj.AString = this.AString
obj.ANumber = this.ANumber
obj.ABoolean = this.ABoolean
obj.AEmail = this.AEmail
obj.AUrl = this.AUrl
obj.AColor = this.AColor
obj.ADate = this.ADate
obj.ATime = this.ATime
obj.ADatetime = this.ADatetime
obj.AObject = this.AObject
obj.AObjects = this.AObjects


      return obj

    } // end of function

    static createFrom(obj: any) {
      let inst = new AllSimpleDataTypesRecord()
      inst.fromValueObject(obj)
      return inst
    }

    static topComponentType: Enum_EditorComponent_Type

  }  // end of class

//#endregion

//#region More

//#endregion
  