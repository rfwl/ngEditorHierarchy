

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

  import { SchoolTeacherEditorAgGridComponent } from "./editor-aggrid/school-teacher-editor-aggrid.component";
  import { SchoolTeacherEditorPTableComponent } from "./editor-ptable/school-teacher-editor-ptable.component";
  import { SchoolTeacherEditorFormComponent } from "./editor-form/school-teacher-editor-form.component";

  import { SchoolTeacherService } from "./school-teacher.service";
  import { SchoolTeacherEffects, schoolTeacherReducer, } from "./school-teacher.store";
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
    { path: "aggrid", component: SchoolTeacherEditorAgGridComponent, },
    { path: "ptable", component: SchoolTeacherEditorPTableComponent, },
    { path: "**", redirectTo: "" }
  ];

  @NgModule({
    declarations: [
      SchoolTeacherEditorAgGridComponent,
      SchoolTeacherEditorPTableComponent,
      SchoolTeacherEditorFormComponent,


AddressChildEditorAgGridComponent,
AddressChildEditorPTableComponent,
AddressChildEditorFormComponent,
ContactChildEditorAgGridComponent,
ContactChildEditorPTableComponent,
ContactChildEditorFormComponent,



    ],

    exports: [
      SchoolTeacherEditorAgGridComponent,
      SchoolTeacherEditorPTableComponent,
      SchoolTeacherEditorFormComponent,
    ],

    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      EditorHierarchySharedModule,

      StoreModule.forFeature('schoolTeachers', schoolTeacherReducer),
      EffectsModule.forFeature([SchoolTeacherEffects]),

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [SchoolTeacherService, BsModalService, ],
  })
  export class SchoolTeacherModule {}
  