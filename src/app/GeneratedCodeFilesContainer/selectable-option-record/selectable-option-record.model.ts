

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

  export interface ISelectableOptionRecord {

id: string 
value: number
code: string
name: string
description: string
firstName: string
lastName: string


  } // end of interface

  export class SelectableOptionRecord implements ISelectableOptionRecord {

id: string = ''
value: number = null
code: string = null
name: string = null
description: string = null
firstName: string = null
lastName: string = null


    constructor() {

    }

    fromValueObject(obj: any) {
      if(!obj) return

this.id = obj.id 
this.value = obj.value
this.code = obj.code
this.name = obj.name
this.description = obj.description
this.firstName = obj.firstName
this.lastName = obj.lastName


    } // end of function

    toValueObject(): any {
      let obj:any = {}

obj.id = this.id 
obj.value = this.value
obj.code = this.code
obj.name = this.name
obj.description = this.description
obj.firstName = this.firstName
obj.lastName = this.lastName


      return obj

    } // end of function

    static createFrom(obj: any) {
      let inst = new SelectableOptionRecord()
      inst.fromValueObject(obj)
      return inst
    }

    static topComponentType: Enum_EditorComponent_Type

  }  // end of class

//#endregion

//#region More

//#endregion
  