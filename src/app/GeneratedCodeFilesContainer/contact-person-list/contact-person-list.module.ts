

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

  import { ContactPersonListEditorAgGridComponent } from "./editor-aggrid/contact-person-list-editor-aggrid.component";
  import { ContactPersonListEditorPTableComponent } from "./editor-ptable/contact-person-list-editor-ptable.component";
  import { ContactPersonListEditorFormComponent } from "./editor-form/contact-person-list-editor-form.component";

  import { ContactPersonListService } from "./contact-person-list.service";
  import { ContactPersonListEffects, contactPersonListReducer, } from "./contact-person-list.store";
  import { OpenFieldEditorCellRendererComponent, OpenFieldEditorFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputGroupFormControlComponent, BEPInputFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPCheckboxComponent, BEPCheckboxGroupComponent, DataTypeArrayCellRendererComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputBooleanFormControlComponent, BEPInputBooleanGroupFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";

  import { EditorHierarchySharedModule } from "../editor-hierarchy-shared/editor-hierarchy-shared.module";


import { AddressChildEditorAgGridComponent } from "./address/editor-aggrid/address-child-editor-aggrid.component";
import { AddressChildEditorPTableComponent } from "./address/editor-ptable/address-child-editor-ptable.component";
import { AddressChildEditorFormComponent } from "./address/editor-form/address-child-editor-form.component";
import { ContactChildEditorAgGridComponent } from "./contact/editor-aggrid/contact-child-editor-aggrid.component";
import { ContactChildEditorPTableComponent } from "./contact/editor-ptable/contact-child-editor-ptable.component";
import { ContactChildEditorFormComponent } from "./contact/editor-form/contact-child-editor-form.component";
import { ExtensionsChildEditorAgGridComponent } from "./extensions/editor-aggrid/extensions-child-editor-aggrid.component";
import { ExtensionsChildEditorPTableComponent } from "./extensions/editor-ptable/extensions-child-editor-ptable.component";
import { ExtensionsChildEditorFormComponent } from "./extensions/editor-form/extensions-child-editor-form.component";
import { CorrespondencesChildEditorAgGridComponent } from "./correspondences/editor-aggrid/correspondences-child-editor-aggrid.component";
import { CorrespondencesChildEditorPTableComponent } from "./correspondences/editor-ptable/correspondences-child-editor-ptable.component";
import { CorrespondencesChildEditorFormComponent } from "./correspondences/editor-form/correspondences-child-editor-form.component";



  const routes: Routes = [
    { path: "", redirectTo: "list", pathMatch: 'full' },
    { path: "aggrid", component: ContactPersonListEditorAgGridComponent, },
    { path: "ptable", component: ContactPersonListEditorPTableComponent, },
    { path: "**", redirectTo: "" }
  ];

  @NgModule({
    declarations: [
      ContactPersonListEditorAgGridComponent,
      ContactPersonListEditorPTableComponent,
      ContactPersonListEditorFormComponent,


AddressChildEditorAgGridComponent,
AddressChildEditorPTableComponent,
AddressChildEditorFormComponent,
ContactChildEditorAgGridComponent,
ContactChildEditorPTableComponent,
ContactChildEditorFormComponent,
ExtensionsChildEditorAgGridComponent,
ExtensionsChildEditorPTableComponent,
ExtensionsChildEditorFormComponent,
CorrespondencesChildEditorAgGridComponent,
CorrespondencesChildEditorPTableComponent,
CorrespondencesChildEditorFormComponent,



    ],

    exports: [
      ContactPersonListEditorAgGridComponent,
      ContactPersonListEditorPTableComponent,
      ContactPersonListEditorFormComponent,
    ],

    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      EditorHierarchySharedModule,

      StoreModule.forFeature('contactPersonLists', contactPersonListReducer),
      EffectsModule.forFeature([ContactPersonListEffects]),

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [ContactPersonListService, BsModalService, ],
  })
  export class ContactPersonListModule {}
  