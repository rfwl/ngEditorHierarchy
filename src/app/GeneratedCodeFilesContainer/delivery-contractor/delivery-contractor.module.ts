

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

  import { DeliveryContractorEditorAgGridComponent } from "./editor-aggrid/delivery-contractor-editor-aggrid.component";
  import { DeliveryContractorEditorPTableComponent } from "./editor-ptable/delivery-contractor-editor-ptable.component";
  import { DeliveryContractorEditorFormComponent } from "./editor-form/delivery-contractor-editor-form.component";

  import { DeliveryContractorService } from "./delivery-contractor.service";
  import { DeliveryContractorEffects, deliveryContractorReducer, } from "./delivery-contractor.store";
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
    { path: "aggrid", component: DeliveryContractorEditorAgGridComponent, },
    { path: "ptable", component: DeliveryContractorEditorPTableComponent, },
    { path: "**", redirectTo: "" }
  ];

  @NgModule({
    declarations: [
      DeliveryContractorEditorAgGridComponent,
      DeliveryContractorEditorPTableComponent,
      DeliveryContractorEditorFormComponent,


AddressChildEditorAgGridComponent,
AddressChildEditorPTableComponent,
AddressChildEditorFormComponent,



    ],

    exports: [
      DeliveryContractorEditorAgGridComponent,
      DeliveryContractorEditorPTableComponent,
      DeliveryContractorEditorFormComponent,
    ],

    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      EditorHierarchySharedModule,

      StoreModule.forFeature('deliveryContractors', deliveryContractorReducer),
      EffectsModule.forFeature([DeliveryContractorEffects]),

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [DeliveryContractorService, BsModalService, ],
  })
  export class DeliveryContractorModule {}
  