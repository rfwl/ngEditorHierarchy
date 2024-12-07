

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

  import { AllSimpleDataTypesRecordEditorAgGridComponent } from "./editor-aggrid/all-simple-data-types-record-editor-aggrid.component";
  import { AllSimpleDataTypesRecordEditorPTableComponent } from "./editor-ptable/all-simple-data-types-record-editor-ptable.component";
  import { AllSimpleDataTypesRecordEditorFormComponent } from "./editor-form/all-simple-data-types-record-editor-form.component";

  import { AllSimpleDataTypesRecordService } from "./all-simple-data-types-record.service";
  import { AllSimpleDataTypesRecordEffects, allSimpleDataTypesRecordReducer, } from "./all-simple-data-types-record.store";
  import { OpenFieldEditorCellRendererComponent, OpenFieldEditorFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputGroupFormControlComponent, BEPInputFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPCheckboxComponent, BEPCheckboxGroupComponent, DataTypeArrayCellRendererComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputBooleanFormControlComponent, BEPInputBooleanGroupFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";

  import { EditorHierarchySharedModule } from "../editor-hierarchy-shared/editor-hierarchy-shared.module";


import { AObjectChildEditorAgGridComponent } from "./a-object/editor-aggrid/a-object-child-editor-aggrid.component";
import { AObjectChildEditorPTableComponent } from "./a-object/editor-ptable/a-object-child-editor-ptable.component";
import { AObjectChildEditorFormComponent } from "./a-object/editor-form/a-object-child-editor-form.component";
import { BObjectChildEditorAgGridComponent } from "./b-object/editor-aggrid/b-object-child-editor-aggrid.component";
import { BObjectChildEditorPTableComponent } from "./b-object/editor-ptable/b-object-child-editor-ptable.component";
import { BObjectChildEditorFormComponent } from "./b-object/editor-form/b-object-child-editor-form.component";
import { BObjectItemChildEditorAgGridComponent } from "./b-object-item/editor-aggrid/b-object-item-child-editor-aggrid.component";
import { BObjectItemChildEditorPTableComponent } from "./b-object-item/editor-ptable/b-object-item-child-editor-ptable.component";
import { BObjectItemChildEditorFormComponent } from "./b-object-item/editor-form/b-object-item-child-editor-form.component";
import { AObjectItemChildEditorAgGridComponent } from "./a-object-item/editor-aggrid/a-object-item-child-editor-aggrid.component";
import { AObjectItemChildEditorPTableComponent } from "./a-object-item/editor-ptable/a-object-item-child-editor-ptable.component";
import { AObjectItemChildEditorFormComponent } from "./a-object-item/editor-form/a-object-item-child-editor-form.component";
import { EObjectChildEditorAgGridComponent } from "./e-object/editor-aggrid/e-object-child-editor-aggrid.component";
import { EObjectChildEditorPTableComponent } from "./e-object/editor-ptable/e-object-child-editor-ptable.component";
import { EObjectChildEditorFormComponent } from "./e-object/editor-form/e-object-child-editor-form.component";
import { EObjectItemChildEditorAgGridComponent } from "./e-object-item/editor-aggrid/e-object-item-child-editor-aggrid.component";
import { EObjectItemChildEditorPTableComponent } from "./e-object-item/editor-ptable/e-object-item-child-editor-ptable.component";
import { EObjectItemChildEditorFormComponent } from "./e-object-item/editor-form/e-object-item-child-editor-form.component";



  const routes: Routes = [
    { path: "", redirectTo: "list", pathMatch: 'full' },
    { path: "aggrid", component: AllSimpleDataTypesRecordEditorAgGridComponent, },
    { path: "ptable", component: AllSimpleDataTypesRecordEditorPTableComponent, },
    { path: "**", redirectTo: "" }
  ];

  @NgModule({
    declarations: [
      AllSimpleDataTypesRecordEditorAgGridComponent,
      AllSimpleDataTypesRecordEditorPTableComponent,
      AllSimpleDataTypesRecordEditorFormComponent,


AObjectChildEditorAgGridComponent,
AObjectChildEditorPTableComponent,
AObjectChildEditorFormComponent,
BObjectChildEditorAgGridComponent,
BObjectChildEditorPTableComponent,
BObjectChildEditorFormComponent,
BObjectItemChildEditorAgGridComponent,
BObjectItemChildEditorPTableComponent,
BObjectItemChildEditorFormComponent,
AObjectItemChildEditorAgGridComponent,
AObjectItemChildEditorPTableComponent,
AObjectItemChildEditorFormComponent,
EObjectChildEditorAgGridComponent,
EObjectChildEditorPTableComponent,
EObjectChildEditorFormComponent,
EObjectItemChildEditorAgGridComponent,
EObjectItemChildEditorPTableComponent,
EObjectItemChildEditorFormComponent,



    ],

    exports: [
      AllSimpleDataTypesRecordEditorAgGridComponent,
      AllSimpleDataTypesRecordEditorPTableComponent,
      AllSimpleDataTypesRecordEditorFormComponent,
    ],

    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      EditorHierarchySharedModule,

      StoreModule.forFeature('allSimpleDataTypesRecords', allSimpleDataTypesRecordReducer),
      EffectsModule.forFeature([AllSimpleDataTypesRecordEffects]),

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [AllSimpleDataTypesRecordService, BsModalService, ],
  })
  export class AllSimpleDataTypesRecordModule {}
  