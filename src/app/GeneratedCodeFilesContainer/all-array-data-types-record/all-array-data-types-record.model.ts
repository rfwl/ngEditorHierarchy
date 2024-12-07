

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

  export interface IAllArrayDataTypesRecord {

id: string 
AStrings: string[]
ANumbers: number[]
ABooleans: boolean[]
AEmails: string[]
AUrls: string[]
AColors: string[]
ADates: string[]
ATimes: string[]
ADatetimes: string[]
AArray: any
AArrays: any


  } // end of interface

  export class AllArrayDataTypesRecord implements IAllArrayDataTypesRecord {

id: string = ''
AStrings: string[] = []
ANumbers: number[] = []
ABooleans: boolean[] = []
AEmails: string[] = []
AUrls: string[] = []
AColors: string[] = []
ADates: string[] = []
ATimes: string[] = []
ADatetimes: string[] = []
AArray: any = null
AArrays: any = null


    constructor() {

    }

    fromValueObject(obj: any) {
      if(!obj) return

this.id = obj.id 
this.AStrings = obj.AStrings
this.ANumbers = obj.ANumbers
this.ABooleans = obj.ABooleans
this.AEmails = obj.AEmails
this.AUrls = obj.AUrls
this.AColors = obj.AColors
this.ADates = obj.ADates
this.ATimes = obj.ATimes
this.ADatetimes = obj.ADatetimes
this.AArray = obj.AArray
this.AArrays = obj.AArrays


    } // end of function

    toValueObject(): any {
      let obj:any = {}

obj.id = this.id 
obj.AStrings = this.AStrings
obj.ANumbers = this.ANumbers
obj.ABooleans = this.ABooleans
obj.AEmails = this.AEmails
obj.AUrls = this.AUrls
obj.AColors = this.AColors
obj.ADates = this.ADates
obj.ATimes = this.ATimes
obj.ADatetimes = this.ADatetimes
obj.AArray = this.AArray
obj.AArrays = this.AArrays


      return obj

    } // end of function

    static createFrom(obj: any) {
      let inst = new AllArrayDataTypesRecord()
      inst.fromValueObject(obj)
      return inst
    }

    static topComponentType: Enum_EditorComponent_Type

  }  // end of class

//#endregion

//#region More

//#endregion
  