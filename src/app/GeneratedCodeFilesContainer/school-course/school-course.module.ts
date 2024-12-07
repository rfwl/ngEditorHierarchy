

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

  import { SchoolCourseEditorAgGridComponent } from "./editor-aggrid/school-course-editor-aggrid.component";
  import { SchoolCourseEditorPTableComponent } from "./editor-ptable/school-course-editor-ptable.component";
  import { SchoolCourseEditorFormComponent } from "./editor-form/school-course-editor-form.component";

  import { SchoolCourseService } from "./school-course.service";
  import { SchoolCourseEffects, schoolCourseReducer, } from "./school-course.store";
  import { OpenFieldEditorCellRendererComponent, OpenFieldEditorFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputGroupFormControlComponent, BEPInputFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPCheckboxComponent, BEPCheckboxGroupComponent, DataTypeArrayCellRendererComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputBooleanFormControlComponent, BEPInputBooleanGroupFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";

  import { EditorHierarchySharedModule } from "../editor-hierarchy-shared/editor-hierarchy-shared.module";





  const routes: Routes = [
    { path: "", redirectTo: "list", pathMatch: 'full' },
    { path: "aggrid", component: SchoolCourseEditorAgGridComponent, },
    { path: "ptable", component: SchoolCourseEditorPTableComponent, },
    { path: "**", redirectTo: "" }
  ];

  @NgModule({
    declarations: [
      SchoolCourseEditorAgGridComponent,
      SchoolCourseEditorPTableComponent,
      SchoolCourseEditorFormComponent,





    ],

    exports: [
      SchoolCourseEditorAgGridComponent,
      SchoolCourseEditorPTableComponent,
      SchoolCourseEditorFormComponent,
    ],

    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      EditorHierarchySharedModule,

      StoreModule.forFeature('schoolCourses', schoolCourseReducer),
      EffectsModule.forFeature([SchoolCourseEffects]),

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [SchoolCourseService, BsModalService, ],
  })
  export class SchoolCourseModule {}
  