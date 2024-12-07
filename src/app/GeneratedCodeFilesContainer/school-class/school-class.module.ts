

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

  import { SchoolClassEditorAgGridComponent } from "./editor-aggrid/school-class-editor-aggrid.component";
  import { SchoolClassEditorPTableComponent } from "./editor-ptable/school-class-editor-ptable.component";
  import { SchoolClassEditorFormComponent } from "./editor-form/school-class-editor-form.component";

  import { SchoolClassService } from "./school-class.service";
  import { SchoolClassEffects, schoolClassReducer, } from "./school-class.store";
  import { OpenFieldEditorCellRendererComponent, OpenFieldEditorFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputGroupFormControlComponent, BEPInputFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPCheckboxComponent, BEPCheckboxGroupComponent, DataTypeArrayCellRendererComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputBooleanFormControlComponent, BEPInputBooleanGroupFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";

  import { EditorHierarchySharedModule } from "../editor-hierarchy-shared/editor-hierarchy-shared.module";





  const routes: Routes = [
    { path: "", redirectTo: "list", pathMatch: 'full' },
    { path: "aggrid", component: SchoolClassEditorAgGridComponent, },
    { path: "ptable", component: SchoolClassEditorPTableComponent, },
    { path: "**", redirectTo: "" }
  ];

  @NgModule({
    declarations: [
      SchoolClassEditorAgGridComponent,
      SchoolClassEditorPTableComponent,
      SchoolClassEditorFormComponent,





    ],

    exports: [
      SchoolClassEditorAgGridComponent,
      SchoolClassEditorPTableComponent,
      SchoolClassEditorFormComponent,
    ],

    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      EditorHierarchySharedModule,

      StoreModule.forFeature('schoolClasses', schoolClassReducer),
      EffectsModule.forFeature([SchoolClassEffects]),

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [SchoolClassService, BsModalService, ],
  })
  export class SchoolClassModule {}
  