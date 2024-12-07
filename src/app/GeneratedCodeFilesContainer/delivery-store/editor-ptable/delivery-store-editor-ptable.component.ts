

  import { Component, OnInit } from '@angular/core'
  import { Router } from '@angular/router'
  import { FormBuilder } from '@angular/forms'
  import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
  import { Store, select } from '@ngrx/store'
  import { Update } from '@ngrx/entity'

  import { EnumEditorOperationType, show_CodeOutput_Modal, deepClone, display_DataArray_In_GridCell } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'

  import { DeliveryStoreEditorFormComponent } from '../editor-form/delivery-store-editor-form.component'

  import { DeliveryStoreActionTypes, DeliveryStoreState, selectAllDeliveryStores } from '../delivery-store.store'
  import { DeliveryStore, Enum_EditorComponent_Type } from '../delivery-store.model'
  import { DeliveryStoreService } from '../delivery-store.service'

import { AddressChildEditorFormComponent } from "../address/editor-form/address-child-editor-form.component";



  @Component({
    selector: "delivery-store-editor-ptable",

templateUrl: './delivery-store-editor-ptable.component.html', 

styleUrls: ['./delivery-store-editor-ptable.component.scss'] 

}) 

  export class DeliveryStoreEditorPTableComponent implements OnInit {

    //#region Main
    agGridThemeName: string = 'ag-theme-alpine-dark'
    delegate_display_DataArray_In_GridCell = display_DataArray_In_GridCell
    isInModal: boolean = false
    editedObjects?: any[] = undefined

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private router: Router,
      private store: Store,
      private codegenEntityService: DeliveryStoreService,
      private modalService: BsModalService ){

    }


    ngOnInit() {

      this.editedObjects = []

      this.store.dispatch(DeliveryStoreActionTypes.loadDeliveryStores())
      this.store.pipe(select(selectAllDeliveryStores)).subscribe (entLst => {
        this.editedObjects = entLst.map<DeliveryStore>(ent => {
          let ent1 = deepClone(ent)
          return DeliveryStore.createFrom(ent1)
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
      show_CodeOutput_Modal(this.modalService, 'DeliveryStores', str, 'modal-xl')
    }

    //#endregion

    //#region Row Record Editors

    // When child editors return to the top editor ptable, save the changes to DB.
    curSelectedDeliveryStore: any

    save_SelectedDeliveryStore(){
      const update: Update<DeliveryStore> = {
        id:  this.curSelectedDeliveryStore.id,
        changes: deepClone(this.curSelectedDeliveryStore)
      }
      this.store.dispatch(DeliveryStoreActionTypes.updateDeliveryStore({ update }))
      this.dspMsg('DeliveryStore with id = ' + update.id + ' was updated and saved to DB.')
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
      let modalRef = this.modalService.show(DeliveryStoreEditorFormComponent, config)
      DeliveryStore.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedRowEditor_create(resultObject: any){

      this.store.dispatch(DeliveryStoreActionTypes.createDeliveryStore({ deliveryStore: {...resultObject } }))
      this.dspMsg('DeliveryStore with id = ' + resultObject.id + ' was created and saved to DB.')
    }

    showUpdateForm(field: string, rowIndex: number = undefined) {

      this.curSelectedDeliveryStore = this.editedObjects[rowIndex]

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
      let modalRef = this.modalService.show(DeliveryStoreEditorFormComponent, config)
      DeliveryStore.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedRowEditor_update(edited: DeliveryStore){

      this.save_SelectedDeliveryStore()
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
      let modalRef = this.modalService.show(DeliveryStoreEditorFormComponent, config)
      DeliveryStore.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedRowEditor_delete(resultObject: any){

      this.store.dispatch(DeliveryStoreActionTypes.deleteDeliveryStore({ deliveryStoreId: resultObject.id }))
      this.dspMsg('DeliveryStore with id = ' + resultObject.id + ' was deleted from DB.')
    }

    //#endregion

    //#region Fiele Value Editors

    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined // unknown component.


else if( fld == "Address" ) return AddressChildEditorFormComponent



      return undefined
    }


    showFieldEditorForm(field: string, rowIndex: number = undefined) {

      this.curSelectedDeliveryStore = this.editedObjects[rowIndex]

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
      DeliveryStore.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedFieldEditorForm(resultObject: any){

      this.save_SelectedDeliveryStore()
    }

    showFieldEditorPTable(field: string, rowIndex: number = undefined) {

      this.curSelectedDeliveryStore = this.editedObjects[rowIndex]

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
      DeliveryStore.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedFieldEditorPTable(resultObject: any){
      this.save_SelectedDeliveryStore()
    }


    //#endregion

  } // end of class

