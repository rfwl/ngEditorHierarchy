

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

  import { DeliveryProductEditorAgGridComponent } from "./editor-aggrid/delivery-product-editor-aggrid.component";
  import { DeliveryProductEditorPTableComponent } from "./editor-ptable/delivery-product-editor-ptable.component";
  import { DeliveryProductEditorFormComponent } from "./editor-form/delivery-product-editor-form.component";

  import { DeliveryProductService } from "./delivery-product.service";
  import { DeliveryProductEffects, deliveryProductReducer, } from "./delivery-product.store";
  import { OpenFieldEditorCellRendererComponent, OpenFieldEditorFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputGroupFormControlComponent, BEPInputFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPCheckboxComponent, BEPCheckboxGroupComponent, DataTypeArrayCellRendererComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputBooleanFormControlComponent, BEPInputBooleanGroupFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";

  import { EditorHierarchySharedModule } from "../editor-hierarchy-shared/editor-hierarchy-shared.module";


import { SpecificationsChildEditorAgGridComponent } from "./specifications/editor-aggrid/specifications-child-editor-aggrid.component";
import { SpecificationsChildEditorPTableComponent } from "./specifications/editor-ptable/specifications-child-editor-ptable.component";
import { SpecificationsChildEditorFormComponent } from "./specifications/editor-form/specifications-child-editor-form.component";



  const routes: Routes = [
    { path: "", redirectTo: "list", pathMatch: 'full' },
    { path: "aggrid", component: DeliveryProductEditorAgGridComponent, },
    { path: "ptable", component: DeliveryProductEditorPTableComponent, },
    { path: "**", redirectTo: "" }
  ];

  @NgModule({
    declarations: [
      DeliveryProductEditorAgGridComponent,
      DeliveryProductEditorPTableComponent,
      DeliveryProductEditorFormComponent,


SpecificationsChildEditorAgGridComponent,
SpecificationsChildEditorPTableComponent,
SpecificationsChildEditorFormComponent,



    ],

    exports: [
      DeliveryProductEditorAgGridComponent,
      DeliveryProductEditorPTableComponent,
      DeliveryProductEditorFormComponent,
    ],

    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      EditorHierarchySharedModule,

      StoreModule.forFeature('deliveryProducts', deliveryProductReducer),
      EffectsModule.forFeature([DeliveryProductEffects]),

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [DeliveryProductService, BsModalService, ],
  })
  export class DeliveryProductModule {}
  