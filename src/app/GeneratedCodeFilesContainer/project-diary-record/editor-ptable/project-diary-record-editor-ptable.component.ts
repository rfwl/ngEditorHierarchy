

  import { Component, OnInit } from '@angular/core'
  import { Router } from '@angular/router'
  import { FormBuilder } from '@angular/forms'
  import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
  import { Store, select } from '@ngrx/store'
  import { Update } from '@ngrx/entity'

  import { EnumEditorOperationType, show_CodeOutput_Modal, deepClone, display_DataArray_In_GridCell } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'

  import { ProjectDiaryRecordEditorFormComponent } from '../editor-form/project-diary-record-editor-form.component'

  import { ProjectDiaryRecordActionTypes, ProjectDiaryRecordState, selectAllProjectDiaryRecords } from '../project-diary-record.store'
  import { ProjectDiaryRecord, Enum_EditorComponent_Type } from '../project-diary-record.model'
  import { ProjectDiaryRecordService } from '../project-diary-record.service'

import { CodeNameDescriptionChildEditorPTableComponent } from "../code-name-description/editor-ptable/code-name-description-child-editor-ptable.component";

import { ProjectFeatureChildEditorPTableComponent } from "../project-feature/editor-ptable/project-feature-child-editor-ptable.component";

import { ProjectBugChildEditorPTableComponent } from "../project-bug/editor-ptable/project-bug-child-editor-ptable.component";

import { ProjectReferenceChildEditorPTableComponent } from "../project-reference/editor-ptable/project-reference-child-editor-ptable.component";



  @Component({
    selector: "project-diary-record-editor-ptable",

templateUrl: './project-diary-record-editor-ptable.component.html', 

styleUrls: ['./project-diary-record-editor-ptable.component.scss'] 

}) 

  export class ProjectDiaryRecordEditorPTableComponent implements OnInit {

    //#region Main
    agGridThemeName: string = 'ag-theme-alpine-dark'
    delegate_display_DataArray_In_GridCell = display_DataArray_In_GridCell
    isInModal: boolean = false
    editedObjects?: any[] = undefined

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private router: Router,
      private store: Store,
      private codegenEntityService: ProjectDiaryRecordService,
      private modalService: BsModalService ){

    }


    ngOnInit() {

      this.editedObjects = []

      this.store.dispatch(ProjectDiaryRecordActionTypes.loadProjectDiaryRecords())
      this.store.pipe(select(selectAllProjectDiaryRecords)).subscribe (entLst => {
        this.editedObjects = entLst.map<ProjectDiaryRecord>(ent => {
          let ent1 = deepClone(ent)
          return ProjectDiaryRecord.createFrom(ent1)
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
      show_CodeOutput_Modal(this.modalService, 'ProjectDiaryRecords', str, 'modal-xl')
    }

    //#endregion

    //#region Row Record Editors

    // When child editors return to the top editor ptable, save the changes to DB.
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
      ProjectDiaryRecord.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedRowEditor_create(resultObject: any){

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
      ProjectDiaryRecord.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedRowEditor_update(edited: ProjectDiaryRecord){

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
      ProjectDiaryRecord.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedRowEditor_delete(resultObject: any){

      this.store.dispatch(ProjectDiaryRecordActionTypes.deleteProjectDiaryRecord({ projectDiaryRecordId: resultObject.id }))
      this.dspMsg('ProjectDiaryRecord with id = ' + resultObject.id + ' was deleted from DB.')
    }

    //#endregion

    //#region Fiele Value Editors

    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined // unknown component.


else if( fld == "Structure" ) return CodeNameDescriptionChildEditorPTableComponent
else if( fld == "Design" ) return CodeNameDescriptionChildEditorPTableComponent
else if( fld == "Feature" ) return ProjectFeatureChildEditorPTableComponent
else if( fld == "Bug" ) return ProjectBugChildEditorPTableComponent
else if( fld == "Reference" ) return ProjectReferenceChildEditorPTableComponent
else if( fld == "Document" ) return CodeNameDescriptionChildEditorPTableComponent



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
      ProjectDiaryRecord.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedFieldEditorForm(resultObject: any){

      this.save_SelectedProjectDiaryRecord()
    }

    showFieldEditorPTable(field: string, rowIndex: number = undefined) {

      this.curSelectedProjectDiaryRecord = this.editedObjects[rowIndex]

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
      ProjectDiaryRecord.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedFieldEditorPTable(resultObject: any){
      this.save_SelectedProjectDiaryRecord()
    }


    //#endregion

  } // end of class

