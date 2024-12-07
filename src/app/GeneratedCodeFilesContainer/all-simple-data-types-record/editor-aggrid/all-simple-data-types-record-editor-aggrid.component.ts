

  import { Component, OnInit } from '@angular/core'
  import { Router } from '@angular/router'
  import { FormBuilder } from '@angular/forms'
  import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
  import { Store, select } from '@ngrx/store'
  import { Update } from '@ngrx/entity'

  import { OpenFieldEditorCellRendererComponent, DataTypeArrayCellRendererComponent, deepClone  } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'
  import { EnumEditorOperationType, show_CodeOutput_Modal, SimpleColorCellRendererComponent } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'

  import { AllSimpleDataTypesRecordEditorFormComponent } from '../editor-form/all-simple-data-types-record-editor-form.component'

  import { AllSimpleDataTypesRecordActionTypes, AllSimpleDataTypesRecordState, selectAllAllSimpleDataTypesRecords } from '../all-simple-data-types-record.store'
  import { AllSimpleDataTypesRecord, Enum_EditorComponent_Type } from '../all-simple-data-types-record.model'
  import { AllSimpleDataTypesRecordService } from '../all-simple-data-types-record.service'


import { AObjectChildEditorFormComponent } from "../a-object/editor-form/a-object-child-editor-form.component";
import { AObjectItemChildEditorAgGridComponent } from "../a-object-item/editor-aggrid/a-object-item-child-editor-aggrid.component";




  @Component({
    selector: "all-simple-data-types-record-editor-aggrid", 
templateUrl: './all-simple-data-types-record-editor-aggrid.component.html', 

styleUrls: ['./all-simple-data-types-record-editor-aggrid.component.scss'] 

}) 

  export class AllSimpleDataTypesRecordEditorAgGridComponent implements OnInit {

    //#region Main
    agGridThemeName: string = 'ag-theme-alpine-dark'

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private router: Router,
      private store: Store,
      private codegenEntityService: AllSimpleDataTypesRecordService,
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
      show_CodeOutput_Modal(this.modalService, 'AllSimpleDataTypesRecords', str, 'modal-xl')
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

      this.store.dispatch(AllSimpleDataTypesRecordActionTypes.loadAllSimpleDataTypesRecords())
      this.store.pipe(select(selectAllAllSimpleDataTypesRecords)).subscribe (entLst => {
        this.editedObjects = entLst.map<AllSimpleDataTypesRecord>(ent => {
          let ent1 = deepClone(ent)
          return AllSimpleDataTypesRecord.createFrom(ent1)
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

{ field: "AString", tooltipField:  "AString", headerName: "AString", flex: 1 }, 
{ field: "ANumber", tooltipField:  "ANumber", headerName: "ANumber", flex: 1 }, 
{ field: "ABoolean", tooltipField:  "ABoolean", headerName: "ABoolean", flex: 1 }, 
{ field: "AEmail", tooltipField:  "AEmail", headerName: "AEmail", flex: 1 }, 
{ field: "AUrl", tooltipField:  "AUrl", headerName: "AUrl", flex: 1 }, 
{ field: "AColor", tooltipField: "AColor", flex: 1, cellRenderer: "simpleColorCellRenderer" }, 
{ field: "ADate", tooltipField:  "ADate", headerName: "ADate", flex: 1 }, 
{ field: "ATime", tooltipField:  "ATime", headerName: "ATime", flex: 1 }, 
{ field: "ADatetime", tooltipField:  "ADatetime", headerName: "ADatetime", flex: 1 }, 

{
  field: 'AObject',
  headerName: 'AObject',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorForm,
    parentDataField: 'AObject',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 

{
  field: 'AObjects',
  headerName: 'AObjects',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorAgGrid,
    parentDataField: 'AObjects',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 


    ]

    //#endregion

    //#region Row Record Editors

    // When child editors return to the top editor aggrid, save the changes to DB.
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
      AllSimpleDataTypesRecord.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedRowEditor_create(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()

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
      AllSimpleDataTypesRecord.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedRowEditor_update(edited: AllSimpleDataTypesRecord){
      this.editor_agGrid_gridApi?.redrawRows()
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
      AllSimpleDataTypesRecord.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedRowEditor_delete(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()

      this.store.dispatch(AllSimpleDataTypesRecordActionTypes.deleteAllSimpleDataTypesRecord({ allSimpleDataTypesRecordId: resultObject.id }))
      this.dspMsg('AllSimpleDataTypesRecord with id = ' + resultObject.id + ' was deleted from DB.')
    }

    //#endregion

    //#region Fiele Value Editors

    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined // unknown component.


else if( fld == "AObject" ) return AObjectChildEditorFormComponent
else if( fld == "AObjects" ) return AObjectItemChildEditorAgGridComponent



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
      AllSimpleDataTypesRecord.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedFieldEditorForm(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()
      this.save_SelectedAllSimpleDataTypesRecord()
    }

    showFieldEditorAgGrid(field: string, rowIndex: number = undefined) {

      this.curSelectedAllSimpleDataTypesRecord = this.editedObjects[rowIndex]

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
      AllSimpleDataTypesRecord.topComponentType = Enum_EditorComponent_Type.EditorAgGrid
    }

    onClosedFieldEditorAgGrid(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()
      this.save_SelectedAllSimpleDataTypesRecord()
    }

    //#endregion

  } // end of class

