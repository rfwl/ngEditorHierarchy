

  import { Component, OnInit } from '@angular/core'
  import { Router } from '@angular/router'
  import { FormBuilder } from '@angular/forms'
  import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
  import { Store, select } from '@ngrx/store'
  import { Update } from '@ngrx/entity'

  import { OpenFieldEditorCellRendererComponent, DataTypeArrayCellRendererComponent, deepClone  } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'
  import { EnumEditorOperationType, show_CodeOutput_Modal, SimpleColorCellRendererComponent } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'

  import { DeliveryProductEditorFormComponent } from '../editor-form/delivery-product-editor-form.component'

  import { DeliveryProductActionTypes, DeliveryProductState, selectAllDeliveryProducts } from '../delivery-product.store'
  import { DeliveryProduct, Enum_EditorComponent_Type } from '../delivery-product.model'
  import { DeliveryProductService } from '../delivery-product.service'

import { SpecificationsChildEditorFormComponent } from "../specifications/editor-form/specifications-child-editor-form.component";




  @Component({
    selector: "delivery-product-editor-aggrid", 
templateUrl: './delivery-product-editor-aggrid.component.html', 

styleUrls: ['./delivery-product-editor-aggrid.component.scss'] 

}) 

  export class DeliveryProductEditorAgGridComponent implements OnInit {

    //#region Main
    agGridThemeName: string = 'ag-theme-alpine-dark'

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private router: Router,
      private store: Store,
      private codegenEntityService: DeliveryProductService,
      private modalService: BsModalService ){

    }

    ngOnInit() {

      this.editedObjects = []
      this.initEditorAgGrid()

    }

    hideEditorAgGrid(event: any){
      this.bsModalRef.hide()
    }

    runtimeMessageLines: string[] = []

    dspMsg(msg: string){

      this.runtimeMessageLines = []
      this.runtimeMessageLines.push(msg)
    }

    clrMsg(){
      this.runtimeMessageLines = []
    }

    outputJsonString(){

      let str = JSON.stringify(this.editedObjects, null, 4)
      show_CodeOutput_Modal(this.modalService, 'DeliveryProducts', str, 'modal-xl')
    }

    //#endregion

    //#region Init and Open AgGrid
    isInModal: boolean = false
    editor_agGrid_rowData?: any[]
    editor_agGrid_columnDefs?: any[]
    editor_agGrid_defaultColDef: any
    editor_agGrid_frameworkComponents: any
    editor_agGrid_gridApi: any
    editor_agGrid_gridColumnApi: any
    editor_agGrid_getRowNodeId: any
    editor_agGrid_gridOptions: any

    editedObjects?: any[] = undefined

    initEditorAgGrid(){

      this.editor_agGrid_frameworkComponents = {
        simpleColorCellRenderer: SimpleColorCellRendererComponent,
        openFieldEditorCellRenderer: OpenFieldEditorCellRendererComponent,
        dataTypeArrayCellRenderer: DataTypeArrayCellRendererComponent
      }
      this.editor_agGrid_defaultColDef = { sortable: true, filter: true, resizable: true, maxWidth:500, suppressMovable: true }
      this.editor_agGrid_getRowNodeId = (params: any) => {
        return params.data.id
      }

      this.editor_agGrid_columnDefs = this.colDefs

    } // end of fucntion

    editor_agGrid_onRowDataChanged(event: any){
      if(this.editor_agGrid_gridColumnApi)
        this.editor_agGrid_gridColumnApi.autoSizeAllColumns()
    }

    editor_agGrid_onGridReady(params: { api: any; columnApi: any }) {
      this.editor_agGrid_gridApi = params.api
      this.editor_agGrid_gridColumnApi = params.columnApi

      this.store.dispatch(DeliveryProductActionTypes.loadDeliveryProducts())
      this.store.pipe(select(selectAllDeliveryProducts)).subscribe (entLst => {
        this.editedObjects = entLst.map<DeliveryProduct>(ent => {
          let ent1 = deepClone(ent)
          return DeliveryProduct.createFrom(ent1)
        })

        this.editor_agGrid_rowData = this.editedObjects
        this.editor_agGrid_gridApi?.setRowData(this.editor_agGrid_rowData) // This is required.
      })
    }  // end of fucntion

    colDefs =[
      { cellRenderer: 'openFieldEditorCellRenderer', width: 60, tooltipField: 'id',
        cellRendererParams: {
          icon: 'edit', display: '',  tooltip: 'Edit',
          parentComponent: this, parentFunction: this.showUpdateForm, parentDataField: undefined
        }
      },
      { cellRenderer: 'openFieldEditorCellRenderer', width: 60,
        cellRendererParams: {
          icon: 'trash', display: '', tooltip: 'Delete',
          parentComponent: this, parentFunction: this.showDeleteForm, parentDataField: undefined
        }
      },

{ field: "Category", tooltipField:  "Category", headerName: "Category", flex: 1 }, 
{ field: "Code", tooltipField:  "Code", headerName: "Code", flex: 1 }, 
{ field: "Model", tooltipField:  "Model", headerName: "Model", flex: 1 }, 
{ field: "Make", tooltipField:  "Make", headerName: "Make", flex: 1 }, 
{ field: "Price", tooltipField:  "Price", headerName: "Price", flex: 1 }, 

{
  field: 'Specifications',
  headerName: 'Specifications',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorForm,
    parentDataField: 'Specifications',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 


    ]

    //#endregion

    //#region Row Record Editors

    // When child editors return to the top editor aggrid, save the changes to DB.
    curSelectedDeliveryProduct: any

    save_SelectedDeliveryProduct(){
      const update: Update<DeliveryProduct> = {
        id:  this.curSelectedDeliveryProduct.id,
        changes: deepClone(this.curSelectedDeliveryProduct)
      }
      this.store.dispatch(DeliveryProductActionTypes.updateDeliveryProduct({ update }))
      this.dspMsg('DeliveryProduct with id = ' + update.id + ' was updated and saved to DB.')
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
      let modalRef = this.modalService.show(DeliveryProductEditorFormComponent, config)
      DeliveryProduct.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedRowEditor_create(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()

      this.store.dispatch(DeliveryProductActionTypes.createDeliveryProduct({ deliveryProduct: {...resultObject } }))
      this.dspMsg('DeliveryProduct with id = ' + resultObject.id + ' was created and saved to DB.')
    }

    showUpdateForm(field: string, rowIndex: number = undefined) {

      this.curSelectedDeliveryProduct = this.editedObjects[rowIndex]

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
      let modalRef = this.modalService.show(DeliveryProductEditorFormComponent, config)
      DeliveryProduct.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedRowEditor_update(edited: DeliveryProduct){
      this.editor_agGrid_gridApi?.redrawRows()
      this.save_SelectedDeliveryProduct()
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
      let modalRef = this.modalService.show(DeliveryProductEditorFormComponent, config)
      DeliveryProduct.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedRowEditor_delete(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()

      this.store.dispatch(DeliveryProductActionTypes.deleteDeliveryProduct({ deliveryProductId: resultObject.id }))
      this.dspMsg('DeliveryProduct with id = ' + resultObject.id + ' was deleted from DB.')
    }

    //#endregion

    //#region Fiele Value Editors

    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined // unknown component.


else if( fld == "Specifications" ) return SpecificationsChildEditorFormComponent



      return undefined
    }


    showFieldEditorForm(field: string, rowIndex: number = undefined) {

      this.curSelectedDeliveryProduct = this.editedObjects[rowIndex]

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
      DeliveryProduct.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedFieldEditorForm(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()
      this.save_SelectedDeliveryProduct()
    }

    showFieldEditorAgGrid(field: string, rowIndex: number = undefined) {

      this.curSelectedDeliveryProduct = this.editedObjects[rowIndex]

      const config: any = {
        class: 'modal-xl' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          isInModal: true,
          parentEditor: this,
          parentOnClosedHandler: this.onClosedFieldEditorAgGrid,
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
      DeliveryProduct.topComponentType = Enum_EditorComponent_Type.EditorAgGrid
    }

    onClosedFieldEditorAgGrid(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()
      this.save_SelectedDeliveryProduct()
    }

    //#endregion

  } // end of class

