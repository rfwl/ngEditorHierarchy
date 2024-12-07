

  import { Component, OnInit, inject } from '@angular/core'
  import { FormBuilder, FormGroup, Validators } from '@angular/forms'
  import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal'
  import { select, Store } from '@ngrx/store'
  import { Update } from '@ngrx/entity'
  import { Firestore, collection, doc } from '@angular/fire/firestore'

  import { EnumEditorOperationType, show_CodeOutput_Modal, predefinedLableFunctionContainer } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'
  import { make_undefined_to_null, copy_properties_from_object1_to_object2, deepClone } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'
  import { selectorOption_Arrays_Json_String } from '../../editor-hierarchy-shared/editor-hierarchy-shared.constants'

  import { DeliveryTrackRecord, Enum_EditorComponent_Type } from '../delivery-track-record.model'
  import { EnumSelectorOptionSource } from '../delivery-track-record.model'

import { CustomerChildEditorFormComponent } from "../customer/editor-form/customer-child-editor-form.component";

import { AddressChildEditorFormComponent } from "../address/editor-form/address-child-editor-form.component";




import { DeliveryProductActionTypes, selectAllDeliveryProducts } from '../../delivery-product/delivery-product.store'
import { DeliveryProduct } from '../../delivery-product/delivery-product.model'

import { DeliveryStoreActionTypes, selectAllDeliveryStores } from '../../delivery-store/delivery-store.store'
import { DeliveryStore } from '../../delivery-store/delivery-store.model'

import { DeliveryContractorActionTypes, selectAllDeliveryContractors } from '../../delivery-contractor/delivery-contractor.store'
import { DeliveryContractor } from '../../delivery-contractor/delivery-contractor.model'


  @Component({
    selector: "delivery-track-record-editor-form", 
templateUrl: './delivery-track-record-editor-form.component.html', 

styleUrls: ['./delivery-track-record-editor-form.component.scss'] 

}) 


  export class DeliveryTrackRecordEditorFormComponent implements OnInit {
    firestore: Firestore
    labelValue_Array: any
    selectorOptionArraysJsonString: string
    selectorOptionArraysObject: any
    predefinedLableFunctionContainerInstance: any = predefinedLableFunctionContainer

    //#region Main

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private modalService: BsModalService,
      private store: Store
      ){
        this.firestore = inject(Firestore)
        this.selectorOptionArraysJsonString = selectorOption_Arrays_Json_String
        this.selectorOptionArraysObject = undefined
        try{
          this.selectorOptionArraysObject = JSON.parse(this.selectorOptionArraysJsonString)
        } catch(_){}

    }

Product_DeliveryProduct_Options: any[] =[]
Store_DeliveryStore_Options: any[] =[]
Contractor_DeliveryContractor_Options: any[] =[]


    ngOnInit() {

      this.initEditorForm()


try {
  this.store.dispatch(DeliveryProductActionTypes.loadDeliveryProducts())
  this.store.pipe(select(selectAllDeliveryProducts)).subscribe (entLst => {
    this.Product_DeliveryProduct_Options = entLst.map<DeliveryProduct>(ent => {
      try {
        let ent1 = deepClone(ent)
        return DeliveryProduct.createFrom(ent1)
      } catch(_){ return null}
    })

  })
} catch(_){}
    
try {
  this.store.dispatch(DeliveryStoreActionTypes.loadDeliveryStores())
  this.store.pipe(select(selectAllDeliveryStores)).subscribe (entLst => {
    this.Store_DeliveryStore_Options = entLst.map<DeliveryStore>(ent => {
      try {
        let ent1 = deepClone(ent)
        return DeliveryStore.createFrom(ent1)
      } catch(_){ return null}
    })

  })
} catch(_){}
    
try {
  this.store.dispatch(DeliveryContractorActionTypes.loadDeliveryContractors())
  this.store.pipe(select(selectAllDeliveryContractors)).subscribe (entLst => {
    this.Contractor_DeliveryContractor_Options = entLst.map<DeliveryContractor>(ent => {
      try {
        let ent1 = deepClone(ent)
        return DeliveryContractor.createFrom(ent1)
      } catch(_){ return null}
    })

  })
} catch(_){}
    

    }

    ngAfterViewInit(){

    }

    hideEditorForm(){
      this.editorForm.reset()
      this.bsModalRef.hide()
    }

    outputJsonString(){

      let str = JSON.stringify(this.editorForm.value, null, 4)
      show_CodeOutput_Modal(this.modalService, 'DeliveryTrackRecord', str, 'modal-xl')
    }

    getSelectorOptionArray(ty: string, nm: string): any[]{
      let ary: any[] = []
      if(!this.selectorOptionArraysObject) return ary
      if(ty == EnumSelectorOptionSource.ValueArray && this.selectorOptionArraysObject.valueArrays){
        return this.selectorOptionArraysObject.valueArrays[nm]
      } else if(ty == EnumSelectorOptionSource.LabelledValueArray && this.selectorOptionArraysObject.labelledValueArrays){
        return this.selectorOptionArraysObject.labelledValueArrays[nm]
      } else if(ty == EnumSelectorOptionSource.ObjectArray && this.selectorOptionArraysObject.objectArrays){
        return this.selectorOptionArraysObject.objectArrays[nm]
      }
      return ary
    }



    //#endregion

    //#region Data
    // Fields passed in by initialState from parent container

    isInModal: boolean = true
    parentEditor: any = undefined
    parentOnClosedHandler?: Function
    parentDataObject: any
    parentDataField: string = ''
    parentDataArray: any[]
    parentDataIndex: number = -1
    editorOperationType?: EnumEditorOperationType

    private editedObject: any

    private build_editedObject() {

      if(this.parentDataObject){
        if(this.parentDataField){
          this.editedObject = this.parentDataObject[this.parentDataField]
        } else {
          throw (() => new Error("Cannot find data object to edit"))
        }
      } else if(this.parentDataArray){
        if(this.parentDataIndex >= 0){
          this.editedObject = this.parentDataArray[this.parentDataIndex]
        } else {
          this.editedObject = undefined // Empty parent data array, will create a member
        }
      } else {
        throw(new Error("Cannot find data object to edit"))
      }

      if(!this.editedObject) {
        this.editedObject = {}
        this.editorOperationType = EnumEditorOperationType.Create
      }
    }

    get editorFormTitle(): string{
      switch(this.editorOperationType){
        case EnumEditorOperationType.Create:
          return 'Create DeliveryTrackRecord'
        case EnumEditorOperationType.Delete:
          return 'Delete DeliveryTrackRecord'
        case EnumEditorOperationType.Update:
          return 'Update DeliveryTrackRecord'
        default:
          return 'Edit DeliveryTrackRecord'
      }
    }

    get isToDelete(): boolean{
      switch(this.editorOperationType){
        case EnumEditorOperationType.Create:
          return false
        case EnumEditorOperationType.Delete:
          return true
        case EnumEditorOperationType.Update:
          return false
        default:
          return false
      }
    }

    get submitButtonLabel(): string{
      switch(this.editorOperationType){
        case EnumEditorOperationType.Create:
          return 'Save'
        case EnumEditorOperationType.Delete:
          return 'Delete'
        case EnumEditorOperationType.Update:
          return 'Save'
        default:
          return 'Edit'
      }
    }

    //#endregion

    //#region Init Editor
    agGridThemeName: string = 'ag-theme-alpine-dark'
    editorForm!: FormGroup

    initEditorForm() {

      this.editorForm = this.fb.group({

Product: [''], 
Store: [''], 
Contractor: [''], 
Customer: [''], 
Address: [''], 
StartDateTime: [''], 
Status: [''], 
Comment: [''], 


      })

      this.build_editedObject()
      this.editorForm.patchValue(this.editedObject)

      if(this.isToDelete)
        this.editorForm.disable()

    } //end of function

get Product() { return this.editorForm.get('Product')  }
get Store() { return this.editorForm.get('Store')  }
get Contractor() { return this.editorForm.get('Contractor')  }
get Customer() { return this.editorForm.get('Customer')  }
get Address() { return this.editorForm.get('Address')  }
get StartDateTime() { return this.editorForm.get('StartDateTime')  }
get Status() { return this.editorForm.get('Status')  }
get Comment() { return this.editorForm.get('Comment')  }


    //#endregion

    //#region Cell Child Editors

    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined // unknown component.


else if( fld == "Customer" ) return CustomerChildEditorFormComponent
else if( fld == "Address" ) return AddressChildEditorFormComponent



      return undefined
    }

    childParentDataField: string

    build_paramsShowingEditorForm(fieldCode: string){
      return {
        icon:'box-open',
        display: '',
        tooltip: '',
        parentDataField: fieldCode,
        parentComponent: this,
        parentFunction: this.showChildEditorForm,
      }
    }

    showChildEditorForm(field: string, rowIndex: number = undefined) {
      this.childParentDataField = field
      const config: any = {
        class: 'modal-md' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          isInModal: true,
          parentEditor: this,
          parentOnClosedHandler: this.onClosedChildEditorForm,
          parentDataObject: this.editedObject,
          parentDataField: field,
          parentDataArray: undefined,
          parentDataIndex: undefined,
          editorOperationType: EnumEditorOperationType.Update
        }
      }
      let cmpnt = this.chooseFieleValueEditorComponent(field)
      if(!cmpnt) return
      let modalRef = this.modalService.show(cmpnt, config)
    }

    onClosedChildEditorForm(resultObject: any){
      // Have to save the result object to form control's value.
      // Otherwise, ther editedObject's this field will be overridden in submitForm().
      this.editorForm.get(this.childParentDataField).setValue(resultObject)
    }


    build_paramsShowingEditorGrid(fieldCode: string){
      return {
        icon:'box-open',
        display: '',
        tooltip: '',
        parentComponent: this,
        parentFunction: this.showChildEditorGrid,
        parentDataField: fieldCode
      }
    }

    showChildEditorGrid(field: string, rowIndex: number = undefined) {
      this.childParentDataField = field
      const config: any = {
        class: 'modal-xl' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          isInModal: true,
          parentEditor: this,
          parentOnClosedHandler: this.onClosedChildEditorGrid,
          parentDataObject: this.editedObject,
          parentDataField: field,
          parentDataArray: undefined,
          parentDataIndex: undefined,
          editorOperationType: EnumEditorOperationType.Update
        }
      }
      let cmpnt = this.chooseFieleValueEditorComponent(field)
      if(!cmpnt) return
      let modalRef = this.modalService.show(cmpnt, config)
      }

    onClosedChildEditorGrid(resultObject: any){

      this.editorForm.get(this.childParentDataField).setValue(resultObject)
    }


    //#endregion

    //#region Save, parent/child closed function

    submitEditorForm(editorForm:any){

      copy_properties_from_object1_to_object2(this.editorForm.value,this.editedObject )
      make_undefined_to_null(this.editedObject)

      switch(this.editorOperationType){
        case EnumEditorOperationType.Create:
          this.editedObject.id = doc(collection(this.firestore, '_')).id;
          if(this.parentDataArray)
            this.parentDataArray.push(this.editedObject)
          else if(this.parentDataObject && this.parentDataField)
            this.parentDataObject[this.parentDataField] = this.editedObject

          // moved the next line to Editor AgGrid
          // this.store.dispatch(DeliveryTrackRecordActionTypes.createDeliveryTrackRecord({ deliveryTrackRecord: {...this.editedObject } }))
          break
        case EnumEditorOperationType.Delete:
          if(this.parentDataArray && this.parentDataIndex >= 0){
            this.parentDataArray?.splice(this.parentDataIndex,1)
            // moved the next line to Editor AgGrid
            // this.store.dispatch(DeliveryTrackRecordActionTypes.deleteDeliveryTrackRecord({ deliveryTrackRecordId: this.editedObject.id }))
          }
          break
        case EnumEditorOperationType.Update:
          break
        default:
          break
      }

      if(!this.parentEditor || !this.parentOnClosedHandler) return
      this.parentOnClosedHandler.call(this.parentEditor, this.editedObject)
      this.hideEditorForm()

    } // end of function

    onClosedChildEditor(resultObject: any){
      this.editorForm.patchValue(this.editedObject)
    }

    //#endregion

  } // end of class
  