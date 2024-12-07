

  import { Component, OnInit } from '@angular/core'
  import { Router } from '@angular/router'
  import { FormBuilder } from '@angular/forms'
  import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
  import { Store, select } from '@ngrx/store'
  import { Update } from '@ngrx/entity'

  import { OpenFieldEditorCellRendererComponent, DataTypeArrayCellRendererComponent, deepClone  } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'
  import { EnumEditorOperationType, show_CodeOutput_Modal, SimpleColorCellRendererComponent } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'

  import { AllArrayDataTypesRecordEditorFormComponent } from '../editor-form/all-array-data-types-record-editor-form.component'

  import { AllArrayDataTypesRecordActionTypes, AllArrayDataTypesRecordState, selectAllAllArrayDataTypesRecords } from '../all-array-data-types-record.store'
  import { AllArrayDataTypesRecord, Enum_EditorComponent_Type } from '../all-array-data-types-record.model'
  import { AllArrayDataTypesRecordService } from '../all-array-data-types-record.service'


import { AArrayChildEditorFormComponent } from "../a-array/editor-form/a-array-child-editor-form.component";
import { AArrayItemChildEditorAgGridComponent } from "../a-array-item/editor-aggrid/a-array-item-child-editor-aggrid.component";




  @Component({
    selector: "all-array-data-types-record-editor-aggrid", 
templateUrl: './all-array-data-types-record-editor-aggrid.component.html', 

styleUrls: ['./all-array-data-types-record-editor-aggrid.component.scss'] 

}) 

  export class AllArrayDataTypesRecordEditorAgGridComponent implements OnInit {

    //#region Main
    agGridThemeName: string = 'ag-theme-alpine-dark'

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private router: Router,
      private store: Store,
      private codegenEntityService: AllArrayDataTypesRecordService,
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
      show_CodeOutput_Modal(this.modalService, 'AllArrayDataTypesRecords', str, 'modal-xl')
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

      this.store.dispatch(AllArrayDataTypesRecordActionTypes.loadAllArrayDataTypesRecords())
      this.store.pipe(select(selectAllAllArrayDataTypesRecords)).subscribe (entLst => {
        this.editedObjects = entLst.map<AllArrayDataTypesRecord>(ent => {
          let ent1 = deepClone(ent)
          return AllArrayDataTypesRecord.createFrom(ent1)
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

{ field: "AStrings", tooltipField:  "AStrings", headerName: "AStrings", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "text" } }, 
{ field: "ANumbers", tooltipField:  "ANumbers", headerName: "ANumbers", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "number" } }, 
{ field: "ABooleans", tooltipField:  "ABooleans", headerName: "ABooleans", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "boolean" } }, 
{ field: "AEmails", tooltipField:  "AEmails", headerName: "AEmails", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "email" } }, 
{ field: "AUrls", tooltipField:  "AUrls", headerName: "AUrls", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "url" } }, 
{ field: "AColors", tooltipField:  "AColors", headerName: "AColors", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "color" } }, 
{ field: "ADates", tooltipField:  "ADates", headerName: "ADates", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "date" } }, 
{ field: "ATimes", tooltipField:  "ATimes", headerName: "ATimes", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "time" } }, 
{ field: "ADatetimes", tooltipField:  "ADatetimes", headerName: "ADatetimes", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "datetime-local" } }, 

{
  field: 'AArray',
  headerName: 'AArray',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorForm,
    parentDataField: 'AArray',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 

{
  field: 'AArrays',
  headerName: 'AArrays',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorAgGrid,
    parentDataField: 'AArrays',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 


    ]

    //#endregion

    //#region Row Record Editors

    // When child editors return to the top editor aggrid, save the changes to DB.
    curSelectedAllArrayDataTypesRecord: any

    save_SelectedAllArrayDataTypesRecord(){
      const update: Update<AllArrayDataTypesRecord> = {
        id:  this.curSelectedAllArrayDataTypesRecord.id,
        changes: deepClone(this.curSelectedAllArrayDataTypesRecord)
      }
      this.store.dispatch(AllArrayDataTypesRecordActionTypes.updateAllArrayDataTypesRecord({ update }))
      this.dspMsg('AllArrayDataTypesRecord with id = ' + update.id + ' was updated and saved to DB.')
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
      let modalRef = this.modalService.show(AllArrayDataTypesRecordEditorFormComponent, config)
      AllArrayDataTypesRecord.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedRowEditor_create(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()

      this.store.dispatch(AllArrayDataTypesRecordActionTypes.createAllArrayDataTypesRecord({ allArrayDataTypesRecord: {...resultObject } }))
      this.dspMsg('AllArrayDataTypesRecord with id = ' + resultObject.id + ' was created and saved to DB.')
    }

    showUpdateForm(field: string, rowIndex: number = undefined) {

      this.curSelectedAllArrayDataTypesRecord = this.editedObjects[rowIndex]

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
      let modalRef = this.modalService.show(AllArrayDataTypesRecordEditorFormComponent, config)
      AllArrayDataTypesRecord.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedRowEditor_update(edited: AllArrayDataTypesRecord){
      this.editor_agGrid_gridApi?.redrawRows()
      this.save_SelectedAllArrayDataTypesRecord()
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
      let modalRef = this.modalService.show(AllArrayDataTypesRecordEditorFormComponent, config)
      AllArrayDataTypesRecord.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedRowEditor_delete(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()

      this.store.dispatch(AllArrayDataTypesRecordActionTypes.deleteAllArrayDataTypesRecord({ allArrayDataTypesRecordId: resultObject.id }))
      this.dspMsg('AllArrayDataTypesRecord with id = ' + resultObject.id + ' was deleted from DB.')
    }

    //#endregion

    //#region Fiele Value Editors

    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined // unknown component.


else if( fld == "AArray" ) return AArrayChildEditorFormComponent
else if( fld == "AArrays" ) return AArrayItemChildEditorAgGridComponent



      return undefined
    }


    showFieldEditorForm(field: string, rowIndex: number = undefined) {

      this.curSelectedAllArrayDataTypesRecord = this.editedObjects[rowIndex]

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
      AllArrayDataTypesRecord.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedFieldEditorForm(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()
      this.save_SelectedAllArrayDataTypesRecord()
    }

    showFieldEditorAgGrid(field: string, rowIndex: number = undefined) {

      this.curSelectedAllArrayDataTypesRecord = this.editedObjects[rowIndex]

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
      AllArrayDataTypesRecord.topComponentType = Enum_EditorComponent_Type.EditorAgGrid
    }

    onClosedFieldEditorAgGrid(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()
      this.save_SelectedAllArrayDataTypesRecord()
    }

    //#endregion

  } // end of class

