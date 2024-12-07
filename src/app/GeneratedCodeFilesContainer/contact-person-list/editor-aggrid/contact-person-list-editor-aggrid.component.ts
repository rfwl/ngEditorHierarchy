

  import { Component, OnInit } from '@angular/core'
  import { Router } from '@angular/router'
  import { FormBuilder } from '@angular/forms'
  import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
  import { Store, select } from '@ngrx/store'
  import { Update } from '@ngrx/entity'

  import { OpenFieldEditorCellRendererComponent, DataTypeArrayCellRendererComponent, deepClone  } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'
  import { EnumEditorOperationType, show_CodeOutput_Modal, SimpleColorCellRendererComponent } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'

  import { ContactPersonListEditorFormComponent } from '../editor-form/contact-person-list-editor-form.component'

  import { ContactPersonListActionTypes, ContactPersonListState, selectAllContactPersonLists } from '../contact-person-list.store'
  import { ContactPersonList, Enum_EditorComponent_Type } from '../contact-person-list.model'
  import { ContactPersonListService } from '../contact-person-list.service'

import { AddressChildEditorFormComponent } from "../address/editor-form/address-child-editor-form.component";

import { ContactChildEditorFormComponent } from "../contact/editor-form/contact-child-editor-form.component";

import { ExtensionsChildEditorAgGridComponent } from "../extensions/editor-aggrid/extensions-child-editor-aggrid.component";

import { CorrespondencesChildEditorAgGridComponent } from "../correspondences/editor-aggrid/correspondences-child-editor-aggrid.component";




  @Component({
    selector: "contact-person-list-editor-aggrid", 
templateUrl: './contact-person-list-editor-aggrid.component.html', 

styleUrls: ['./contact-person-list-editor-aggrid.component.scss'] 

}) 

  export class ContactPersonListEditorAgGridComponent implements OnInit {

    //#region Main
    agGridThemeName: string = 'ag-theme-alpine-dark'

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private router: Router,
      private store: Store,
      private codegenEntityService: ContactPersonListService,
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
      show_CodeOutput_Modal(this.modalService, 'ContactPersonLists', str, 'modal-xl')
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

      this.store.dispatch(ContactPersonListActionTypes.loadContactPersonLists())
      this.store.pipe(select(selectAllContactPersonLists)).subscribe (entLst => {
        this.editedObjects = entLst.map<ContactPersonList>(ent => {
          let ent1 = deepClone(ent)
          return ContactPersonList.createFrom(ent1)
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

{ field: "Title", tooltipField:  "Title", headerName: "Title", flex: 1 }, 
{ field: "FirstName", tooltipField:  "FirstName", headerName: "FirstName", flex: 1 }, 
{ field: "MiddleName", tooltipField:  "MiddleName", headerName: "MiddleName", flex: 1 }, 
{ field: "LastName", tooltipField:  "LastName", headerName: "LastName", flex: 1 }, 
{ field: "Gender", tooltipField:  "Gender", headerName: "Gender", flex: 1 }, 
{ field: "DOB", tooltipField:  "DOB", headerName: "DOB", flex: 1 }, 

{
  field: 'Address',
  headerName: 'Address',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorForm,
    parentDataField: 'Address',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 

{
  field: 'Contact',
  headerName: 'Contact',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorForm,
    parentDataField: 'Contact',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 
{ field: "Alias", tooltipField:  "Alias", headerName: "Alias", flex: 1,
cellRenderer: "dataTypeArrayCellRenderer", cellRendererParams: { inputType: "text" } }, 
{ field: "StartDate", tooltipField:  "StartDate", headerName: "StartDate", flex: 1 }, 
{ field: "Category", tooltipField:  "Category", headerName: "Category", flex: 1 }, 
{ field: "Status", tooltipField:  "Status", headerName: "Status", flex: 1 }, 

{
  field: 'Extensions',
  headerName: 'Extensions',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorAgGrid,
    parentDataField: 'Extensions',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 

{
  field: 'Correspondences',
  headerName: 'Correspondences',
  flex: 1,
  cellRenderer: 'openFieldEditorCellRenderer',
  cellRendererParams: {
    parentComponent: this,
    parentFunction: this.showFieldEditorAgGrid,
    parentDataField: 'Correspondences',
    icon: null || 'box-open',
    display: null || '',
    tooltip: null || ''
  }
}, 


    ]

    //#endregion

    //#region Row Record Editors

    // When child editors return to the top editor aggrid, save the changes to DB.
    curSelectedContactPersonList: any

    save_SelectedContactPersonList(){
      const update: Update<ContactPersonList> = {
        id:  this.curSelectedContactPersonList.id,
        changes: deepClone(this.curSelectedContactPersonList)
      }
      this.store.dispatch(ContactPersonListActionTypes.updateContactPersonList({ update }))
      this.dspMsg('ContactPersonList with id = ' + update.id + ' was updated and saved to DB.')
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
      let modalRef = this.modalService.show(ContactPersonListEditorFormComponent, config)
      ContactPersonList.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedRowEditor_create(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()

      this.store.dispatch(ContactPersonListActionTypes.createContactPersonList({ contactPersonList: {...resultObject } }))
      this.dspMsg('ContactPersonList with id = ' + resultObject.id + ' was created and saved to DB.')
    }

    showUpdateForm(field: string, rowIndex: number = undefined) {

      this.curSelectedContactPersonList = this.editedObjects[rowIndex]

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
      let modalRef = this.modalService.show(ContactPersonListEditorFormComponent, config)
      ContactPersonList.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedRowEditor_update(edited: ContactPersonList){
      this.editor_agGrid_gridApi?.redrawRows()
      this.save_SelectedContactPersonList()
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
      let modalRef = this.modalService.show(ContactPersonListEditorFormComponent, config)
      ContactPersonList.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedRowEditor_delete(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()

      this.store.dispatch(ContactPersonListActionTypes.deleteContactPersonList({ contactPersonListId: resultObject.id }))
      this.dspMsg('ContactPersonList with id = ' + resultObject.id + ' was deleted from DB.')
    }

    //#endregion

    //#region Fiele Value Editors

    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined // unknown component.


else if( fld == "Address" ) return AddressChildEditorFormComponent
else if( fld == "Contact" ) return ContactChildEditorFormComponent
else if( fld == "Extensions" ) return ExtensionsChildEditorAgGridComponent
else if( fld == "Correspondences" ) return CorrespondencesChildEditorAgGridComponent



      return undefined
    }


    showFieldEditorForm(field: string, rowIndex: number = undefined) {

      this.curSelectedContactPersonList = this.editedObjects[rowIndex]

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
      ContactPersonList.topComponentType = Enum_EditorComponent_Type.EditorAgGrid

    }

    onClosedFieldEditorForm(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()
      this.save_SelectedContactPersonList()
    }

    showFieldEditorAgGrid(field: string, rowIndex: number = undefined) {

      this.curSelectedContactPersonList = this.editedObjects[rowIndex]

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
      ContactPersonList.topComponentType = Enum_EditorComponent_Type.EditorAgGrid
    }

    onClosedFieldEditorAgGrid(resultObject: any){
      this.editor_agGrid_gridApi?.setRowData(this.editedObjects)
      this.editor_agGrid_gridApi?.redrawRows()
      this.save_SelectedContactPersonList()
    }

    //#endregion

  } // end of class

