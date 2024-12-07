

  import { Component, OnInit } from '@angular/core'
  import { Router } from '@angular/router'
  import { FormBuilder } from '@angular/forms'
  import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
  import { Store, select } from '@ngrx/store'
  import { AllSimpleDataTypesRecord, Enum_EditorComponent_Type } from '../../all-simple-data-types-record.model'

  import { OpenFieldEditorCellRendererComponent, DataTypeArrayCellRendererComponent } from '../../../editor-hierarchy-shared/editor-hierarchy-shared.component'
  import { EnumEditorOperationType, show_CodeOutput_Modal, SimpleColorCellRendererComponent } from '../../../editor-hierarchy-shared/editor-hierarchy-shared.component'

  import { AObjectItemChildEditorFormComponent } from '../editor-form/a-object-item-child-editor-form.component'


import { EObjectChildEditorFormComponent } from "../../e-object/editor-form/e-object-child-editor-form.component";
import { EObjectItemChildEditorAgGridComponent } from "../../e-object-item/editor-aggrid/e-object-item-child-editor-aggrid.component";



  @Component({
    selector: "a-object-item-child-editor-aggrid", 
templateUrl: './a-object-item-child-editor-aggrid.component.html', 

styleUrls: ['./a-object-item-child-editor-aggrid.component.scss'] 

}) 

  export class AObjectItemChildEditorAgGridComponent implements OnInit {

    //#region Main
    agGridThemeName: string = 'ag-theme-alpine-dark'

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private store: Store,
      private router: Router,
      private modalService: BsModalService ){

    }


    ngOnInit() {

      this.build_editedObjects()
      this.initEditorAgGrid()

    } // end of fucntion

    hideEditorAgGrid(event: any){

      if(!this.parentEditor || !this.parentOnClosedHandler) return
      this.parentOnClosedHandler.call(this.parentEditor, this.editedObjects)

      this.bsModalRef.hide()
    }

    outputJsonString(){

      let str = JSON.stringify(this.editedObjects, null, 4)
      show_CodeOutput_Modal(this.modalService, 'AObjectItems', str, 'modal-xl')
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

    private editedObjects: any[] = undefined

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

    //#region Init and Open AgGrid

    editor_agGrid_rowData?: any[]
    editor_agGrid_columnDefs?: any[]
    editor_agGrid_defaultColDef: any
    editor_agGrid_frameworkComponents: any
    editor_agGrid_gridApi: any
    editor_agGrid_gridColumnApi: any
    editor_agGrid_getRowNodeId: any

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

    }

    editor_agGrid_onRowDataChanged(event: any){
      if(this.editor_agGrid_gridColumnApi)
        this.editor_agGrid_gridColumnApi.autoSizeAllColumns()
    }

    editor_agGrid_onGridReady(params: { api: any; columnApi: any }) {
      this.editor_agGrid_gridApi = params.api
      this.editor_agGrid_gridColumnApi = params.columnApi

      this.editor_agGrid_rowData = this.editedObjects
      this.editor_agGrid_gridApi?.setRowData(this.editor_agGrid_rowData) // This is required.

    }

    colDefs =[
      { cellRenderer: 'openFieldEditorCellRenderer', width: 60, tooltipField: 'id',
        cellRendererParams: {
          icon: 'edit', display: '',  tooltip: 'Edit',
          parentComponent: this, parentFunction: this.showUpdateForm,
        }
      },
      { cellRenderer: 'openFieldEditorCellRenderer', width: 60,
        cellRendererParams: {
          icon: 'trash', display: '', tooltip: 'Delete',
          parentComponent: this, parentFunction: this.showDeleteForm
        }
      },

{ field: "EString", tooltipField:  "EString", headerName: "EString", flex: 1 }, 
{ field: "ENumber", tooltipField:  "ENumber", headerName: "ENumber", flex: 1 }, 
{ field: "EBoolean", tooltipField:  "EBoolean", headerName: "EBoolean", flex: 1 }, 
{ field: "EEmail", tooltipField:  "EEmail", headerName: "EEmail", flex: 1 }, 
{ field: "EUrl", tooltipField:  "EUrl", headerName: "EUrl", flex: 1 }, 
{ field: "EColor", tooltipField: "EColor", flex: 1, cellRenderer: "simpleColorCellRenderer" }, 
{ field: "EDate", tooltipField:  "EDate", headerName: "EDate", flex: 1 }, 
{ field: "ETime", tooltipField:  "ETime", headerName: "ETime", flex: 1 }, 
{ field: "EDatetime", tooltipField:  "EDatetime", headerName: "EDatetime", flex: 1 }, 

{
  field: 'EObject',
  headerName: 'EObject',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorForm,
    parentDataField: 'EObject',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 

{
  field: 'EObjects',
  headerName: 'EObjects',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorAgGrid,
    parentDataField: 'EObjects',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 


    ]

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
      let modalRef = this.modalService.show(AObjectItemChildEditorFormComponent, config)

    }

    onClosedRowEditor_create(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()
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
      let modalRef = this.modalService.show(AObjectItemChildEditorFormComponent, config)

    }

    onClosedRowEditor_update(edited: any){
      this.editor_agGrid_gridApi?.redrawRows()
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
      let modalRef = this.modalService.show(AObjectItemChildEditorFormComponent, config)

    }

    onClosedRowEditor_delete(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()
    }

    //#endregion

    //#region field Child Editors

    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined // unknown component.


else if( fld == "EObject" ) return EObjectChildEditorFormComponent
else if( fld == "EObjects" ) return EObjectItemChildEditorAgGridComponent



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
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()
    }

    showFieldEditorAgGrid(field: string, rowIndex: number = undefined) {

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

    }

    onClosedFieldEditorAgGrid(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()
    }

    //#endregion

  } // end of class

