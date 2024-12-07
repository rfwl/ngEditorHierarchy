

  import { Component, OnInit } from '@angular/core'
  import { Router } from '@angular/router'
  import { FormBuilder } from '@angular/forms'
  import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
  import { Store, select } from '@ngrx/store'
  import { Update } from '@ngrx/entity'

  import { OpenFieldEditorCellRendererComponent, DataTypeArrayCellRendererComponent, deepClone  } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'
  import { EnumEditorOperationType, show_CodeOutput_Modal, SimpleColorCellRendererComponent } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'

  import { ProjectDiaryRecordEditorFormComponent } from '../editor-form/project-diary-record-editor-form.component'

  import { ProjectDiaryRecordActionTypes, ProjectDiaryRecordState, selectAllProjectDiaryRecords } from '../project-diary-record.store'
  import { ProjectDiaryRecord, Enum_EditorComponent_Type } from '../project-diary-record.model'
  import { ProjectDiaryRecordService } from '../project-diary-record.service'

import { CodeNameDescriptionChildEditorAgGridComponent } from "../code-name-description/editor-aggrid/code-name-description-child-editor-aggrid.component";

import { ProjectFeatureChildEditorAgGridComponent } from "../project-feature/editor-aggrid/project-feature-child-editor-aggrid.component";

import { ProjectBugChildEditorAgGridComponent } from "../project-bug/editor-aggrid/project-bug-child-editor-aggrid.component";

import { ProjectReferenceChildEditorAgGridComponent } from "../project-reference/editor-aggrid/project-reference-child-editor-aggrid.component";




  @Component({
    selector: "project-diary-record-editor-aggrid", 
templateUrl: './project-diary-record-editor-aggrid.component.html', 

styleUrls: ['./project-diary-record-editor-aggrid.component.scss'] 

}) 

  export class ProjectDiaryRecordEditorAgGridComponent implements OnInit {

    //#region Main
    agGridThemeName: string = 'ag-theme-alpine-dark'

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private router: Router,
      private store: Store,
      private codegenEntityService: ProjectDiaryRecordService,
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
      show_CodeOutput_Modal(this.modalService, 'ProjectDiaryRecords', str, 'modal-xl')
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

      this.store.dispatch(ProjectDiaryRecordActionTypes.loadProjectDiaryRecords())
      this.store.pipe(select(selectAllProjectDiaryRecords)).subscribe (entLst => {
        this.editedObjects = entLst.map<ProjectDiaryRecord>(ent => {
          let ent1 = deepClone(ent)
          return ProjectDiaryRecord.createFrom(ent1)
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

{ field: "Code", tooltipField:  "Code", headerName: "Code", flex: 1 }, 
{ field: "Name", tooltipField:  "Name", headerName: "Name", flex: 1 }, 
{ field: "Status", tooltipField:  "Status", headerName: "Status", flex: 1 }, 
{ field: "Updated", tooltipField:  "Updated", headerName: "Updated", flex: 1 }, 

{
  field: 'Structure',
  headerName: 'Structure',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorAgGrid,
    parentDataField: 'Structure',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 

{
  field: 'Design',
  headerName: 'Design',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorAgGrid,
    parentDataField: 'Design',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 

{
  field: 'Feature',
  headerName: 'Feature',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorAgGrid,
    parentDataField: 'Feature',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 

{
  field: 'Bug',
  headerName: 'Bug',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorAgGrid,
    parentDataField: 'Bug',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 

{
  field: 'Reference',
  headerName: 'Reference',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorAgGrid,
    parentDataField: 'Reference',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 

{
  field: 'Document',
  headerName: 'Document',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorAgGrid,
    parentDataField: 'Document',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 


    ]

    //#endregion

    //#region Row Record Editors

    // When child editors return to the top editor aggrid, save the changes to DB.
    curSelectedProjectDiaryRecord: any

    save_SelectedProjectDiaryRecord(){
      const update: Update<ProjectDiaryRecord> = {
        id:  this.curSelectedProjectDiaryRecord.id,
        changes: deepClone(this.curSelectedProjectDiaryRecord)
      }
      this.store.dispatch(ProjectDiaryRecordActionTypes.updateProjectDiaryRecord({ update }))
      this.dspMsg('ProjectDiaryRecord with id = ' + update.id + ' was updated and saved to DB.')
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
      let modalRef = this.modalService.show(ProjectDiaryRecordEditorFormComponent, config)
      ProjectDiaryRecord.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedRowEditor_create(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()

      this.store.dispatch(ProjectDiaryRecordActionTypes.createProjectDiaryRecord({ projectDiaryRecord: {...resultObject } }))
      this.dspMsg('ProjectDiaryRecord with id = ' + resultObject.id + ' was created and saved to DB.')
    }

    showUpdateForm(field: string, rowIndex: number = undefined) {

      this.curSelectedProjectDiaryRecord = this.editedObjects[rowIndex]

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
      let modalRef = this.modalService.show(ProjectDiaryRecordEditorFormComponent, config)
      ProjectDiaryRecord.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedRowEditor_update(edited: ProjectDiaryRecord){
      this.editor_agGrid_gridApi?.redrawRows()
      this.save_SelectedProjectDiaryRecord()
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
      let modalRef = this.modalService.show(ProjectDiaryRecordEditorFormComponent, config)
      ProjectDiaryRecord.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedRowEditor_delete(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()

      this.store.dispatch(ProjectDiaryRecordActionTypes.deleteProjectDiaryRecord({ projectDiaryRecordId: resultObject.id }))
      this.dspMsg('ProjectDiaryRecord with id = ' + resultObject.id + ' was deleted from DB.')
    }

    //#endregion

    //#region Fiele Value Editors

    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined // unknown component.


else if( fld == "Structure" ) return CodeNameDescriptionChildEditorAgGridComponent
else if( fld == "Design" ) return CodeNameDescriptionChildEditorAgGridComponent
else if( fld == "Feature" ) return ProjectFeatureChildEditorAgGridComponent
else if( fld == "Bug" ) return ProjectBugChildEditorAgGridComponent
else if( fld == "Reference" ) return ProjectReferenceChildEditorAgGridComponent
else if( fld == "Document" ) return CodeNameDescriptionChildEditorAgGridComponent



      return undefined
    }


    showFieldEditorForm(field: string, rowIndex: number = undefined) {

      this.curSelectedProjectDiaryRecord = this.editedObjects[rowIndex]

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
      ProjectDiaryRecord.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedFieldEditorForm(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()
      this.save_SelectedProjectDiaryRecord()
    }

    showFieldEditorAgGrid(field: string, rowIndex: number = undefined) {

      this.curSelectedProjectDiaryRecord = this.editedObjects[rowIndex]

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
      ProjectDiaryRecord.topComponentType = Enum_EditorComponent_Type.EditorAgGrid
    }

    onClosedFieldEditorAgGrid(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()
      this.save_SelectedProjectDiaryRecord()
    }

    //#endregion

  } // end of class

