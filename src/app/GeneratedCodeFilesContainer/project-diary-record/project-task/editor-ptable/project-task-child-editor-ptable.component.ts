

  import { Component, OnInit } from '@angular/core'
  import { Router } from '@angular/router'
  import { FormBuilder } from '@angular/forms'
  import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
  import { Store, select } from '@ngrx/store'
  import * as pluralizeLib from 'pluralize'

  import { ProjectDiaryRecord, Enum_EditorComponent_Type } from '../../project-diary-record.model'

  import { EnumEditorOperationType, show_CodeOutput_Modal, deepClone, display_DataArray_In_GridCell, capitalizeWordInString } from '../../../editor-hierarchy-shared/editor-hierarchy-shared.component'

  import { ProjectTaskChildEditorFormComponent } from '../editor-form/project-task-child-editor-form.component'



  @Component({
    selector: "project-task-child-editor-ptable",

templateUrl: './project-task-child-editor-ptable.component.html', 

styleUrls: ['./project-task-child-editor-ptable.component.scss'] 

}) 

  export class ProjectTaskChildEditorPTableComponent implements OnInit {

    //#region Main
    agGridThemeName: string = 'ag-theme-alpine-dark'
    delegate_display_DataArray_In_GridCell = display_DataArray_In_GridCell

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private router: Router,
      private store: Store,
      private modalService: BsModalService ){

    }

    editedObjectClassName: string = ''

    ngOnInit() {

      this.build_editedObjects()

      this.editedObjectClassName = capitalizeWordInString(pluralizeLib.singular(this.parentDataField))


    }

    hideEditorPTable(event: any){
      // There is no Submit button on Child Editor PTable and so taking close button as Submit button.
      // If the parentEditor is the top editor ptable, we need to save changes to DB here
      // by calling parentOnClosedHandler every time closing this modal.
      if(!this.parentEditor || !this.parentOnClosedHandler) return
      this.parentOnClosedHandler.call(this.parentEditor, this.editedObjects)

      this.bsModalRef.hide()
    }

    runtimeMessageLines: string[] = []

    dspMsg(msg: string){
      //if(!this.runtimeMessageLines)
      this.runtimeMessageLines = []
      this.runtimeMessageLines.push(msg)
    }

    clrMsg(){
      this.runtimeMessageLines = []
    }

    outputJsonString(){

      let str = JSON.stringify(this.editedObjects, null, 4)
      show_CodeOutput_Modal(this.modalService, 'ProjectTasks', str, 'modal-xl')
    }

    //#endregion

    //#region Passed-in Parameters

    isInModal: boolean = true
    parentEditor: any = undefined
    parentOnClosedHandler?: Function
    parentDataObject: any
    parentDataField: string = ''
    parentDataArray: any[]
    parentDataIndex: number = -1
    editorOperationType?: EnumEditorOperationType

    editedObjects: any[] = undefined

    private build_editedObjects() {

        if(this.parentDataObject){
        if(this.parentDataField){
          this.editedObjects = this.parentDataObject[this.parentDataField]
          if(!this.editedObjects || !Array.isArray(this.editedObjects)) {
            //
            this.parentDataObject[this.parentDataField] = []
            this.editedObjects = this.parentDataObject[this.parentDataField]
          }
        } else {
          throw(new Error("Cannot find data objects to edit"))
        }

      } else {
        throw(new Error("Cannot find data objects to edit"))
      }

    } // end of function

    //#endregion


    //#region Row Editors

    showCreateForm(field: string, rowIndex: number = undefined) {
      const config: any = {
        class: 'modal-md' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          parentEditor: this,
          parentOnClosedHandler: this.onClosedRowEditor_create,
          parentDataArray: this.editedObjects,
          parentDataIndex: undefined,
          parentDataObject: undefined,
          parentDataField: undefined,
          editorOperationType: EnumEditorOperationType.Create
        }
      }
      let modalRef = this.modalService.show(ProjectTaskChildEditorFormComponent, config)
    }

    onClosedRowEditor_create(resultObject: any){

    }

    showUpdateForm(field: string, rowIndex: number = undefined) {
      const config: any = {
        class: 'modal-md' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          parentEditor: this,
          parentOnClosedHandler: this.onClosedRowEditor_update,
          parentDataArray: this.editedObjects,
          parentDataIndex: rowIndex,
          parentDataObject: undefined,
          parentDataField: undefined,
          editorOperationType: EnumEditorOperationType.Update
        }
      }
      let modalRef = this.modalService.show(ProjectTaskChildEditorFormComponent, config)
    }

    onClosedRowEditor_update(edited: any){

    }

    showDeleteForm(field: string, rowIndex: number = undefined) {
      const config: any = {
        class: 'modal-md' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          parentEditor: this,
          parentOnClosedHandler: this.onClosedRowEditor_delete,
          parentDataArray: this.editedObjects,
          parentDataIndex: rowIndex,
          parentDataObject: undefined,
          parentDataField: undefined,
          editorOperationType: EnumEditorOperationType.Delete
        }
      }
      let modalRef = this.modalService.show(ProjectTaskChildEditorFormComponent, config)
    }

    onClosedRowEditor_delete(resultObject: any){

    }

    //#endregion


    //#region field Child Editors

    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined





      return undefined
    }


    showFieldEditorForm(field: string, rowIndex: number = undefined) {

      const config: any = {
        class: 'modal-md' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          isInModal: true,
          parentEditor: this,
          parentOnClosedHandler: this.onClosedFieldEditorForm,
          parentDataArray: undefined,
          parentDataIndex: undefined,
          parentDataObject: this.editedObjects[rowIndex],
          parentDataField: field,
          editorOperationType: EnumEditorOperationType.Update
        }
      }
      let cmpnt = this.chooseFieleValueEditorComponent(field)
      if(!cmpnt) return
      let modalRef = this.modalService.show(cmpnt, config)
    }

    onClosedFieldEditorForm(resultObject: any){

    }

    showFieldEditorPTable(field: string, rowIndex: number = undefined) {

      const config: any = {
        class: 'modal-xl' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          isInModal: true,
          parentEditor: this,
          parentOnClosedHandler: this.onClosedFieldEditorPTable,
          parentDataArray: undefined,
          parentDataIndex: undefined,
          parentDataObject: this.editedObjects[rowIndex],
          parentDataField: field,
          editorOperationType: EnumEditorOperationType.Update
        }
      }
      let cmpnt = this.chooseFieleValueEditorComponent(field)
      if(!cmpnt) return
      let modalRef = this.modalService.show(cmpnt, config)
    }

    onClosedFieldEditorPTable(resultObject: any){

    }

    //#endregion





  } // end of class

