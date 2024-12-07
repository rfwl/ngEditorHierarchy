

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

  import { DeliveryStoreEditorAgGridComponent } from "./editor-aggrid/delivery-store-editor-aggrid.component";
  import { DeliveryStoreEditorPTableComponent } from "./editor-ptable/delivery-store-editor-ptable.component";
  import { DeliveryStoreEditorFormComponent } from "./editor-form/delivery-store-editor-form.component";

  import { DeliveryStoreService } from "./delivery-store.service";
  import { DeliveryStoreEffects, deliveryStoreReducer, } from "./delivery-store.store";
  import { OpenFieldEditorCellRendererComponent, OpenFieldEditorFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputGroupFormControlComponent, BEPInputFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPCheckboxComponent, BEPCheckboxGroupComponent, DataTypeArrayCellRendererComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputBooleanFormControlComponent, BEPInputBooleanGroupFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";

  import { EditorHierarchySharedModule } from "../editor-hierarchy-shared/editor-hierarchy-shared.module";


import { AddressChildEditorAgGridComponent } from "./address/editor-aggrid/address-child-editor-aggrid.component";
import { AddressChildEditorPTableComponent } from "./address/editor-ptable/address-child-editor-ptable.component";
import { AddressChildEditorFormComponent } from "./address/editor-form/address-child-editor-form.component";



  const routes: Routes = [
    { path: "", redirectTo: "list", pathMatch: 'full' },
    { path: "aggrid", component: DeliveryStoreEditorAgGridComponent, },
    { path: "ptable", component: DeliveryStoreEditorPTableComponent, },
    { path: "**", redirectTo: "" }
  ];

  @NgModule({
    declarations: [
      DeliveryStoreEditorAgGridComponent,
      DeliveryStoreEditorPTableComponent,
      DeliveryStoreEditorFormComponent,


AddressChildEditorAgGridComponent,
AddressChildEditorPTableComponent,
AddressChildEditorFormComponent,



    ],

    exports: [
      DeliveryStoreEditorAgGridComponent,
      DeliveryStoreEditorPTableComponent,
      DeliveryStoreEditorFormComponent,
    ],

    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      EditorHierarchySharedModule,

      StoreModule.forFeature('deliveryStores', deliveryStoreReducer),
      EffectsModule.forFeature([DeliveryStoreEffects]),

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [DeliveryStoreService, BsModalService, ],
  })
  export class DeliveryStoreModule {}
  