

  import { Component, OnInit } from '@angular/core'
  import { Router } from '@angular/router'
  import { FormBuilder } from '@angular/forms'
  import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
  import { Store, select } from '@ngrx/store'
  import { Update } from '@ngrx/entity'

  import { EnumEditorOperationType, show_CodeOutput_Modal, deepClone, display_DataArray_In_GridCell } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'

  import { AllSimpleDataTypesRecordEditorFormComponent } from '../editor-form/all-simple-data-types-record-editor-form.component'

  import { AllSimpleDataTypesRecordActionTypes, AllSimpleDataTypesRecordState, selectAllAllSimpleDataTypesRecords } from '../all-simple-data-types-record.store'
  import { AllSimpleDataTypesRecord, Enum_EditorComponent_Type } from '../all-simple-data-types-record.model'
  import { AllSimpleDataTypesRecordService } from '../all-simple-data-types-record.service'


import { AObjectChildEditorFormComponent } from "../a-object/editor-form/a-object-child-editor-form.component";
import { AObjectItemChildEditorPTableComponent } from "../a-object-item/editor-ptable/a-object-item-child-editor-ptable.component";



  @Component({
    selector: "all-simple-data-types-record-editor-ptable",

templateUrl: './all-simple-data-types-record-editor-ptable.component.html', 

styleUrls: ['./all-simple-data-types-record-editor-ptable.component.scss'] 

}) 

  export class AllSimpleDataTypesRecordEditorPTableComponent implements OnInit {

    //#region Main
    agGridThemeName: string = 'ag-theme-alpine-dark'
    delegate_display_DataArray_In_GridCell = display_DataArray_In_GridCell
    isInModal: boolean = false
    editedObjects?: any[] = undefined

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private router: Router,
      private store: Store,
      private codegenEntityService: AllSimpleDataTypesRecordService,
      private modalService: BsModalService ){

    }


    ngOnInit() {

      this.editedObjects = []

      this.store.dispatch(AllSimpleDataTypesRecordActionTypes.loadAllSimpleDataTypesRecords())
      this.store.pipe(select(selectAllAllSimpleDataTypesRecords)).subscribe (entLst => {
        this.editedObjects = entLst.map<AllSimpleDataTypesRecord>(ent => {
          let ent1 = deepClone(ent)
          return AllSimpleDataTypesRecord.createFrom(ent1)
        })
      })

    } // end of fucntion

    hideEditorPTable(event: any){
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
      show_CodeOutput_Modal(this.modalService, 'AllSimpleDataTypesRecords', str, 'modal-xl')
    }

    //#endregion

    //#region Row Record Editors

    // When child editors return to the top editor ptable, save the changes to DB.
    curSelectedAllSimpleDataTypesRecord: any

    save_SelectedAllSimpleDataTypesRecord(){
      const update: Update<AllSimpleDataTypesRecord> = {
        id:  this.curSelectedAllSimpleDataTypesRecord.id,
        changes: deepClone(this.curSelectedAllSimpleDataTypesRecord)
      }
      this.store.dispatch(AllSimpleDataTypesRecordActionTypes.updateAllSimpleDataTypesRecord({ update }))
      this.dspMsg('AllSimpleDataTypesRecord with id = ' + update.id + ' was updated and saved to DB.')
    }


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
      let modalRef = this.modalService.show(AllSimpleDataTypesRecordEditorFormComponent, config)
      AllSimpleDataTypesRecord.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedRowEditor_create(resultObject: any){

      this.store.dispatch(AllSimpleDataTypesRecordActionTypes.createAllSimpleDataTypesRecord({ allSimpleDataTypesRecord: {...resultObject } }))
      this.dspMsg('AllSimpleDataTypesRecord with id = ' + resultObject.id + ' was created and saved to DB.')
    }

    showUpdateForm(field: string, rowIndex: number = undefined) {

      this.curSelectedAllSimpleDataTypesRecord = this.editedObjects[rowIndex]

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
      let modalRef = this.modalService.show(AllSimpleDataTypesRecordEditorFormComponent, config)
      AllSimpleDataTypesRecord.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedRowEditor_update(edited: AllSimpleDataTypesRecord){

      this.save_SelectedAllSimpleDataTypesRecord()
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
      let modalRef = this.modalService.show(AllSimpleDataTypesRecordEditorFormComponent, config)
      AllSimpleDataTypesRecord.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedRowEditor_delete(resultObject: any){

      this.store.dispatch(AllSimpleDataTypesRecordActionTypes.deleteAllSimpleDataTypesRecord({ allSimpleDataTypesRecordId: resultObject.id }))
      this.dspMsg('AllSimpleDataTypesRecord with id = ' + resultObject.id + ' was deleted from DB.')
    }

    //#endregion

    //#region Fiele Value Editors

    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined // unknown component.


else if( fld == "AObject" ) return AObjectChildEditorFormComponent
else if( fld == "AObjects" ) return AObjectItemChildEditorPTableComponent



      return undefined
    }


    showFieldEditorForm(field: string, rowIndex: number = undefined) {

      this.curSelectedAllSimpleDataTypesRecord = this.editedObjects[rowIndex]

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
      AllSimpleDataTypesRecord.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedFieldEditorForm(resultObject: any){

      this.save_SelectedAllSimpleDataTypesRecord()
    }

    showFieldEditorPTable(field: string, rowIndex: number = undefined) {

      this.curSelectedAllSimpleDataTypesRecord = this.editedObjects[rowIndex]

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
      AllSimpleDataTypesRecord.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedFieldEditorPTable(resultObject: any){
      this.save_SelectedAllSimpleDataTypesRecord()
    }


    //#endregion

  } // end of class

