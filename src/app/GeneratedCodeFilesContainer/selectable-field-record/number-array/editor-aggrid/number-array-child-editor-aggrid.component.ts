

  import { Component, OnInit } from '@angular/core'
  import { Router } from '@angular/router'
  import { FormBuilder } from '@angular/forms'
  import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
  import { Store, select } from '@ngrx/store'
  import * as pluralizeLib from 'pluralize'

  import { SelectableFieldRecord, Enum_EditorComponent_Type } from '../../selectable-field-record.model'

  import { OpenFieldEditorCellRendererComponent, DataTypeArrayCellRendererComponent } from '../../../editor-hierarchy-shared/editor-hierarchy-shared.component'
  import { EnumEditorOperationType, show_CodeOutput_Modal, SimpleColorCellRendererComponent, capitalizeWordInString } from '../../../editor-hierarchy-shared/editor-hierarchy-shared.component'

  import { NumberArrayChildEditorFormComponent } from '../editor-form/number-array-child-editor-form.component'



  @Component({
    selector: "number-array-child-editor-aggrid", 
templateUrl: './number-array-child-editor-aggrid.component.html', 

styleUrls: ['./number-array-child-editor-aggrid.component.scss'] 

}) 

  export class NumberArrayChildEditorAgGridComponent implements OnInit {

    //#region Main
    agGridThemeName: string = 'ag-theme-alpine-dark'

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private store: Store,
      private router: Router,
      private modalService: BsModalService ){

    }

    editedObjectClassName: string = ''

    ngOnInit() {

      this.build_editedObjects()
      this.editedObjectClassName = capitalizeWordInString(pluralizeLib.singular(this.parentDataField))

      this.initEditorAgGrid()

    } // end of fucntion

    hideEditorAgGrid(event: any){

      if(!this.parentEditor || !this.parentOnClosedHandler) return
      this.parentOnClosedHandler.call(this.parentEditor, this.editedObjects)

      this.bsModalRef.hide()
    }

    outputJsonString(){

      let str = JSON.stringify(this.editedObjects, null, 4)
      show_CodeOutput_Modal(this.modalService, 'NumberArrays', str, 'modal-xl')
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

{ field: "SelectFromValueArray", tooltipField:  "SelectFromValueArray", headerName: "SelectFromValueArray", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "number" } }, 
{ field: "SelectFromLabeledValueArray", tooltipField:  "SelectFromLabeledValueArray", headerName: "SelectFromLabeledValueArray", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "number" } }, 
{ field: "SelectFromObjectArray", tooltipField:  "SelectFromObjectArray", headerName: "SelectFromObjectArray", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "number" } }, 
{ field: "SelectFromRecordList", tooltipField:  "SelectFromRecordList", headerName: "SelectFromRecordList", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "number" } }, 
{ field: "CheckboxFromValueArray", tooltipField:  "CheckboxFromValueArray", headerName: "CheckboxFromValueArray", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "number" } }, 
{ field: "CheckboxFromLabeledValueArray", tooltipField:  "CheckboxFromLabeledValueArray", headerName: "CheckboxFromLabeledValueArray", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "number" } }, 
{ field: "CheckboxFromObjectArray", tooltipField:  "CheckboxFromObjectArray", headerName: "CheckboxFromObjectArray", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "number" } }, 
{ field: "CheckboxFromRecordList", tooltipField:  "CheckboxFromRecordList", headerName: "CheckboxFromRecordList", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "number" } }, 


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
      let modalRef = this.modalService.show(NumberArrayChildEditorFormComponent, config)

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
      let modalRef = this.modalService.show(NumberArrayChildEditorFormComponent, config)

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
      let modalRef = this.modalService.show(NumberArrayChildEditorFormComponent, config)

    }

    onClosedRowEditor_delete(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()
    }

    //#endregion

    //#region field Child Editors

    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined // unknown component.





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

