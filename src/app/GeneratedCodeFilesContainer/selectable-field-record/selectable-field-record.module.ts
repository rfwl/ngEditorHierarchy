

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

  import { SelectableFieldRecordEditorAgGridComponent } from "./editor-aggrid/selectable-field-record-editor-aggrid.component";
  import { SelectableFieldRecordEditorPTableComponent } from "./editor-ptable/selectable-field-record-editor-ptable.component";
  import { SelectableFieldRecordEditorFormComponent } from "./editor-form/selectable-field-record-editor-form.component";

  import { SelectableFieldRecordService } from "./selectable-field-record.service";
  import { SelectableFieldRecordEffects, selectableFieldRecordReducer, } from "./selectable-field-record.store";
  import { OpenFieldEditorCellRendererComponent, OpenFieldEditorFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputGroupFormControlComponent, BEPInputFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPCheckboxComponent, BEPCheckboxGroupComponent, DataTypeArrayCellRendererComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputBooleanFormControlComponent, BEPInputBooleanGroupFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";

  import { EditorHierarchySharedModule } from "../editor-hierarchy-shared/editor-hierarchy-shared.module";


import { NumberValueChildEditorAgGridComponent } from "./number-value/editor-aggrid/number-value-child-editor-aggrid.component";
import { NumberValueChildEditorPTableComponent } from "./number-value/editor-ptable/number-value-child-editor-ptable.component";
import { NumberValueChildEditorFormComponent } from "./number-value/editor-form/number-value-child-editor-form.component";
import { StringValueChildEditorAgGridComponent } from "./string-value/editor-aggrid/string-value-child-editor-aggrid.component";
import { StringValueChildEditorPTableComponent } from "./string-value/editor-ptable/string-value-child-editor-ptable.component";
import { StringValueChildEditorFormComponent } from "./string-value/editor-form/string-value-child-editor-form.component";
import { NumberArrayChildEditorAgGridComponent } from "./number-array/editor-aggrid/number-array-child-editor-aggrid.component";
import { NumberArrayChildEditorPTableComponent } from "./number-array/editor-ptable/number-array-child-editor-ptable.component";
import { NumberArrayChildEditorFormComponent } from "./number-array/editor-form/number-array-child-editor-form.component";
import { StringArrayChildEditorAgGridComponent } from "./string-array/editor-aggrid/string-array-child-editor-aggrid.component";
import { StringArrayChildEditorPTableComponent } from "./string-array/editor-ptable/string-array-child-editor-ptable.component";
import { StringArrayChildEditorFormComponent } from "./string-array/editor-form/string-array-child-editor-form.component";



  const routes: Routes = [
    { path: "", redirectTo: "list", pathMatch: 'full' },
    { path: "aggrid", component: SelectableFieldRecordEditorAgGridComponent, },
    { path: "ptable", component: SelectableFieldRecordEditorPTableComponent, },
    { path: "**", redirectTo: "" }
  ];

  @NgModule({
    declarations: [
      SelectableFieldRecordEditorAgGridComponent,
      SelectableFieldRecordEditorPTableComponent,
      SelectableFieldRecordEditorFormComponent,


NumberValueChildEditorAgGridComponent,
NumberValueChildEditorPTableComponent,
NumberValueChildEditorFormComponent,
StringValueChildEditorAgGridComponent,
StringValueChildEditorPTableComponent,
StringValueChildEditorFormComponent,
NumberArrayChildEditorAgGridComponent,
NumberArrayChildEditorPTableComponent,
NumberArrayChildEditorFormComponent,
StringArrayChildEditorAgGridComponent,
StringArrayChildEditorPTableComponent,
StringArrayChildEditorFormComponent,



    ],

    exports: [
      SelectableFieldRecordEditorAgGridComponent,
      SelectableFieldRecordEditorPTableComponent,
      SelectableFieldRecordEditorFormComponent,
    ],

    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      EditorHierarchySharedModule,

      StoreModule.forFeature('selectableFieldRecords', selectableFieldRecordReducer),
      EffectsModule.forFeature([SelectableFieldRecordEffects]),

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [SelectableFieldRecordService, BsModalService, ],
  })
  export class SelectableFieldRecordModule {}
  