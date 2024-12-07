

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

  import { ProjectDiaryRecordEditorAgGridComponent } from "./editor-aggrid/project-diary-record-editor-aggrid.component";
  import { ProjectDiaryRecordEditorPTableComponent } from "./editor-ptable/project-diary-record-editor-ptable.component";
  import { ProjectDiaryRecordEditorFormComponent } from "./editor-form/project-diary-record-editor-form.component";

  import { ProjectDiaryRecordService } from "./project-diary-record.service";
  import { ProjectDiaryRecordEffects, projectDiaryRecordReducer, } from "./project-diary-record.store";
  import { OpenFieldEditorCellRendererComponent, OpenFieldEditorFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputGroupFormControlComponent, BEPInputFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPCheckboxComponent, BEPCheckboxGroupComponent, DataTypeArrayCellRendererComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputBooleanFormControlComponent, BEPInputBooleanGroupFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";

  import { EditorHierarchySharedModule } from "../editor-hierarchy-shared/editor-hierarchy-shared.module";


import { CodeNameDescriptionChildEditorAgGridComponent } from "./code-name-description/editor-aggrid/code-name-description-child-editor-aggrid.component";
import { CodeNameDescriptionChildEditorPTableComponent } from "./code-name-description/editor-ptable/code-name-description-child-editor-ptable.component";
import { CodeNameDescriptionChildEditorFormComponent } from "./code-name-description/editor-form/code-name-description-child-editor-form.component";
import { ProjectFeatureChildEditorAgGridComponent } from "./project-feature/editor-aggrid/project-feature-child-editor-aggrid.component";
import { ProjectFeatureChildEditorPTableComponent } from "./project-feature/editor-ptable/project-feature-child-editor-ptable.component";
import { ProjectFeatureChildEditorFormComponent } from "./project-feature/editor-form/project-feature-child-editor-form.component";
import { ProjectApproachChildEditorAgGridComponent } from "./project-approach/editor-aggrid/project-approach-child-editor-aggrid.component";
import { ProjectApproachChildEditorPTableComponent } from "./project-approach/editor-ptable/project-approach-child-editor-ptable.component";
import { ProjectApproachChildEditorFormComponent } from "./project-approach/editor-form/project-approach-child-editor-form.component";
import { ProjectTaskChildEditorAgGridComponent } from "./project-task/editor-aggrid/project-task-child-editor-aggrid.component";
import { ProjectTaskChildEditorPTableComponent } from "./project-task/editor-ptable/project-task-child-editor-ptable.component";
import { ProjectTaskChildEditorFormComponent } from "./project-task/editor-form/project-task-child-editor-form.component";
import { ProjectIssueChildEditorAgGridComponent } from "./project-issue/editor-aggrid/project-issue-child-editor-aggrid.component";
import { ProjectIssueChildEditorPTableComponent } from "./project-issue/editor-ptable/project-issue-child-editor-ptable.component";
import { ProjectIssueChildEditorFormComponent } from "./project-issue/editor-form/project-issue-child-editor-form.component";
import { ProjectBugChildEditorAgGridComponent } from "./project-bug/editor-aggrid/project-bug-child-editor-aggrid.component";
import { ProjectBugChildEditorPTableComponent } from "./project-bug/editor-ptable/project-bug-child-editor-ptable.component";
import { ProjectBugChildEditorFormComponent } from "./project-bug/editor-form/project-bug-child-editor-form.component";
import { ProjectReferenceChildEditorAgGridComponent } from "./project-reference/editor-aggrid/project-reference-child-editor-aggrid.component";
import { ProjectReferenceChildEditorPTableComponent } from "./project-reference/editor-ptable/project-reference-child-editor-ptable.component";
import { ProjectReferenceChildEditorFormComponent } from "./project-reference/editor-form/project-reference-child-editor-form.component";



  const routes: Routes = [
    { path: "", redirectTo: "list", pathMatch: 'full' },
    { path: "aggrid", component: ProjectDiaryRecordEditorAgGridComponent, },
    { path: "ptable", component: ProjectDiaryRecordEditorPTableComponent, },
    { path: "**", redirectTo: "" }
  ];

  @NgModule({
    declarations: [
      ProjectDiaryRecordEditorAgGridComponent,
      ProjectDiaryRecordEditorPTableComponent,
      ProjectDiaryRecordEditorFormComponent,


CodeNameDescriptionChildEditorAgGridComponent,
CodeNameDescriptionChildEditorPTableComponent,
CodeNameDescriptionChildEditorFormComponent,
ProjectFeatureChildEditorAgGridComponent,
ProjectFeatureChildEditorPTableComponent,
ProjectFeatureChildEditorFormComponent,
ProjectApproachChildEditorAgGridComponent,
ProjectApproachChildEditorPTableComponent,
ProjectApproachChildEditorFormComponent,
ProjectTaskChildEditorAgGridComponent,
ProjectTaskChildEditorPTableComponent,
ProjectTaskChildEditorFormComponent,
ProjectIssueChildEditorAgGridComponent,
ProjectIssueChildEditorPTableComponent,
ProjectIssueChildEditorFormComponent,
ProjectBugChildEditorAgGridComponent,
ProjectBugChildEditorPTableComponent,
ProjectBugChildEditorFormComponent,
ProjectReferenceChildEditorAgGridComponent,
ProjectReferenceChildEditorPTableComponent,
ProjectReferenceChildEditorFormComponent,



    ],

    exports: [
      ProjectDiaryRecordEditorAgGridComponent,
      ProjectDiaryRecordEditorPTableComponent,
      ProjectDiaryRecordEditorFormComponent,
    ],

    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      EditorHierarchySharedModule,

      StoreModule.forFeature('projectDiaryRecords', projectDiaryRecordReducer),
      EffectsModule.forFeature([ProjectDiaryRecordEffects]),

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [ProjectDiaryRecordService, BsModalService, ],
  })
  export class ProjectDiaryRecordModule {}
  