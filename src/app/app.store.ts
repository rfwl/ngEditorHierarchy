

import { ActionReducerMap, MetaReducer } from "@ngrx/store"

import { AllArrayDataTypesRecordState, allArrayDataTypesRecordReducer } from "./GeneratedCodeFilesContainer/all-array-data-types-record/all-array-data-types-record.store"

import { AllSimpleDataTypesRecordState, allSimpleDataTypesRecordReducer } from "./GeneratedCodeFilesContainer/all-simple-data-types-record/all-simple-data-types-record.store"

//import { ApplianceStoreProductState, applianceStoreProductReducer } from "./GeneratedCodeFilesContainer/appliance-store-product/appliance-store-product.store"

//import { SelectableFieldsRecordState, selectableFieldsRecordReducer } from "./GeneratedCodeFilesContainer/selectable-fields-record/selectable-fields-record.store"


import { SelectableOptionRecordState, selectableOptionRecordReducer } from "./GeneratedCodeFilesContainer/selectable-option-record/selectable-option-record.store"

import { SelectableFieldRecordState, selectableFieldRecordReducer } from "./GeneratedCodeFilesContainer/selectable-field-record/selectable-field-record.store"

import { ProjectDiaryRecordState, projectDiaryRecordReducer } from "./GeneratedCodeFilesContainer/project-diary-record/project-diary-record.store"

import { ContactPersonListState, contactPersonListReducer } from "./GeneratedCodeFilesContainer/contact-person-list/contact-person-list.store"

import { DeliveryTrackRecordState, deliveryTrackRecordReducer } from "./GeneratedCodeFilesContainer/delivery-track-record/delivery-track-record.store"
import { DeliveryContractorState, deliveryContractorReducer } from "./GeneratedCodeFilesContainer/delivery-contractor/delivery-contractor.store"
import { DeliveryStoreState, deliveryStoreReducer } from "./GeneratedCodeFilesContainer/delivery-store/delivery-store.store"
import { DeliveryProductState, deliveryProductReducer } from "./GeneratedCodeFilesContainer/delivery-product/delivery-product.store"

import { SchoolStudentState, schoolStudentReducer } from "./GeneratedCodeFilesContainer/school-student/school-student.store"
import { SchoolTeacherState, schoolTeacherReducer } from "./GeneratedCodeFilesContainer/school-teacher/school-teacher.store"
import { SchoolCourseState, schoolCourseReducer } from "./GeneratedCodeFilesContainer/school-course/school-course.store"
import { SchoolRoomState, schoolRoomReducer } from "./GeneratedCodeFilesContainer/school-room/school-room.store"
import { SchoolClassState, schoolClassReducer } from "./GeneratedCodeFilesContainer/school-class/school-class.store"

export interface AppState {
  allSimpleDataTypes: AllSimpleDataTypesRecordState
  arrayDataTypesState: AllArrayDataTypesRecordState
  //selectionFromArray: SelectableFieldsRecordState
  //coachingSchool: CoachingSchoolState
  //applianceStoreProduct: ApplianceStoreProductState
  selectableOptionRecord: SelectableOptionRecordState
  selectableFieldRecord: SelectableFieldRecordState
  projectDiaryRecord: ProjectDiaryRecordState
  contactPersonList: ContactPersonListState

  deliveryTrackRecord: DeliveryTrackRecordState
  deliveryProduct: DeliveryProductState
  deliveryStore: DeliveryStoreState
  deliveryContractor: DeliveryContractorState

  schoolStudent: SchoolStudentState
  schoolTeacher: SchoolTeacherState
  schoolCourse: SchoolCourseState
  schoolRoom: SchoolRoomState
  schoolClass: SchoolClassState




}

export const reducers: ActionReducerMap<AppState> = {
  allSimpleDataTypes: allSimpleDataTypesRecordReducer,
  arrayDataTypesState: allArrayDataTypesRecordReducer,
  //selectionFromArray: selectableFieldsRecordReducer,

  //coachingSchool: coachingSchoolReducer,
  //applianceStoreProduct: applianceStoreProductReducer
  selectableOptionRecord: selectableOptionRecordReducer,
  selectableFieldRecord: selectableFieldRecordReducer,
  projectDiaryRecord: projectDiaryRecordReducer,
  contactPersonList: contactPersonListReducer,

  deliveryTrackRecord: deliveryTrackRecordReducer,
  deliveryProduct: deliveryProductReducer,
  deliveryStore: deliveryStoreReducer,
  deliveryContractor: deliveryContractorReducer,

  schoolStudent: schoolStudentReducer,
  schoolTeacher: schoolTeacherReducer,
  schoolCourse: schoolCourseReducer,
  schoolRoom: schoolRoomReducer,
  schoolClass: schoolClassReducer,


}

export const metaReducers: MetaReducer<AppState>[] =  [];

