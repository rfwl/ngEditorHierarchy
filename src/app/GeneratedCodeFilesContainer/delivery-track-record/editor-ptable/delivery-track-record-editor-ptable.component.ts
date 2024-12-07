

  import { Component, OnInit } from '@angular/core'
  import { Router } from '@angular/router'
  import { FormBuilder } from '@angular/forms'
  import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
  import { Store, select } from '@ngrx/store'
  import { Update } from '@ngrx/entity'

  import { EnumEditorOperationType, show_CodeOutput_Modal, deepClone, display_DataArray_In_GridCell } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'

  import { DeliveryTrackRecordEditorFormComponent } from '../editor-form/delivery-track-record-editor-form.component'

  import { DeliveryTrackRecordActionTypes, DeliveryTrackRecordState, selectAllDeliveryTrackRecords } from '../delivery-track-record.store'
  import { DeliveryTrackRecord, Enum_EditorComponent_Type } from '../delivery-track-record.model'
  import { DeliveryTrackRecordService } from '../delivery-track-record.service'

import { CustomerChildEditorFormComponent } from "../customer/editor-form/customer-child-editor-form.component";

import { AddressChildEditorFormComponent } from "../address/editor-form/address-child-editor-form.component";



  @Component({
    selector: "delivery-track-record-editor-ptable",

templateUrl: './delivery-track-record-editor-ptable.component.html', 

styleUrls: ['./delivery-track-record-editor-ptable.component.scss'] 

}) 

  export class DeliveryTrackRecordEditorPTableComponent implements OnInit {

    //#region Main
    agGridThemeName: string = 'ag-theme-alpine-dark'
    delegate_display_DataArray_In_GridCell = display_DataArray_In_GridCell
    isInModal: boolean = false
    editedObjects?: any[] = undefined

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private router: Router,
      private store: Store,
      private codegenEntityService: DeliveryTrackRecordService,
      private modalService: BsModalService ){

    }


    ngOnInit() {

      this.editedObjects = []

      this.store.dispatch(DeliveryTrackRecordActionTypes.loadDeliveryTrackRecords())
      this.store.pipe(select(selectAllDeliveryTrackRecords)).subscribe (entLst => {
        this.editedObjects = entLst.map<DeliveryTrackRecord>(ent => {
          let ent1 = deepClone(ent)
          return DeliveryTrackRecord.createFrom(ent1)
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
      show_CodeOutput_Modal(this.modalService, 'DeliveryTrackRecords', str, 'modal-xl')
    }

    //#endregion

    //#region Row Record Editors

    // When child editors return to the top editor ptable, save the changes to DB.
    curSelectedDeliveryTrackRecord: any

    save_SelectedDeliveryTrackRecord(){
      const update: Update<DeliveryTrackRecord> = {
        id:  this.curSelectedDeliveryTrackRecord.id,
        changes: deepClone(this.curSelectedDeliveryTrackRecord)
      }
      this.store.dispatch(DeliveryTrackRecordActionTypes.updateDeliveryTrackRecord({ update }))
      this.dspMsg('DeliveryTrackRecord with id = ' + update.id + ' was updated and saved to DB.')
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
      let modalRef = this.modalService.show(DeliveryTrackRecordEditorFormComponent, config)
      DeliveryTrackRecord.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedRowEditor_create(resultObject: any){

      this.store.dispatch(DeliveryTrackRecordActionTypes.createDeliveryTrackRecord({ deliveryTrackRecord: {...resultObject } }))
      this.dspMsg('DeliveryTrackRecord with id = ' + resultObject.id + ' was created and saved to DB.')
    }

    showUpdateForm(field: string, rowIndex: number = undefined) {

      this.curSelectedDeliveryTrackRecord = this.editedObjects[rowIndex]

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
      let modalRef = this.modalService.show(DeliveryTrackRecordEditorFormComponent, config)
      DeliveryTrackRecord.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedRowEditor_update(edited: DeliveryTrackRecord){

      this.save_SelectedDeliveryTrackRecord()
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
      let modalRef = this.modalService.show(DeliveryTrackRecordEditorFormComponent, config)
      DeliveryTrackRecord.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedRowEditor_delete(resultObject: any){

      this.store.dispatch(DeliveryTrackRecordActionTypes.deleteDeliveryTrackRecord({ deliveryTrackRecordId: resultObject.id }))
      this.dspMsg('DeliveryTrackRecord with id = ' + resultObject.id + ' was deleted from DB.')
    }

    //#endregion

    //#region Fiele Value Editors

    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined // unknown component.


else if( fld == "Customer" ) return CustomerChildEditorFormComponent
else if( fld == "Address" ) return AddressChildEditorFormComponent



      return undefined
    }


    showFieldEditorForm(field: string, rowIndex: number = undefined) {

      this.curSelectedDeliveryTrackRecord = this.editedObjects[rowIndex]

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
      DeliveryTrackRecord.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedFieldEditorForm(resultObject: any){

      this.save_SelectedDeliveryTrackRecord()
    }

    showFieldEditorPTable(field: string, rowIndex: number = undefined) {

      this.curSelectedDeliveryTrackRecord = this.editedObjects[rowIndex]

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
      DeliveryTrackRecord.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedFieldEditorPTable(resultObject: any){
      this.save_SelectedDeliveryTrackRecord()
    }


    //#endregion

  } // end of class

