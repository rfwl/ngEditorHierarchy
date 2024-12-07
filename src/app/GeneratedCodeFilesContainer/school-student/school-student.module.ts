

  import { NgModule } from "@angular/core";
  import { CommonModule } from "@angular/common";
  import { FormsModule } from '@angular/forms'
  import { ReactiveFormsModule } from '@angular/forms'
  import { RouterModule, Routes } from "@angular/router";
  import { HttpClientModule } from "@angular/common/http";

  import { StoreModule } from "@ngrx/store";
  import { EffectsModule } from "@ngrx/effects";

  import { ModalModule } from 'ngx-bootstrap/modal';
  import { BsModalService } from 'ngx-bootstrap/modal';
  import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

  import { AgGridModule } from 'ag-grid-angular'
  import { TableModule } from 'primeng/table'

  import { SchoolStudentEditorAgGridComponent } from "./editor-aggrid/school-student-editor-aggrid.component";
  import { SchoolStudentEditorPTableComponent } from "./editor-ptable/school-student-editor-ptable.component";
  import { SchoolStudentEditorFormComponent } from "./editor-form/school-student-editor-form.component";

  import { SchoolStudentService } from "./school-student.service";
  import { SchoolStudentEffects, schoolStudentReducer, } from "./school-student.store";
  import { OpenFieldEditorCellRendererComponent, OpenFieldEditorFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputGroupFormControlComponent, BEPInputFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPCheckboxComponent, BEPCheckboxGroupComponent, DataTypeArrayCellRendererComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputBooleanFormControlComponent, BEPInputBooleanGroupFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";

  import { EditorHierarchySharedModule } from "../editor-hierarchy-shared/editor-hierarchy-shared.module";


import { AddressChildEditorAgGridComponent } from "./address/editor-aggrid/address-child-editor-aggrid.component";
import { AddressChildEditorPTableComponent } from "./address/editor-ptable/address-child-editor-ptable.component";
import { AddressChildEditorFormComponent } from "./address/editor-form/address-child-editor-form.component";
import { ContactChildEditorAgGridComponent } from "./contact/editor-aggrid/contact-child-editor-aggrid.component";
import { ContactChildEditorPTableComponent } from "./contact/editor-ptable/contact-child-editor-ptable.component";
import { ContactChildEditorFormComponent } from "./contact/editor-form/contact-child-editor-form.component";



  const routes: Routes = [
    { path: "", redirectTo: "list", pathMatch: 'full' },
    { path: "aggrid", component: SchoolStudentEditorAgGridComponent, },
    { path: "ptable", component: SchoolStudentEditorPTableComponent, },
    { path: "**", redirectTo: "" }
  ];

  @NgModule({
    declarations: [
      SchoolStudentEditorAgGridComponent,
      SchoolStudentEditorPTableComponent,
      SchoolStudentEditorFormComponent,


AddressChildEditorAgGridComponent,
AddressChildEditorPTableComponent,
AddressChildEditorFormComponent,
ContactChildEditorAgGridComponent,
ContactChildEditorPTableComponent,
ContactChildEditorFormComponent,



    ],

    exports: [
      SchoolStudentEditorAgGridComponent,
      SchoolStudentEditorPTableComponent,
      SchoolStudentEditorFormComponent,
    ],

    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      EditorHierarchySharedModule,

      StoreModule.forFeature('schoolStudents', schoolStudentReducer),
      EffectsModule.forFeature([SchoolStudentEffects]),

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [SchoolStudentService, BsModalService, ],
  })
  export class SchoolStudentModule {}
  