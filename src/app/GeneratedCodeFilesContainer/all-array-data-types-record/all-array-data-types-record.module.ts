

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

  import { AllArrayDataTypesRecordEditorAgGridComponent } from "./editor-aggrid/all-array-data-types-record-editor-aggrid.component";
  import { AllArrayDataTypesRecordEditorPTableComponent } from "./editor-ptable/all-array-data-types-record-editor-ptable.component";
  import { AllArrayDataTypesRecordEditorFormComponent } from "./editor-form/all-array-data-types-record-editor-form.component";

  import { AllArrayDataTypesRecordService } from "./all-array-data-types-record.service";
  import { AllArrayDataTypesRecordEffects, allArrayDataTypesRecordReducer, } from "./all-array-data-types-record.store";
  import { OpenFieldEditorCellRendererComponent, OpenFieldEditorFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputGroupFormControlComponent, BEPInputFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPCheckboxComponent, BEPCheckboxGroupComponent, DataTypeArrayCellRendererComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputBooleanFormControlComponent, BEPInputBooleanGroupFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";

  import { EditorHierarchySharedModule } from "../editor-hierarchy-shared/editor-hierarchy-shared.module";


import { AArrayChildEditorAgGridComponent } from "./a-array/editor-aggrid/a-array-child-editor-aggrid.component";
import { AArrayChildEditorPTableComponent } from "./a-array/editor-ptable/a-array-child-editor-ptable.component";
import { AArrayChildEditorFormComponent } from "./a-array/editor-form/a-array-child-editor-form.component";
import { AArrayItemChildEditorAgGridComponent } from "./a-array-item/editor-aggrid/a-array-item-child-editor-aggrid.component";
import { AArrayItemChildEditorPTableComponent } from "./a-array-item/editor-ptable/a-array-item-child-editor-ptable.component";
import { AArrayItemChildEditorFormComponent } from "./a-array-item/editor-form/a-array-item-child-editor-form.component";



  const routes: Routes = [
    { path: "", redirectTo: "list", pathMatch: 'full' },
    { path: "aggrid", component: AllArrayDataTypesRecordEditorAgGridComponent, },
    { path: "ptable", component: AllArrayDataTypesRecordEditorPTableComponent, },
    { path: "**", redirectTo: "" }
  ];

  @NgModule({
    declarations: [
      AllArrayDataTypesRecordEditorAgGridComponent,
      AllArrayDataTypesRecordEditorPTableComponent,
      AllArrayDataTypesRecordEditorFormComponent,


AArrayChildEditorAgGridComponent,
AArrayChildEditorPTableComponent,
AArrayChildEditorFormComponent,
AArrayItemChildEditorAgGridComponent,
AArrayItemChildEditorPTableComponent,
AArrayItemChildEditorFormComponent,



    ],

    exports: [
      AllArrayDataTypesRecordEditorAgGridComponent,
      AllArrayDataTypesRecordEditorPTableComponent,
      AllArrayDataTypesRecordEditorFormComponent,
    ],

    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      EditorHierarchySharedModule,

      StoreModule.forFeature('allArrayDataTypesRecords', allArrayDataTypesRecordReducer),
      EffectsModule.forFeature([AllArrayDataTypesRecordEffects]),

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [AllArrayDataTypesRecordService, BsModalService, ],
  })
  export class AllArrayDataTypesRecordModule {}
  