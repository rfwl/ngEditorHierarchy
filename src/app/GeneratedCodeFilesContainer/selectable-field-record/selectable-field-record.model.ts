

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

  export interface ISelectableFieldRecord {

id: string 
NumberValue: any
StringValue: any
NumberArray: any
StringArray: any


  } // end of interface

  export class SelectableFieldRecord implements ISelectableFieldRecord {

id: string = ''
NumberValue: any = null
StringValue: any = null
NumberArray: any = null
StringArray: any = null


    constructor() {

    }

    fromValueObject(obj: any) {
      if(!obj) return

this.id = obj.id 
this.NumberValue = obj.NumberValue
this.StringValue = obj.StringValue
this.NumberArray = obj.NumberArray
this.StringArray = obj.StringArray


    } // end of function

    toValueObject(): any {
      let obj:any = {}

obj.id = this.id 
obj.NumberValue = this.NumberValue
obj.StringValue = this.StringValue
obj.NumberArray = this.NumberArray
obj.StringArray = this.StringArray


      return obj

    } // end of function

    static createFrom(obj: any) {
      let inst = new SelectableFieldRecord()
      inst.fromValueObject(obj)
      return inst
    }

    static topComponentType: Enum_EditorComponent_Type

  }  // end of class

//#endregion

//#region More

//#endregion
  