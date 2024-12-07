import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal'
import * as pluralizeLib from 'pluralize'

import { AppService } from './app.service';

// import { ApplianceStoreProductEditorAgGridComponent } from './GeneratedCodeFilesContainer/appliance-store-product/editor-aggrid/appliance-store-product-editor-aggrid.component'

// import { ApplianceStoreProductEditorPTableComponent } from './GeneratedCodeFilesContainer/appliance-store-product//editor-ptable/appliance-store-product-editor-ptable.component'

import { AllSimpleDataTypesRecordEditorAgGridComponent } from './GeneratedCodeFilesContainer/all-simple-data-types-record/editor-aggrid/all-simple-data-types-record-editor-aggrid.component'

import { AllSimpleDataTypesRecordEditorPTableComponent } from './GeneratedCodeFilesContainer/all-simple-data-types-record/editor-ptable/all-simple-data-types-record-editor-ptable.component'

import { AllArrayDataTypesRecordEditorAgGridComponent } from './GeneratedCodeFilesContainer/all-array-data-types-record/editor-aggrid/all-array-data-types-record-editor-aggrid.component'

import { AllArrayDataTypesRecordEditorPTableComponent } from './GeneratedCodeFilesContainer/all-array-data-types-record/editor-ptable/all-array-data-types-record-editor-ptable.component'

//import { SelectableFieldsRecordEditorAgGridComponent } from './GeneratedCodeFilesContainer/selectable-fields-record/editor-aggrid/selectable-fields-record-editor-aggrid.component'

//import { SelectableFieldsRecordEditorPTableComponent } from './GeneratedCodeFilesContainer/selectable-fields-record/editor-ptable/selectable-fields-record-editor-ptable.component'

import { SelectableOptionRecordEditorAgGridComponent } from './GeneratedCodeFilesContainer/selectable-option-record/editor-aggrid/selectable-option-record-editor-aggrid.component'

import { SelectableOptionRecordEditorPTableComponent } from './GeneratedCodeFilesContainer/selectable-option-record/editor-ptable/selectable-option-record-editor-ptable.component'

import { SelectableOptionRecordEditorFormComponent } from './GeneratedCodeFilesContainer/selectable-option-record/editor-form/selectable-option-record-editor-form.component'

import { SelectableFieldRecordEditorAgGridComponent } from './GeneratedCodeFilesContainer/selectable-field-record/editor-aggrid/selectable-field-record-editor-aggrid.component'

import { SelectableFieldRecordEditorPTableComponent } from './GeneratedCodeFilesContainer/selectable-field-record/editor-ptable/selectable-field-record-editor-ptable.component'

import { SelectableFieldRecordEditorFormComponent } from './GeneratedCodeFilesContainer/selectable-field-record/editor-form/selectable-field-record-editor-form.component'


import { ProjectDiaryRecordEditorAgGridComponent } from './GeneratedCodeFilesContainer/project-diary-record/editor-aggrid/project-diary-record-editor-aggrid.component'

import { ProjectDiaryRecordEditorPTableComponent } from './GeneratedCodeFilesContainer/project-diary-record/editor-ptable/project-diary-record-editor-ptable.component'

import { ProjectDiaryRecordEditorFormComponent } from './GeneratedCodeFilesContainer/project-diary-record/editor-form/project-diary-record-editor-form.component'

import { ContactPersonListEditorAgGridComponent } from './GeneratedCodeFilesContainer/contact-person-list/editor-aggrid/contact-person-list-editor-aggrid.component'

import { ContactPersonListEditorPTableComponent } from './GeneratedCodeFilesContainer/contact-person-list/editor-ptable/contact-person-list-editor-ptable.component'

import { ContactPersonListEditorFormComponent } from './GeneratedCodeFilesContainer/contact-person-list/editor-form/contact-person-list-editor-form.component'

import { DeliveryTrackRecordEditorAgGridComponent } from './GeneratedCodeFilesContainer/delivery-track-record/editor-aggrid/delivery-track-record-editor-aggrid.component'

import { DeliveryTrackRecordEditorPTableComponent } from './GeneratedCodeFilesContainer/delivery-track-record/editor-ptable/delivery-track-record-editor-ptable.component'

import { DeliveryTrackRecordEditorFormComponent } from './GeneratedCodeFilesContainer/delivery-track-record/editor-form/delivery-track-record-editor-form.component'

import { DeliveryProductEditorAgGridComponent } from './GeneratedCodeFilesContainer/delivery-product/editor-aggrid/delivery-product-editor-aggrid.component'

import { DeliveryProductEditorPTableComponent } from './GeneratedCodeFilesContainer/delivery-product/editor-ptable/delivery-product-editor-ptable.component'

import { DeliveryProductEditorFormComponent } from './GeneratedCodeFilesContainer/delivery-product/editor-form/delivery-product-editor-form.component'

import { DeliveryStoreEditorAgGridComponent } from './GeneratedCodeFilesContainer/delivery-store/editor-aggrid/delivery-store-editor-aggrid.component'

import { DeliveryStoreEditorPTableComponent } from './GeneratedCodeFilesContainer/delivery-store/editor-ptable/delivery-store-editor-ptable.component'

import { DeliveryStoreEditorFormComponent } from './GeneratedCodeFilesContainer/delivery-store/editor-form/delivery-store-editor-form.component'

import { DeliveryContractorEditorAgGridComponent } from './GeneratedCodeFilesContainer/delivery-contractor/editor-aggrid/delivery-contractor-editor-aggrid.component'

import { DeliveryContractorEditorPTableComponent } from './GeneratedCodeFilesContainer/delivery-contractor/editor-ptable/delivery-contractor-editor-ptable.component'

import { DeliveryContractorEditorFormComponent } from './GeneratedCodeFilesContainer/delivery-contractor/editor-form/delivery-contractor-editor-form.component'

import { SchoolStudentEditorAgGridComponent } from './GeneratedCodeFilesContainer/school-student/editor-aggrid/school-student-editor-aggrid.component'

import { SchoolStudentEditorPTableComponent } from './GeneratedCodeFilesContainer/school-student/editor-ptable/school-student-editor-ptable.component'

import { SchoolStudentEditorFormComponent } from './GeneratedCodeFilesContainer/school-student/editor-form/school-student-editor-form.component'

import { SchoolTeacherEditorAgGridComponent } from './GeneratedCodeFilesContainer/school-teacher/editor-aggrid/school-teacher-editor-aggrid.component'

import { SchoolTeacherEditorPTableComponent } from './GeneratedCodeFilesContainer/school-teacher/editor-ptable/school-teacher-editor-ptable.component'

import { SchoolTeacherEditorFormComponent } from './GeneratedCodeFilesContainer/school-teacher/editor-form/school-teacher-editor-form.component'

import { SchoolCourseEditorAgGridComponent } from './GeneratedCodeFilesContainer/school-course/editor-aggrid/school-course-editor-aggrid.component'

import { SchoolCourseEditorPTableComponent } from './GeneratedCodeFilesContainer/school-course/editor-ptable/school-course-editor-ptable.component'

import { SchoolCourseEditorFormComponent } from './GeneratedCodeFilesContainer/school-course/editor-form/school-course-editor-form.component'

import { SchoolRoomEditorAgGridComponent } from './GeneratedCodeFilesContainer/school-room/editor-aggrid/school-room-editor-aggrid.component'

import { SchoolRoomEditorPTableComponent } from './GeneratedCodeFilesContainer/school-room/editor-ptable/school-room-editor-ptable.component'

import { SchoolRoomEditorFormComponent } from './GeneratedCodeFilesContainer/school-room/editor-form/school-room-editor-form.component'

import { SchoolClassEditorAgGridComponent } from './GeneratedCodeFilesContainer/school-class/editor-aggrid/school-class-editor-aggrid.component'

import { SchoolClassEditorPTableComponent } from './GeneratedCodeFilesContainer/school-class/editor-ptable/school-class-editor-ptable.component'

import { SchoolClassEditorFormComponent } from './GeneratedCodeFilesContainer/school-class/editor-form/school-class-editor-form.component'






@Component({
  selector: 'app-root',
  template: `

<div class="row row-cols-1 row-cols-sm-2 g-3 m-3">
  <div class="col" *ngFor="let smpl of sampleDefinitionArray">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">{{smpl.title}}</h4>
      </div>
      <div class="card-body">
        <!--h6>{{smpl.brief}}</h6-->
        <p class="card-text">{{smpl.desc}}</p>
        <div class="d-flex flex-row" >
          <span class="flex-fill"></span>
          <h6 class="m-2">Launch Grid View Window:</h6>
          <button class="btn btn-secondary btn-sm m-2" *ngFor="let ag of smpl.aggrids"
            (click)="showChildEditorComponent(ag.component)">{{ag.label}}</button>
          <button class="btn btn-secondary btn-sm m-2" *ngFor="let pt of smpl.ptables"
            (click)="showChildEditorComponent(pt.component)">{{pt.label}}</button>
        </div>
      </div>
      <div class="card-footer text-muted">
      </div>
    </div>
  </div>
  `,

})
export class AppComponent implements OnInit, AfterViewInit{

  constructor(public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private appService: AppService) {
    //this.appService.loadConstantsObject(null)
  }


  ngOnInit(): void {
    //console.log("ngOnInit")

  }

  ngAfterViewInit(): void {
    //console.log("ngAfterViewInit")

  }

  sampleDefinitionArray: any[] = [
    {title: "Sample 1" , brief: "Demostrate to use all the simple visual data types and pop-up child editor forms and grid views.",
      desc: "Sample 1 presents an editor hierarchy for objedct fields of all the simple data types in three levels of editor form and grid views. Either editor form or grid view can popup child editor form or grid view.",
      aggrids: [{ label: "AgGrid", component: AllSimpleDataTypesRecordEditorAgGridComponent }],
      ptables: [{ label: "PTable", component: AllSimpleDataTypesRecordEditorPTableComponent }]
    },
    {title: "Sample 2" , brief: "Demostrate  to use all the arrat visual data types.",
      desc: "Sample 2 presents object fields of all array data types in editor form and grid view and child ones.",
      aggrids: [{ label: "AgGrid", component: AllArrayDataTypesRecordEditorAgGridComponent }],
      ptables: [{ label: "PTable", component: AllArrayDataTypesRecordEditorPTableComponent }]
    },
    {title: "Sample 3" , desc: "Demostrate how to select values from predefined arrays.",
      aggrids: [{ label: "AgGrid", component: SelectableFieldRecordEditorAgGridComponent }],
      ptables: [{ label: "PTable", component: SelectableFieldRecordEditorPTableComponent }]
    },

    {title: "Sample 4" , desc: "Demostrate how to select values from predefined arrays.",
      aggrids: [{ label: "AgGrid", component: ProjectDiaryRecordEditorAgGridComponent }],
      ptables: [{ label: "PTable", component: ProjectDiaryRecordEditorPTableComponent }]
    },

    {title: "Sample 5" , desc: "Demostrate an editor hierarchy to manage coaching schools.",
      aggrids: [{ label: "AgGrid", component: ContactPersonListEditorAgGridComponent }],
      ptables: [{ label: "PTable", component: ContactPersonListEditorPTableComponent }]
    },

    {title: "Sample 6" ,
      desc: "Delivery for Appliance Stores - Sample 6 tracks deliveries for appliance stores with editor hierarchies for separate record lists: Delivery, product, contractor and store.",
      aggrids: [
        { label: "Delivery Track AgGrid", component: DeliveryTrackRecordEditorAgGridComponent },
        { label: "Delivery Product AgGrid", component: DeliveryProductEditorAgGridComponent },
        { label: "Delivery Store AgGrid", component: DeliveryStoreEditorAgGridComponent },
        { label: "Delivery Contractor AgGrid", component: DeliveryContractorEditorAgGridComponent }

      ],
      ptables: [
        { label: "Delivery Track PTable", component: DeliveryTrackRecordEditorPTableComponent },
        { label: "Delivery Product PTable", component: DeliveryProductEditorPTableComponent },
        { label: "Delivery Store PTable", component: DeliveryStoreEditorPTableComponent },
        { label: "Delivery Contractor PTable", component: DeliveryContractorEditorPTableComponent }
      ]
    },

    {title: "Sample 7" ,
      desc: "Coaching School Classes - Sample 7 tracks classes in a coaching schools with editor hierachies for separate record lists: Student, Teacher, Course, Room, adn Class.",
      aggrids: [
        { label: "School Class AgGrid", component: SchoolClassEditorAgGridComponent },
        { label: "School Student AgGrid", component: SchoolStudentEditorAgGridComponent },
        { label: "School Teacher AgGrid", component: SchoolTeacherEditorAgGridComponent },
        { label: "School Course AgGrid", component: SchoolCourseEditorAgGridComponent },
        { label: "School Room AgGrid", component: SchoolRoomEditorAgGridComponent }

      ],
      ptables: [
        { label: "School Class PTable", component: SchoolClassEditorPTableComponent },
        { label: "School Student PTable", component: SchoolStudentEditorPTableComponent },
        { label: "School Teacher PTable", component: SchoolTeacherEditorPTableComponent },
        { label: "School Course PTable", component: SchoolCourseEditorPTableComponent },
        { label: "School Room PTable", component: SchoolRoomEditorPTableComponent }
      ]
    },


    {title: "Selectable Option Record - Sample 8" , desc: "Selectable Option Record - Sample 8: an editor hierarchy to build a Selectable Option Record list for other record list to select values from.",
      aggrids: [{ label: "AgGrid", component: SelectableOptionRecordEditorAgGridComponent }],
      ptables: [{ lable: "PTable", component: SelectableOptionRecordEditorPTableComponent }]
  },


  ]

  // showChildEditor_AgGrid(sampleDefinition: any){
  //   this.showChildEditor(sampleDefinition, 'aggrid')
  // }
  // showChildEditor_PTable(sampleDefinition: any){
  //   this.showChildEditor(sampleDefinition, 'ptable')
  // }

  // showChildEditor(sampleDefinition: any, componentName: string) {

  showChildEditorComponent(cmpnt: any){
    const config: any = {
      class: 'modal-fullscreen' , backdrop: true, ignoreBackdropClick: true,
      initialState: {
        isInModal: true,
        parentEditor: this,
        parentOnClosedHandler: this.onClosedChildEditor,
        parentDataObject: undefined,
        parentDataField: undefined,
        parentDataArray: undefined,
        parentDataIndex: undefined,
        editorOperationType: undefined
      }
    }
    if(!cmpnt) return
    let modalRef = this.modalService.show(cmpnt, config)
  }

  onClosedChildEditor(resultObject: any){

  }



} // end of class


/*

  @ViewChild('applianceStoreProductEditorAgGridPage', { static: false }) applianceStoreProductEditorAgGrid?: ApplianceStoreProductEditorAgGridComponent

  @ViewChild('applianceStoreProductEditorPTablePage', { static: false }) applianceStoreProductEditorPTable?: ApplianceStoreProductEditorPTableComponent

  // 3 Lines are required to add the generated source code files.

  title = 'elvg09';

  @ViewChild('coachingSchoolEditorAgGridPage', { static: false }) coachingSchoolEditorAgGrid?: CoachingSchoolEditorAgGridComponent
  @ViewChild('coachingSchoolEditorPTablePage', { static: false }) coachingSchoolEditorPTable?: CoachingSchoolEditorPTableComponent

  @ViewChild('allVisualDataTypesEditorAgGridPage', { static: false }) allVisualDataTypesEditorAgGrid?: AllVisualDataTypesEditorAgGridComponent
  @ViewChild('allVisualDataTypesEditorPTablePage', { static: false }) allVisualDataTypesEditorPTable?: AllVisualDataTypesEditorPTableComponent

  canExtractFieldsFlag: boolean = false
  canGenerateCodesFlag: boolean = false



  toShow_allVisualDataTypesEditorAgGridPage(){

  }

  toShow_coachingSchoolEditorAgGridPage(){

  }

  <!--tabset #staticTabs>

    <tab heading="Documents">
      <j2eh-documents></j2eh-documents>
    </tab>
    <tab heading="Sample 1 - All VDTs - AgGrid" (selectTab)="toShow_allVisualDataTypesEditorAgGridPage()" >
    <all-visual-data-types-editor-aggrid #allVisualDataTypesEditorAgGridPage></all-visual-data-types-editor-aggrid>
    </tab>
    <tab heading="Sample 1 - All VDTs - PTable" >
    <all-visual-data-types-editor-ptable #allVisualDataTypesEditorPTablePage></all-visual-data-types-editor-ptable>
    </tab>

    <tab heading="Sample 2 - School - AgGrid" (selectTab)="toShow_coachingSchoolEditorAgGridPage()">
    <coaching-school-editor-aggrid #coachingSchoolEditorAgGridPage ></coaching-school-editor-aggrid>
    </tab>
    <tab heading="Sample 2 - School - PTable" >
    <coaching-school-editor-ptable #coachingSchoolEditorPTablePage ></coaching-school-editor-ptable>
    </tab>

    <tab heading="Sample 2 - Appliance - AgGrid" >
    <appliance-store-product-editor-aggrid #applianceStoreProductEditorAgGridPage ></appliance-store-product-editor-aggrid>
    </tab>

    <tab heading="Sample 2 - Appliance - PTable" >
    <appliance-store-product-editor-ptable #applianceStoreProductEditorPTablePage ></appliance-store-product-editor-ptable>
    </tab>

  </tabset-->

  */




