

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

  import { SchoolRoomEditorAgGridComponent } from "./editor-aggrid/school-room-editor-aggrid.component";
  import { SchoolRoomEditorPTableComponent } from "./editor-ptable/school-room-editor-ptable.component";
  import { SchoolRoomEditorFormComponent } from "./editor-form/school-room-editor-form.component";

  import { SchoolRoomService } from "./school-room.service";
  import { SchoolRoomEffects, schoolRoomReducer, } from "./school-room.store";
  import { OpenFieldEditorCellRendererComponent, OpenFieldEditorFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputGroupFormControlComponent, BEPInputFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPCheckboxComponent, BEPCheckboxGroupComponent, DataTypeArrayCellRendererComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputBooleanFormControlComponent, BEPInputBooleanGroupFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";

  import { EditorHierarchySharedModule } from "../editor-hierarchy-shared/editor-hierarchy-shared.module";





  const routes: Routes = [
    { path: "", redirectTo: "list", pathMatch: 'full' },
    { path: "aggrid", component: SchoolRoomEditorAgGridComponent, },
    { path: "ptable", component: SchoolRoomEditorPTableComponent, },
    { path: "**", redirectTo: "" }
  ];

  @NgModule({
    declarations: [
      SchoolRoomEditorAgGridComponent,
      SchoolRoomEditorPTableComponent,
      SchoolRoomEditorFormComponent,





    ],

    exports: [
      SchoolRoomEditorAgGridComponent,
      SchoolRoomEditorPTableComponent,
      SchoolRoomEditorFormComponent,
    ],

    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      EditorHierarchySharedModule,

      StoreModule.forFeature('schoolRooms', schoolRoomReducer),
      EffectsModule.forFeature([SchoolRoomEffects]),

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [SchoolRoomService, BsModalService, ],
  })
  export class SchoolRoomModule {}
  