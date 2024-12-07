

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

import { BsModalService } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { J2EHDocumentsComponent } from './pages/j2eh-documents.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import {default as settings} from "../assets/ngEditorHierarchy_config.json"

import { AppService } from './app.service';

import { metaReducers, reducers } from './app.store';
// import { ApplianceStoreProductModule } from './GeneratedCodeFilesContainer/appliance-store-product/appliance-store-product.module';
// import { ApplianceStoreProductEffects } from './GeneratedCodeFilesContainer/appliance-store-product/appliance-store-product.store';

import { AllSimpleDataTypesRecordModule } from './GeneratedCodeFilesContainer/all-simple-data-types-record/all-simple-data-types-record.module'
import { AllSimpleDataTypesRecordEffects } from './GeneratedCodeFilesContainer/all-simple-data-types-record/all-simple-data-types-record.store'

import { AllArrayDataTypesRecordModule } from './GeneratedCodeFilesContainer/all-array-data-types-record/all-array-data-types-record.module'
import { AllArrayDataTypesRecordEffects } from './GeneratedCodeFilesContainer/all-array-data-types-record/all-array-data-types-record.store'

//import { SelectableFieldsRecordModule } from './GeneratedCodeFilesContainer/selectable-fields-record/selectable-fields-record.module'
//import { SelectableFieldsRecordEffects } from './GeneratedCodeFilesContainer/selectable-fields-record/selectable-fields-record.store'

  import { SelectableOptionRecordModule } from './GeneratedCodeFilesContainer/selectable-option-record/selectable-option-record.module'
  import { SelectableOptionRecordEffects } from './GeneratedCodeFilesContainer/selectable-option-record/selectable-option-record.store'


  import { SelectableFieldRecordModule } from './GeneratedCodeFilesContainer/selectable-field-record/selectable-field-record.module'
  import { SelectableFieldRecordEffects } from './GeneratedCodeFilesContainer/selectable-field-record/selectable-field-record.store'

  import { ProjectDiaryRecordModule } from './GeneratedCodeFilesContainer/project-diary-record/project-diary-record.module'
  import { ProjectDiaryRecordEffects } from './GeneratedCodeFilesContainer/project-diary-record/project-diary-record.store'

  import { ContactPersonListModule } from './GeneratedCodeFilesContainer/contact-person-list/contact-person-list.module'
  import { ContactPersonListEffects } from './GeneratedCodeFilesContainer/contact-person-list/contact-person-list.store'

  import { DeliveryTrackRecordModule } from './GeneratedCodeFilesContainer/delivery-track-record/delivery-track-record.module'
  import { DeliveryTrackRecordEffects } from './GeneratedCodeFilesContainer/delivery-track-record/delivery-track-record.store'
  import { DeliveryProductModule } from './GeneratedCodeFilesContainer/delivery-product/delivery-product.module'
  import { DeliveryProductEffects } from './GeneratedCodeFilesContainer/delivery-product/delivery-product.store'
  import { DeliveryStoreModule } from './GeneratedCodeFilesContainer/delivery-store/delivery-store.module'
  import { DeliveryStoreEffects } from './GeneratedCodeFilesContainer/delivery-store/delivery-store.store'
  import { DeliveryContractorModule } from './GeneratedCodeFilesContainer/delivery-contractor/delivery-contractor.module'
  import { DeliveryContractorEffects } from './GeneratedCodeFilesContainer/delivery-contractor/delivery-contractor.store'


  import { SchoolStudentModule } from './GeneratedCodeFilesContainer/school-student/school-student.module'
  import { SchoolStudentEffects } from './GeneratedCodeFilesContainer/school-student/school-student.store'
  import { SchoolTeacherModule } from './GeneratedCodeFilesContainer/school-teacher/school-teacher.module'
  import { SchoolTeacherEffects } from './GeneratedCodeFilesContainer/school-teacher/school-teacher.store'
  import { SchoolCourseModule } from './GeneratedCodeFilesContainer/school-course/school-course.module'
  import { SchoolCourseEffects } from './GeneratedCodeFilesContainer/school-course/school-course.store'
  import { SchoolRoomModule } from './GeneratedCodeFilesContainer/school-room/school-room.module'
  import { SchoolRoomEffects } from './GeneratedCodeFilesContainer/school-room/school-room.store'
  import { SchoolClassModule } from './GeneratedCodeFilesContainer/school-class/school-class.module'
  import { SchoolClassEffects } from './GeneratedCodeFilesContainer/school-class/school-class.store'



@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    AgGridModule,
    TabsModule.forRoot(),

    AllSimpleDataTypesRecordModule,
    AllArrayDataTypesRecordModule,
    SelectableFieldRecordModule,
    SelectableOptionRecordModule,
    ProjectDiaryRecordModule,
    ContactPersonListModule,
    DeliveryTrackRecordModule,
    DeliveryProductModule,
    DeliveryStoreModule,
    DeliveryContractorModule,
    SchoolStudentModule,
    SchoolTeacherModule,
    SchoolCourseModule,
    SchoolRoomModule,
    SchoolClassModule,


    StoreModule.forRoot(reducers, {metaReducers }),
    EffectsModule.forRoot([
      AllSimpleDataTypesRecordEffects,
      AllArrayDataTypesRecordEffects,
      //ApplianceStoreProductEffects,
      SelectableFieldRecordEffects,
      SelectableOptionRecordEffects,
      ProjectDiaryRecordEffects,
      ContactPersonListEffects,
      DeliveryTrackRecordEffects,
      DeliveryProductEffects,
      DeliveryStoreEffects,
      DeliveryContractorEffects,
      SchoolStudentEffects,
      SchoolTeacherEffects,
      SchoolCourseEffects,
      SchoolRoomEffects,
      SchoolClassEffects



    ]), // Must be here

    //ApplianceStoreProductModule,

  ],

  declarations: [
    AppComponent,
    J2EHDocumentsComponent
  ],
  exports: [
  ],
  providers: [BsModalService, AppService,
    provideFirebaseApp(() => initializeApp(settings.Firebase_Connection)), // for angularfire/auth
    provideFirestore(() => getFirestore()), // for angularfire/auth


  ],
  bootstrap: [AppComponent]
})
export class AppModule { } // 2 lines (import {...}) + 3 Lines (in imports: [...]) to add the generated source code files.


