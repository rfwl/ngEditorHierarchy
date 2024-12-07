

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

  import { SelectableOptionRecordEditorAgGridComponent } from "./editor-aggrid/selectable-option-record-editor-aggrid.component";
  import { SelectableOptionRecordEditorPTableComponent } from "./editor-ptable/selectable-option-record-editor-ptable.component";
  import { SelectableOptionRecordEditorFormComponent } from "./editor-form/selectable-option-record-editor-form.component";

  import { SelectableOptionRecordService } from "./selectable-option-record.service";
  import { SelectableOptionRecordEffects, selectableOptionRecordReducer, } from "./selectable-option-record.store";
  import { OpenFieldEditorCellRendererComponent, OpenFieldEditorFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputGroupFormControlComponent, BEPInputFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPCheckboxComponent, BEPCheckboxGroupComponent, DataTypeArrayCellRendererComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputBooleanFormControlComponent, BEPInputBooleanGroupFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";

  import { EditorHierarchySharedModule } from "../editor-hierarchy-shared/editor-hierarchy-shared.module";





  const routes: Routes = [
    { path: "", redirectTo: "list", pathMatch: 'full' },
    { path: "aggrid", component: SelectableOptionRecordEditorAgGridComponent, },
    { path: "ptable", component: SelectableOptionRecordEditorPTableComponent, },
    { path: "**", redirectTo: "" }
  ];

  @NgModule({
    declarations: [
      SelectableOptionRecordEditorAgGridComponent,
      SelectableOptionRecordEditorPTableComponent,
      SelectableOptionRecordEditorFormComponent,





    ],

    exports: [
      SelectableOptionRecordEditorAgGridComponent,
      SelectableOptionRecordEditorPTableComponent,
      SelectableOptionRecordEditorFormComponent,
    ],

    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      EditorHierarchySharedModule,

      StoreModule.forFeature('selectableOptionRecords', selectableOptionRecordReducer),
      EffectsModule.forFeature([SelectableOptionRecordEffects]),

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [SelectableOptionRecordService, BsModalService, ],
  })
  export class SelectableOptionRecordModule {}
  