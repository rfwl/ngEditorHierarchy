

  import { Component, OnInit, inject } from '@angular/core'
  import { FormBuilder, FormGroup, Validators } from '@angular/forms'
  import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal'
  import { Firestore, collection, doc } from '@angular/fire/firestore'
  import { Store, select } from '@ngrx/store'
  import { EnumEditorOperationType } from '../../../editor-hierarchy-shared/editor-hierarchy-shared.component'
  import { make_undefined_to_null, copy_properties_from_object1_to_object2, show_CodeOutput_Modal, deepClone } from '../../../editor-hierarchy-shared/editor-hierarchy-shared.component'
  import { selectorOption_Arrays_Json_String } from '../../../editor-hierarchy-shared/editor-hierarchy-shared.constants'

  import { AllArrayDataTypesRecord, EnumSelectorOptionSource, Enum_EditorComponent_Type } from '../../all-array-data-types-record.model'







  @Component({
    selector: "a-array-child-editor-form", 
templateUrl: './a-array-child-editor-form.component.html', 

styleUrls: ['./a-array-child-editor-form.component.scss'] 

}) 

    export class AArrayChildEditorFormComponent implements OnInit {

    firestore: Firestore
    selectorOptionArraysJsonString: string
    selectorOptionArraysObject: any

    //#region Main

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private store: Store,
      private modalService: BsModalService
      ){
        this.firestore = inject(Firestore)
        this.selectorOptionArraysJsonString = selectorOption_Arrays_Json_String
        this.selectorOptionArraysObject = undefined
        try{
          this.selectorOptionArraysObject = JSON.parse(this.selectorOptionArraysJsonString)
        } catch(_){}
    }



    ngOnInit() {

      this.initEditorForm()



    }

    ngAfterViewInit(){

    }

    hideEditorForm(){
      this.editorForm.reset()
      this.bsModalRef.hide()
    }

    outputJsonString(){

      let str = JSON.stringify(this.editorForm.value, null, 4)
      show_CodeOutput_Modal(this.modalService, 'AArray', str, 'modal-xl')
    }

    getSelectorOptionArray(ty: string, nm: string): any[]{
      let ary: any[] = []
      if(!this.selectorOptionArraysObject) return ary
      if(ty == EnumSelectorOptionSource.ValueArray && this.selectorOptionArraysObject.valueArrays){
        return this.selectorOptionArraysObject.valueArrays[nm]
      } else if(ty == EnumSelectorOptionSource.LabelledValueArray && this.selectorOptionArraysObject.labelledValueArrays){
        return this.selectorOptionArraysObject.labelledValueArrays[nm]
      } else if(ty == EnumSelectorOptionSource.ObjectArray && this.selectorOptionArraysObject.objectArrays){
        return this.selectorOptionArraysObject.objectArrays[nm]
      }
      return ary
    }

    //#endregion

    //#region Data
    // Fields passed in by initialState from parent container
    isInModal: boolean = true
    parentEditor: any = undefined
    parentOnClosedHandler?: Function
    parentDataObject: any
    parentDataField: string = ''
    parentDataArray: any[]
    parentDataIndex: number = -1
    editorOperationType?: EnumEditorOperationType

    private editedObject: any

    private build_editedObject() {

      if(this.parentDataObject){
        if(this.parentDataField){
          this.editedObject = this.parentDataObject[this.parentDataField]
        } else {
          this.editedObject = undefined
        }
      } else if(this.parentDataArray){
        if(this.parentDataIndex >= 0){
          this.editedObject = this.parentDataArray[this.parentDataIndex]
        } else {
          this.editedObject = undefined
        }
      } else {
        throw(new Error("Cannot find data object to edit"))
      }

      if(!this.editedObject){
        this.editedObject = {}
        this.editorOperationType = EnumEditorOperationType.Create
      }

    } // end of function

    get editorFormTitle(): string{
      switch(this.editorOperationType){
        case EnumEditorOperationType.Create:
          return 'Create AArray'
        case EnumEditorOperationType.Delete:
          return 'Delete AArray'
        case EnumEditorOperationType.Update:
          return 'Update AArray'
        default:
          return 'Edit AArray'
      }
    }

    get isToDelete(): boolean{
      switch(this.editorOperationType){
        case EnumEditorOperationType.Create:
          return false
        case EnumEditorOperationType.Delete:
          return true
        case EnumEditorOperationType.Update:
          return false
        default:
          return false
      }
    }

    get submitButtonLabel(): string{
      switch(this.editorOperationType){
        case EnumEditorOperationType.Create:
          return 'Save'
        case EnumEditorOperationType.Delete:
          return 'Delete'
        case EnumEditorOperationType.Update:
          return 'Save'
        default:
          return 'Edit'
      }
    }

    //#endregion

    //#region Init Editor
    agGridThemeName: string = 'ag-theme-alpine-dark'
    editorForm!: FormGroup

    initEditorForm() {

      this.editorForm = this.fb.group({

BStrings: [''], 
BNumbers: [''], 
BBooleans: [''], 
BEmails: [''], 
BUrls: [''], 
BColors: [''], 
BDates: [''], 
BTimes: [''], 
BDatetimes: [''], 


      })

      this.build_editedObject()
      this.editorForm.patchValue(this.editedObject)

      if(this.isToDelete)
        this.editorForm.disable()

    } //end of function

get BStrings() { return this.editorForm.get('BStrings')  }
get BNumbers() { return this.editorForm.get('BNumbers')  }
get BBooleans() { return this.editorForm.get('BBooleans')  }
get BEmails() { return this.editorForm.get('BEmails')  }
get BUrls() { return this.editorForm.get('BUrls')  }
get BColors() { return this.editorForm.get('BColors')  }
get BDates() { return this.editorForm.get('BDates')  }
get BTimes() { return this.editorForm.get('BTimes')  }
get BDatetimes() { return this.editorForm.get('BDatetimes')  }


    //#endregion

    //#region Cell Child Editors

    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined // unknown component.





      return undefined
    }

    childParentDataField: string

    build_paramsShowingEditorForm(fieldCode: string){
      return {
        icon:'box-open',
        display: '',
        tooltip: '',
        parentDataField: fieldCode,
        parentComponent: this,
        parentFunction: this.showChildEditorForm,
      }
    }

    showChildEditorForm(field: string, rowIndex: number = undefined) {
      this.childParentDataField = field
      const config: any = {
        class: 'modal-md' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          isInModal: true,
          parentEditor: this,
          parentOnClosedHandler: this.onClosedChildEditorForm,
          parentDataObject: this.editedObject,
          parentDataField: field,
          parentDataArray: undefined,
          parentDataIndex: undefined,
          editorOperationType: EnumEditorOperationType.Update
        }
      }
      let cmpnt = this.chooseFieleValueEditorComponent(field)
      if(!cmpnt) return
      let modalRef = this.modalService.show(cmpnt, config)

    }

    onClosedChildEditorForm(resultObject: any){

      this.editorForm.get(this.childParentDataField).setValue(resultObject)
    }

    build_paramsShowingEditorGrid(fieldCode: string){
      return {
        icon:'box-open',
        display: '',
        tooltip: '',
        parentComponent: this,
        parentFunction: this.showChildEditorGrid,
        parentDataField: fieldCode
      }
    }

    showChildEditorGrid(field: string, rowIndex: number = undefined) {
      this.childParentDataField = field
      const config: any = {
        class: 'modal-xl' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          isInModal: true,
          parentEditor: this,
          parentOnClosedHandler: this.onClosedChildEditorGrid,
          parentDataObject: this.editedObject,
          parentDataField: field,
          parentDataArray: undefined,
          parentDataIndex: undefined,
          editorOperationType: EnumEditorOperationType.Update
        }
      }
      let cmpnt = this.chooseFieleValueEditorComponent(field)
      if(!cmpnt) return
      let modalRef = this.modalService.show(cmpnt, config)
    }

    onClosedChildEditorGrid(resultObject: any){
      this.editorForm.get(this.childParentDataField).setValue(resultObject)
    }

    //#endregion

    //#region Save, parent/child closed function

    submitEditorForm(editorForm:any){

      copy_properties_from_object1_to_object2(this.editorForm.value,this.editedObject )
      make_undefined_to_null(this.editedObject)

        switch(this.editorOperationType){
          case EnumEditorOperationType.Create:
            this.editedObject.id = doc(collection(this.firestore, '_')).id;

            if(this.parentDataArray)
              this.parentDataArray.push(this.editedObject)
            else if(this.parentDataObject && this.parentDataField)
              this.parentDataObject[this.parentDataField] = this.editedObject

            break
          case EnumEditorOperationType.Delete:
            if(this.parentDataArray && this.parentDataIndex >= 0){
              this.parentDataArray?.splice(this.parentDataIndex,1)
            }
            break
          case EnumEditorOperationType.Update:

            break
          default:
            break
        }

      if(!this.parentEditor || !this.parentOnClosedHandler) return
      this.parentOnClosedHandler.call(this.parentEditor, this.editedObject)
      this.hideEditorForm()

    }

    onClosedChildEditor(resultObject: any){
      this.editorForm.patchValue(this.editedObject)
    }

    //#endregion

  } // end of class
  