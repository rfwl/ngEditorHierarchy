

  import { NgModule } from "@angular/core";
  import { CommonModule } from "@angular/common";
  import { FormsModule } from '@angular/forms'
  import { ReactiveFormsModule } from '@angular/forms'
  import { RouterModule, Routes } from "@angular/router";
  import { HttpClientModule } from "@angular/common/http";

  import { ModalModule } from 'ngx-bootstrap/modal';
  import { BsModalService } from 'ngx-bootstrap/modal';
  import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

  import { AgGridModule } from 'ag-grid-angular'
  import { TableModule } from 'primeng/table'

  import { OpenFieldEditorCellRendererComponent, OpenFieldEditorFormControlComponent } from "./editor-hierarchy-shared.component";
  import { BEPInputGroupFormControlComponent, BEPInputFormControlComponent } from "./editor-hierarchy-shared.component";
  import { BEPCheckboxComponent, BEPCheckboxGroupComponent, DataTypeArrayCellRendererComponent } from "./editor-hierarchy-shared.component";
  import { BEPInputBooleanFormControlComponent, BEPInputBooleanGroupFormControlComponent } from "./editor-hierarchy-shared.component";

  const routes: Routes = [
  ];

  @NgModule({
    declarations: [

      OpenFieldEditorCellRendererComponent,
      OpenFieldEditorFormControlComponent,
      BEPInputFormControlComponent,
      BEPInputGroupFormControlComponent,
      BEPInputBooleanFormControlComponent,
      BEPInputBooleanGroupFormControlComponent,
      BEPCheckboxComponent,
      BEPCheckboxGroupComponent,
      DataTypeArrayCellRendererComponent

    ],

    exports: [

      OpenFieldEditorCellRendererComponent,
      OpenFieldEditorFormControlComponent,
      BEPInputFormControlComponent,
      BEPInputGroupFormControlComponent,
      BEPInputBooleanFormControlComponent,
      BEPInputBooleanGroupFormControlComponent,
      BEPCheckboxComponent,
      BEPCheckboxGroupComponent,
      DataTypeArrayCellRendererComponent

    ],

    imports: [

      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [BsModalService],
  })
  export class EditorHierarchySharedModule {}

  