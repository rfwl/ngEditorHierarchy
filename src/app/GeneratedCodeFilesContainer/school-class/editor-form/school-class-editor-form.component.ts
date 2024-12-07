

  import { Component, OnInit, inject } from '@angular/core'
  import { FormBuilder, FormGroup, Validators } from '@angular/forms'
  import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal'
  import { select, Store } from '@ngrx/store'
  import { Update } from '@ngrx/entity'
  import { Firestore, collection, doc } from '@angular/fire/firestore'

  import { EnumEditorOperationType, show_CodeOutput_Modal, predefinedLableFunctionContainer } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'
  import { make_undefined_to_null, copy_properties_from_object1_to_object2, deepClone } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'
  import { selectorOption_Arrays_Json_String } from '../../editor-hierarchy-shared/editor-hierarchy-shared.constants'

  import { SchoolClass, Enum_EditorComponent_Type } from '../school-class.model'
  import { EnumSelectorOptionSource } from '../school-class.model'




import { SchoolCourseActionTypes, selectAllSchoolCourses } from '../../school-course/school-course.store'
import { SchoolCourse } from '../../school-course/school-course.model'

import { SchoolRoomActionTypes, selectAllSchoolRooms } from '../../school-room/school-room.store'
import { SchoolRoom } from '../../school-room/school-room.model'

import { SchoolStudentActionTypes, selectAllSchoolStudents } from '../../school-student/school-student.store'
import { SchoolStudent } from '../../school-student/school-student.model'

import { SchoolTeacherActionTypes, selectAllSchoolTeachers } from '../../school-teacher/school-teacher.store'
import { SchoolTeacher } from '../../school-teacher/school-teacher.model'


  @Component({
    selector: "school-class-editor-form", 
templateUrl: './school-class-editor-form.component.html', 

styleUrls: ['./school-class-editor-form.component.scss'] 

}) 


  export class SchoolClassEditorFormComponent implements OnInit {
    firestore: Firestore
    labelValue_Array: any
    selectorOptionArraysJsonString: string
    selectorOptionArraysObject: any
    predefinedLableFunctionContainerInstance: any = predefinedLableFunctionContainer

    //#region Main

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private modalService: BsModalService,
      private store: Store
      ){
        this.firestore = inject(Firestore)
        this.selectorOptionArraysJsonString = selectorOption_Arrays_Json_String
        this.selectorOptionArraysObject = undefined
        try{
          this.selectorOptionArraysObject = JSON.parse(this.selectorOptionArraysJsonString)
        } catch(_){}

    }

Course_SchoolCourse_Options: any[] =[]
Room_SchoolRoom_Options: any[] =[]
Students_SchoolStudent_Options: any[] =[]
Teacher_SchoolTeacher_Options: any[] =[]


    ngOnInit() {

      this.initEditorForm()


try {
  this.store.dispatch(SchoolCourseActionTypes.loadSchoolCourses())
  this.store.pipe(select(selectAllSchoolCourses)).subscribe (entLst => {
    this.Course_SchoolCourse_Options = entLst.map<SchoolCourse>(ent => {
      try {
        let ent1 = deepClone(ent)
        return SchoolCourse.createFrom(ent1)
      } catch(_){ return null}
    })

  })
} catch(_){}
    
try {
  this.store.dispatch(SchoolRoomActionTypes.loadSchoolRooms())
  this.store.pipe(select(selectAllSchoolRooms)).subscribe (entLst => {
    this.Room_SchoolRoom_Options = entLst.map<SchoolRoom>(ent => {
      try {
        let ent1 = deepClone(ent)
        return SchoolRoom.createFrom(ent1)
      } catch(_){ return null}
    })

  })
} catch(_){}
    
try {
  this.store.dispatch(SchoolStudentActionTypes.loadSchoolStudents())
  this.store.pipe(select(selectAllSchoolStudents)).subscribe (entLst => {
    this.Students_SchoolStudent_Options = entLst.map<SchoolStudent>(ent => {
      try {
        let ent1 = deepClone(ent)
        return SchoolStudent.createFrom(ent1)
      } catch(_){ return null}
    })

  })
} catch(_){}
    
try {
  this.store.dispatch(SchoolTeacherActionTypes.loadSchoolTeachers())
  this.store.pipe(select(selectAllSchoolTeachers)).subscribe (entLst => {
    this.Teacher_SchoolTeacher_Options = entLst.map<SchoolTeacher>(ent => {
      try {
        let ent1 = deepClone(ent)
        return SchoolTeacher.createFrom(ent1)
      } catch(_){ return null}
    })

  })
} catch(_){}
    

    }

    ngAfterViewInit(){

    }

    hideEditorForm(){
      this.editorForm.reset()
      this.bsModalRef.hide()
    }

    outputJsonString(){

      let str = JSON.stringify(this.editorForm.value, null, 4)
      show_CodeOutput_Modal(this.modalService, 'SchoolClass', str, 'modal-xl')
    }

    getSelectorOptionArray(ty: string, nm: string): any[]{
      let ary: any[] = []
      if(!this.selectorOptionArraysObject) return ary
      if(ty == EnumSelectorOptionSource.ValueArray && this.selectorOptionArraysObject.valueArrays){
        return this.selectorOptionArraysObject.valueArrays[nm]
      } else if(ty == EnumSelectorOptionSource.LabelledValueArray && this.selectorOptionArraysObject.labelledValueArrays){
        return this.selectorOptionArraysObject.labelledValueArrays[nm]
      } else if(ty == EnumSelectorOptionSource.ObjectArray && this.selectorOptionArraysObject.objectArrays){
        return this.selectorOptionArraysObject.objectArrays[nm]
      }
      return ary
    }



    //#endregion

    //#region Data
    // Fields passed in by initialState from parent container

    isInModal: boolean = true
    parentEditor: any = undefined
    parentOnClosedHandler?: Function
    parentDataObject: any
    parentDataField: string = ''
    parentDataArray: any[]
    parentDataIndex: number = -1
    editorOperationType?: EnumEditorOperationType

    private editedObject: any

    private build_editedObject() {

      if(this.parentDataObject){
        if(this.parentDataField){
          this.editedObject = this.parentDataObject[this.parentDataField]
        } else {
          throw (() => new Error("Cannot find data object to edit"))
        }
      } else if(this.parentDataArray){
        if(this.parentDataIndex >= 0){
          this.editedObject = this.parentDataArray[this.parentDataIndex]
        } else {
          this.editedObject = undefined // Empty parent data array, will create a member
        }
      } else {
        throw(new Error("Cannot find data object to edit"))
      }

      if(!this.editedObject) {
        this.editedObject = {}
        this.editorOperationType = EnumEditorOperationType.Create
      }
    }

    get editorFormTitle(): string{
      switch(this.editorOperationType){
        case EnumEditorOperationType.Create:
          return 'Create SchoolClass'
        case EnumEditorOperationType.Delete:
          return 'Delete SchoolClass'
        case EnumEditorOperationType.Update:
          return 'Update SchoolClass'
        default:
          return 'Edit SchoolClass'
      }
    }

    get isToDelete(): boolean{
      switch(this.editorOperationType){
        case EnumEditorOperationType.Create:
          return false
        case EnumEditorOperationType.Delete:
          return true
        case EnumEditorOperationType.Update:
          return false
        default:
          return false
      }
    }

    get submitButtonLabel(): string{
      switch(this.editorOperationType){
        case EnumEditorOperationType.Create:
          return 'Save'
        case EnumEditorOperationType.Delete:
          return 'Delete'
        case EnumEditorOperationType.Update:
          return 'Save'
        default:
          return 'Edit'
      }
    }

    //#endregion

    //#region Init Editor
    agGridThemeName: string = 'ag-theme-alpine-dark'
    editorForm!: FormGroup

    initEditorForm() {

      this.editorForm = this.fb.group({

Code: [''], 
Name: [''], 
Active: [''], 
Course: [''], 
Room: [''], 
Students: [''], 
Teacher: [''], 
StartDateTime: [''], 
Hours: [''], 
Weeks: [''], 


      })

      this.build_editedObject()
      this.editorForm.patchValue(this.editedObject)

      if(this.isToDelete)
        this.editorForm.disable()

    } //end of function

get Code() { return this.editorForm.get('Code')  }
get Name() { return this.editorForm.get('Name')  }
get Active() { return this.editorForm.get('Active')  }
get Course() { return this.editorForm.get('Course')  }
get Room() { return this.editorForm.get('Room')  }
get Students() { return this.editorForm.get('Students')  }
get Teacher() { return this.editorForm.get('Teacher')  }
get StartDateTime() { return this.editorForm.get('StartDateTime')  }
get Hours() { return this.editorForm.get('Hours')  }
get Weeks() { return this.editorForm.get('Weeks')  }


    //#endregion

    //#region Cell Child Editors

    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined // unknown component.





      return undefined
    }

    childParentDataField: string

    build_paramsShowingEditorForm(fieldCode: string){
      return {
        icon:'box-open',
        display: '',
        tooltip: '',
        parentDataField: fieldCode,
        parentComponent: this,
        parentFunction: this.showChildEditorForm,
      }
    }

    showChildEditorForm(field: string, rowIndex: number = undefined) {
      this.childParentDataField = field
      const config: any = {
        class: 'modal-md' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          isInModal: true,
          parentEditor: this,
          parentOnClosedHandler: this.onClosedChildEditorForm,
          parentDataObject: this.editedObject,
          parentDataField: field,
          parentDataArray: undefined,
          parentDataIndex: undefined,
          editorOperationType: EnumEditorOperationType.Update
        }
      }
      let cmpnt = this.chooseFieleValueEditorComponent(field)
      if(!cmpnt) return
      let modalRef = this.modalService.show(cmpnt, config)
    }

    onClosedChildEditorForm(resultObject: any){
      // Have to save the result object to form control's value.
      // Otherwise, ther editedObject's this field will be overridden in submitForm().
      this.editorForm.get(this.childParentDataField).setValue(resultObject)
    }


    build_paramsShowingEditorGrid(fieldCode: string){
      return {
        icon:'box-open',
        display: '',
        tooltip: '',
        parentComponent: this,
        parentFunction: this.showChildEditorGrid,
        parentDataField: fieldCode
      }
    }

    showChildEditorGrid(field: string, rowIndex: number = undefined) {
      this.childParentDataField = field
      const config: any = {
        class: 'modal-xl' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          isInModal: true,
          parentEditor: this,
          parentOnClosedHandler: this.onClosedChildEditorGrid,
          parentDataObject: this.editedObject,
          parentDataField: field,
          parentDataArray: undefined,
          parentDataIndex: undefined,
          editorOperationType: EnumEditorOperationType.Update
        }
      }
      let cmpnt = this.chooseFieleValueEditorComponent(field)
      if(!cmpnt) return
      let modalRef = this.modalService.show(cmpnt, config)
      }

    onClosedChildEditorGrid(resultObject: any){

      this.editorForm.get(this.childParentDataField).setValue(resultObject)
    }


    //#endregion

    //#region Save, parent/child closed function

    submitEditorForm(editorForm:any){

      copy_properties_from_object1_to_object2(this.editorForm.value,this.editedObject )
      make_undefined_to_null(this.editedObject)

      switch(this.editorOperationType){
        case EnumEditorOperationType.Create:
          this.editedObject.id = doc(collection(this.firestore, '_')).id;
          if(this.parentDataArray)
            this.parentDataArray.push(this.editedObject)
          else if(this.parentDataObject && this.parentDataField)
            this.parentDataObject[this.parentDataField] = this.editedObject

          // moved the next line to Editor AgGrid
          // this.store.dispatch(SchoolClassActionTypes.createSchoolClass({ schoolClass: {...this.editedObject } }))
          break
        case EnumEditorOperationType.Delete:
          if(this.parentDataArray && this.parentDataIndex >= 0){
            this.parentDataArray?.splice(this.parentDataIndex,1)
            // moved the next line to Editor AgGrid
            // this.store.dispatch(SchoolClassActionTypes.deleteSchoolClass({ schoolClassId: this.editedObject.id }))
          }
          break
        case EnumEditorOperationType.Update:
          break
        default:
          break
      }

      if(!this.parentEditor || !this.parentOnClosedHandler) return
      this.parentOnClosedHandler.call(this.parentEditor, this.editedObject)
      this.hideEditorForm()

    } // end of function

    onClosedChildEditor(resultObject: any){
      this.editorForm.patchValue(this.editedObject)
    }

    //#endregion

  } // end of class
  