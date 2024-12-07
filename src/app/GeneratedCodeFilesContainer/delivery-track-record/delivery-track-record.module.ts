

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

  import { DeliveryTrackRecordEditorAgGridComponent } from "./editor-aggrid/delivery-track-record-editor-aggrid.component";
  import { DeliveryTrackRecordEditorPTableComponent } from "./editor-ptable/delivery-track-record-editor-ptable.component";
  import { DeliveryTrackRecordEditorFormComponent } from "./editor-form/delivery-track-record-editor-form.component";

  import { DeliveryTrackRecordService } from "./delivery-track-record.service";
  import { DeliveryTrackRecordEffects, deliveryTrackRecordReducer, } from "./delivery-track-record.store";
  import { OpenFieldEditorCellRendererComponent, OpenFieldEditorFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputGroupFormControlComponent, BEPInputFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPCheckboxComponent, BEPCheckboxGroupComponent, DataTypeArrayCellRendererComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputBooleanFormControlComponent, BEPInputBooleanGroupFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";

  import { EditorHierarchySharedModule } from "../editor-hierarchy-shared/editor-hierarchy-shared.module";


import { CustomerChildEditorAgGridComponent } from "./customer/editor-aggrid/customer-child-editor-aggrid.component";
import { CustomerChildEditorPTableComponent } from "./customer/editor-ptable/customer-child-editor-ptable.component";
import { CustomerChildEditorFormComponent } from "./customer/editor-form/customer-child-editor-form.component";
import { AddressChildEditorAgGridComponent } from "./address/editor-aggrid/address-child-editor-aggrid.component";
import { AddressChildEditorPTableComponent } from "./address/editor-ptable/address-child-editor-ptable.component";
import { AddressChildEditorFormComponent } from "./address/editor-form/address-child-editor-form.component";



  const routes: Routes = [
    { path: "", redirectTo: "list", pathMatch: 'full' },
    { path: "aggrid", component: DeliveryTrackRecordEditorAgGridComponent, },
    { path: "ptable", component: DeliveryTrackRecordEditorPTableComponent, },
    { path: "**", redirectTo: "" }
  ];

  @NgModule({
    declarations: [
      DeliveryTrackRecordEditorAgGridComponent,
      DeliveryTrackRecordEditorPTableComponent,
      DeliveryTrackRecordEditorFormComponent,


CustomerChildEditorAgGridComponent,
CustomerChildEditorPTableComponent,
CustomerChildEditorFormComponent,
AddressChildEditorAgGridComponent,
AddressChildEditorPTableComponent,
AddressChildEditorFormComponent,



    ],

    exports: [
      DeliveryTrackRecordEditorAgGridComponent,
      DeliveryTrackRecordEditorPTableComponent,
      DeliveryTrackRecordEditorFormComponent,
    ],

    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      EditorHierarchySharedModule,

      StoreModule.forFeature('deliveryTrackRecords', deliveryTrackRecordReducer),
      EffectsModule.forFeature([DeliveryTrackRecordEffects]),

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [DeliveryTrackRecordService, BsModalService, ],
  })
  export class DeliveryTrackRecordModule {}
  