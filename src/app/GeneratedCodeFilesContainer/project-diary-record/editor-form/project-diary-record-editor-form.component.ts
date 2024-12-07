

  import { Component, OnInit, inject } from '@angular/core'
  import { FormBuilder, FormGroup, Validators } from '@angular/forms'
  import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal'
  import { select, Store } from '@ngrx/store'
  import { Update } from '@ngrx/entity'
  import { Firestore, collection, doc } from '@angular/fire/firestore'

  import { EnumEditorOperationType, show_CodeOutput_Modal } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'
  import { make_undefined_to_null, copy_properties_from_object1_to_object2, deepClone } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'
  import { selectorOption_Arrays_Json_String } from '../../editor-hierarchy-shared/editor-hierarchy-shared.constants'

  import { ProjectDiaryRecord, Enum_EditorComponent_Type } from '../project-diary-record.model'
  import { EnumSelectorOptionSource } from '../project-diary-record.model'

import { CodeNameDescriptionChildEditorAgGridComponent } from "../code-name-description/editor-aggrid/code-name-description-child-editor-aggrid.component";

import { CodeNameDescriptionChildEditorPTableComponent } from "../code-name-description/editor-ptable/code-name-description-child-editor-ptable.component";

import { ProjectFeatureChildEditorAgGridComponent } from "../project-feature/editor-aggrid/project-feature-child-editor-aggrid.component";

import { ProjectFeatureChildEditorPTableComponent } from "../project-feature/editor-ptable/project-feature-child-editor-ptable.component";

import { ProjectBugChildEditorAgGridComponent } from "../project-bug/editor-aggrid/project-bug-child-editor-aggrid.component";

import { ProjectBugChildEditorPTableComponent } from "../project-bug/editor-ptable/project-bug-child-editor-ptable.component";

import { ProjectReferenceChildEditorAgGridComponent } from "../project-reference/editor-aggrid/project-reference-child-editor-aggrid.component";

import { ProjectReferenceChildEditorPTableComponent } from "../project-reference/editor-ptable/project-reference-child-editor-ptable.component";





  @Component({
    selector: "project-diary-record-editor-form", 
templateUrl: './project-diary-record-editor-form.component.html', 

styleUrls: ['./project-diary-record-editor-form.component.scss'] 

}) 


  export class ProjectDiaryRecordEditorFormComponent implements OnInit {
    firestore: Firestore
    labelValue_Array: any
    selectorOptionArraysJsonString: string
    selectorOptionArraysObject: any

    //#region Main

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private modalService: BsModalService,
      private store: Store
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
      show_CodeOutput_Modal(this.modalService, 'ProjectDiaryRecord', str, 'modal-xl')
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
          throw (() => new Error("Cannot find data object to edit"))
        }
      } else if(this.parentDataArray){
        if(this.parentDataIndex >= 0){
          this.editedObject = this.parentDataArray[this.parentDataIndex]
        } else {
          this.editedObject = undefined // Empty parent data array, will create a member
        }
      } else {
        throw(new Error("Cannot find data object to edit"))
      }

      if(!this.editedObject) {
        this.editedObject = {}
        this.editorOperationType = EnumEditorOperationType.Create
      }
    }

    get editorFormTitle(): string{
      switch(this.editorOperationType){
        case EnumEditorOperationType.Create:
          return 'Create ProjectDiaryRecord'
        case EnumEditorOperationType.Delete:
          return 'Delete ProjectDiaryRecord'
        case EnumEditorOperationType.Update:
          return 'Update ProjectDiaryRecord'
        default:
          return 'Edit ProjectDiaryRecord'
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

Code: [''], 
Name: [''], 
Description: [''], 
Status: [''], 
Comment: [''], 
Updated: [''], 
Structure: [''], 
Design: [''], 
Feature: [''], 
Bug: [''], 
Reference: [''], 
Document: [''], 


      })

      this.build_editedObject()
      this.editorForm.patchValue(this.editedObject)

      if(this.isToDelete)
        this.editorForm.disable()

    } //end of function

get Code() { return this.editorForm.get('Code')  }
get Name() { return this.editorForm.get('Name')  }
get Description() { return this.editorForm.get('Description')  }
get Status() { return this.editorForm.get('Status')  }
get Comment() { return this.editorForm.get('Comment')  }
get Updated() { return this.editorForm.get('Updated')  }
get Structure() { return this.editorForm.get('Structure')  }
get Design() { return this.editorForm.get('Design')  }
get Feature() { return this.editorForm.get('Feature')  }
get Bug() { return this.editorForm.get('Bug')  }
get Reference() { return this.editorForm.get('Reference')  }
get Document() { return this.editorForm.get('Document')  }


    //#endregion



    //#region Cell Child Editors


    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined // unknown component.


else if( fld == "Structure" ){
if(ProjectDiaryRecord.topComponentType == Enum_EditorComponent_Type.EditorAgGrid){
return CodeNameDescriptionChildEditorAgGridComponent
} else if(ProjectDiaryRecord.topComponentType == Enum_EditorComponent_Type.EditorPTable){
return CodeNameDescriptionChildEditorPTableComponent
}
}
else if( fld == "Design" ){
if(ProjectDiaryRecord.topComponentType == Enum_EditorComponent_Type.EditorAgGrid){
return CodeNameDescriptionChildEditorAgGridComponent
} else if(ProjectDiaryRecord.topComponentType == Enum_EditorComponent_Type.EditorPTable){
return CodeNameDescriptionChildEditorPTableComponent
}
}
else if( fld == "Feature" ){
if(ProjectDiaryRecord.topComponentType == Enum_EditorComponent_Type.EditorAgGrid){
return ProjectFeatureChildEditorAgGridComponent
} else if(ProjectDiaryRecord.topComponentType == Enum_EditorComponent_Type.EditorPTable){
return ProjectFeatureChildEditorPTableComponent
}
}
else if( fld == "Bug" ){
if(ProjectDiaryRecord.topComponentType == Enum_EditorComponent_Type.EditorAgGrid){
return ProjectBugChildEditorAgGridComponent
} else if(ProjectDiaryRecord.topComponentType == Enum_EditorComponent_Type.EditorPTable){
return ProjectBugChildEditorPTableComponent
}
}
else if( fld == "Reference" ){
if(ProjectDiaryRecord.topComponentType == Enum_EditorComponent_Type.EditorAgGrid){
return ProjectReferenceChildEditorAgGridComponent
} else if(ProjectDiaryRecord.topComponentType == Enum_EditorComponent_Type.EditorPTable){
return ProjectReferenceChildEditorPTableComponent
}
}
else if( fld == "Document" ){
if(ProjectDiaryRecord.topComponentType == Enum_EditorComponent_Type.EditorAgGrid){
return CodeNameDescriptionChildEditorAgGridComponent
} else if(ProjectDiaryRecord.topComponentType == Enum_EditorComponent_Type.EditorPTable){
return CodeNameDescriptionChildEditorPTableComponent
}
}



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
      // Have to save the result object to form control's value.
      // Otherwise, ther editedObject's this field will be overridden in submitForm().
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

          // moved the next line to Editor AgGrid
          // this.store.dispatch(ProjectDiaryRecordActionTypes.createProjectDiaryRecord({ projectDiaryRecord: {...this.editedObject } }))
          break
        case EnumEditorOperationType.Delete:
          if(this.parentDataArray && this.parentDataIndex >= 0){
            this.parentDataArray?.splice(this.parentDataIndex,1)
            // moved the next line to Editor AgGrid
            // this.store.dispatch(ProjectDiaryRecordActionTypes.deleteProjectDiaryRecord({ projectDiaryRecordId: this.editedObject.id }))
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

    } // end of function

    onClosedChildEditor(resultObject: any){
      this.editorForm.patchValue(this.editedObject)
    }

    //#endregion

  } // end of class
  