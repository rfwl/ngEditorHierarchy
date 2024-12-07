

  import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, Type, ViewContainerRef} from '@angular/core';
  import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms'
  import { forwardRef, AfterViewChecked, ChangeDetectorRef, Host, ViewChild, ViewChildren, QueryList } from "@angular/core";
  import { FormBuilder, FormGroup, ValidationErrors, Validator, Validators } from "@angular/forms";

  //#region Data Types
  export enum EnumEditorOperationType {
    Update = 'Update',
    Create = 'Create',
    Delete = 'Delete'
  }
  //#endregion

  //#region Helper Functions

  export const predefinedLableFunctionContainer = {
    getPersonFullName:  function(obj): string{
      let str: string = ''
      if(!obj) return str

      let givens: string[] = [
        obj["firstName"], obj["FirstName"], obj["first_name"],
        obj["givenName"], obj["GivenName"],obj["given_name"]
      ]
      let given: string = givens.find( nm => nm)

      let families: string[] = [
        obj["familyName"], obj["FamilyName"], obj["family_name"],
        obj["lastName"], obj["LastName"], obj["last_name"],
        obj["surname"], obj["Surname"]
      ]
      let family: string = families.find( nm => nm)
      return given + ' ' + family
    },

    getArrayCount(ary: any[]): number {
      if(!ary || !Array.isArray(ary)) return 0
      else return ary.length
    }




  }

  export const make_undefined_to_null = function (obj: any){ // Firestore didn't receive undefined as a value.
    if(!obj) return
    Object.keys(obj).forEach(key=> {
      if(key === 'id' || key === 'parent') {
        // Do nothing, CAUTION: parent pointer will cause dead loop here.
      } else if(obj[key] === undefined) {
        const desc = Object.getOwnPropertyDescriptor(obj, key) || {}
        let writable = Boolean(desc.writable)
        if(writable) obj[key] = null // Only change writable property.
      } else if(obj[key] === null) {
        // Do nothing, CAUTION: (typeof null) will return 'object'
      } else{
        if( typeof obj[key] === 'object') {
          make_undefined_to_null(obj[key])
        }
      }
    })
  }

  export const copy_properties_from_object1_to_object2 = function (obj1: any, obj2:any){
    if(!obj1) return
    if(!obj2) obj2 = {}
    Object.keys(obj1).forEach(key=> {
        obj2[key]=obj1[key]
      });
  }


  export const deepClone = function (obj:any): any {
    if(!obj)
      return null
    else
      return JSON.parse(JSON.stringify(obj))
  }

  export const display_DataArray_In_GridCell = function(ary: any[], ty: string): string {
    let str = ''
    if(!ary || !ty) return str
    let len = ary.length
    if(len<1) return str
    else if(len == 1) return "1 " + ty
    else return len + " " + ty + "s"
  }

  export function capitalizeWordInString(str: string): string {
    if(!str || typeof str != 'string' || str.length<1) return str
    else {
        let str1 = str.replace(/_+/g, " ")
        return str1.replace(/(^w{1})|([s+]w{1})/g, letter => letter.toUpperCase()); //[_s+] , match underscore or whitespace.
    }
  }


  //#endregion

  //#region Output Json String in a Modal

  import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal'

  @Component({
    selector: "code-output-modal",
    template: `
  <form  [class]="agGridThemeName" autocomplete="off">
  <div class="modal-header ag-root-wrapper d-flex flex-row" >
    <h4 class="modal-title flex-fill" >{{codeOutputTitle}}</h4>
    <h4><i type="button" class="close pull-end fa fa-close" aria-label="Close" (click)="hideEditorForm()" ></i></h4>
  </div>
  <div class="modal-body ag-root-wrapper" style="max-height: 80vh" >
    <pre>{{codeOutputString}}</pre>
  </div>
  <div class="ag-root-wrapper modal-footer " style="flex-direction: row;" >
    <button type="button" class="btn btn-primary" (click)="hideEditorForm()" >Close</button>
  </div>
  </form>
    `,
    styles: ['.disabled-input { background-color: silver; }']
  })
  export class CodeOutputModalComponent implements OnInit {
    agGridThemeName: string = 'ag-theme-alpine-dark'
    codeOutputTitle: string
    codeOutputString: string

    constructor(public bsModalRef: BsModalRef){
    }

    ngOnInit() {
    }

    hideEditorForm(){
      this.bsModalRef.hide()
    }

  } // end of class

  export const show_CodeOutput_Modal = function(modalService: BsModalService, strTitle: string, strCode: string, windowSize: string = 'modal-lg'){

    const config: any = {
      class: windowSize, backdrop: true, ignoreBackdropClick: true,
      initialState: {
        codeOutputTitle: strTitle,
        codeOutputString: strCode
      }
    }
    let modalRef = modalService.show(CodeOutputModalComponent, config)
  }

  //#endregion


  //#region AgGrid Components
  @Component({
    selector: 'open-field-editor-cell-renderer',
    template: `<span (click)="invokeParentFunction()" [title]="tooltip"><i [class]="'fa fa-' + icon"></i>&nbsp;{{display}}</span>`,
  })
  export class OpenFieldEditorCellRendererComponent {
    @Input()disabled: boolean = false
    display: string = ''
    tooltip: string = ''

    icon: string = ''
    parentDataField: string = ''
    parentFunction: Function = undefined
    parentComponent: any = undefined
    parentDataIndex: number = -1

    public params: any; //ICellRendererParams;
    agInit(params: any ): void { //ICellRendererParams
      this.params = params;
      this.icon = params['icon']
      if(!this.icon) this.icon = 'edit'

      this.parentComponent = params['parentComponent']
      this.parentFunction = params['parentFunction']
      this.parentDataField = params['parentDataField']
      this.parentDataIndex = this.params?.rowIndex

      if(this.parentComponent){
        let ary = this.parentComponent['editedObjects']
        let rowDataObject = ary[this.parentDataIndex]
        let fieldValueObject = rowDataObject[this.parentDataField]
        if(fieldValueObject){
          this.tooltip = JSON.stringify(fieldValueObject,null,2)
          if(Array.isArray(fieldValueObject)){
            if(fieldValueObject.length < 1)
              this.display = ''
            else if(fieldValueObject.length==1)
              this.display = '1 Object'
            else if(fieldValueObject.length > 1)
              this.display = fieldValueObject.length + ' Objects'
            else
              this.display =''
          } else {
            this.display = 'Object'
          }
        }
      }

    }

    public invokeParentFunction() {
      this.parentFunction?.call(this.parentComponent, this.parentDataField, this.parentDataIndex )
    }

    refresh(): boolean {
      return false;
    }
  } // end of class


  @Component({
    selector: 'data-type-array-cell-renderer',
    template: '<div style="width: 100%; height: 100%;">{{display}}</div>'
  })
  export class DataTypeArrayCellRendererComponent {
    htmlInputType: string = 'text'
    params: any
    display: string = ''
    agInit(params: any): void {
      this.params = params
      this.htmlInputType = params['inputType']
      if(Array.isArray(params.value)){
        let lng = params.value['length']
        this.display = lng + ' ' + this.htmlInputType + (lng>1 ? 's': '')
      } else {
        this.display = '' // Not Array Yet
      }
    }
    refresh(params: any): boolean {
        this.params = params
        return true
    }
  } // end of class

  @Component({
    selector: 'simple-color-cell-renderer',
    template: `<div style="width: 100%; height: 100%; background-color: inherit;" ></div>`
  })
  export class SimpleColorCellRendererComponent {
    constructor(private hostEleRef: ViewContainerRef ){
      this.hostEleRef.element.nativeElement.style.paddingLeft = '-110px'
    }
    params: any
    color: string
    agInit(params: any): void {
        this.params = params
        try{
          this.color = params.data[this.params.column.colDef.field]
          this.hostEleRef.element.nativeElement.style.backgroundColor = this.color
        } catch(_){}

    }
    refresh(params: any): boolean {
        this.params = params;
        this.color = params.value
        this.hostEleRef.element.nativeElement.style.backgroundColor = this.color
        return true
    }
  } // end of class


  //#endregion


  //#region Form Controls

  //=========================================================================
  @Component({
    selector: 'open-field-editor-form-control',
    template: `<span (click)="invokeParentFunction()" [title]="tooltip" ><i [class]="'fa fa-' + icon"></i>&nbsp;{{display}}</span>`,
    providers: [
      { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: OpenFieldEditorFormControlComponent },
      { provide: NG_VALIDATORS, multi: true, useExisting: OpenFieldEditorFormControlComponent },
    ]
  })
  export class OpenFieldEditorFormControlComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor{
    @Input()disabled: boolean = false
    tooltip: string = ''
    display: string = ''

    icon: string = ''
    parentDataField: string = ''
    parentFunction: Function = undefined
    parentComponent: any = undefined

    _params: any = undefined
    get params(): any { return this._params }
    @Input() set params( pms: any){
      this._params = pms

      this.icon = pms['icon']
      if(!this.icon) this.icon = 'edit'

      this.parentFunction = pms['parentFunction']
      this.parentComponent = pms['parentComponent']
      this.parentDataField = pms['parentDataField']

      if(this.parentComponent){
        let rowDataObject = this.parentComponent['editedObject']
        let fieldValueObject = rowDataObject[this.parentDataField]
        if(fieldValueObject){
          this.tooltip = JSON.stringify(fieldValueObject,null,2)
          if(Array.isArray(fieldValueObject)){
            this.display = (fieldValueObject.length==1?  '1 Object' : fieldValueObject.length + ' Objects')
          } else {
            this.display = 'Object'
          }
        }
      }

    }

    constructor(
      private _renderer: Renderer2,
      private _elementRef: ElementRef,
      //private cdRef: ChangeDetectorRef
      ) {

    }
    //==================================
    ngOnInit(){

    }
    ngAfterViewInit(){

    }

    ngOnDestroy() {

    }

    ngAfterContentChecked() {
      //this.cdRef.detectChanges();
    }
    //==================================
    onTouched: Function = () => {}
    onChange = (_: any) => {}

    registerOnChange(fn: (_: any) => {}): void {
      this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
      this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
      this._renderer.setProperty(this._elementRef.nativeElement, 'disabled',  isDisabled);
      this.disabled = isDisabled
    }

    writeValue(val: any) {

    }

    validate(control: AbstractControl) {
      return true
    }

    //===============================
    public invokeParentFunction() {
      if(this.disabled) return
      this.onTouched(true)
      if(!this.parentComponent || !this.parentFunction) return
      this.parentFunction.call(this.parentComponent, this.parentDataField)
    }

  } // end of class

  //========================================================================= bep-input-group


  @Component({
    selector: 'bep-input',
    template: `
    <div class="form-control d-flex flex-row">
      <input #templateInput [type]="hostBEPInputGroup?.inputType" [placeholder]="hostBEPInputGroup?.placeHolder" class="flex-fill"
        [class]="hostBEPInputGroup?.inputClass" [pattern]="hostBEPInputGroup?.inputPattern" [disabled]="isDisabled" [value]="value"
        (change)="hostBEPInputGroup?.onBlur($event, idx)">
        <i class="fa fa-arrow-up" (click)="hostBEPInputGroup?.moveUpItem(idx)" style="padding-left: 0.5em; width: 1.5em; "></i>
        <i class="fa fa-arrow-down" (click)="hostBEPInputGroup?.moveDownItem(idx)" style="padding-left: 0.5em;  width: 1.5em;"></i>
        <i class="fa fa-minus" (click)="hostBEPInputGroup?.deleteItem(idx)" style="padding-left: 0.5em;  width: 1.5em; "></i>
    </div>
    `
  })
  export class BEPInputFormControlComponent {
    @Input() idx: number
    @Input() value: string
    isDisabled: boolean = false
    @ViewChild("templateInput") eleInput: ElementRef

    constructor(@Host() protected hostBEPInputGroup: BEPInputGroupFormControlComponent){ // Good way to point to the host element
    }

    setFocus(){
      this.eleInput.nativeElement.focus()
    }

  } //end of class

  @Component({
    selector: 'bep-input-group',
    template: `
  <div class="form-control ">
    <bep-input *ngFor="let itm of items; let ind = index" [value]="itm" [idx]="ind"></bep-input>
    <i class="fa fa-plus" (click)="addNewItem()" style="padding-left: 1em;  width: 1.5em; margin-right: 1em;"></i> Add new value
  </div>
  `,
    providers: [
      { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() =>  BEPInputGroupFormControlComponent) },
      { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() =>  BEPInputGroupFormControlComponent ) },
    ]
  })
  export class BEPInputGroupFormControlComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy, AfterViewInit, AfterViewChecked{

    //#region Main
    agGridThemeName: string = 'ag-theme-alpine-dark'
    @ViewChildren(BEPInputFormControlComponent) childFormControlList: QueryList<BEPInputFormControlComponent>

    bepInputFormControls: any[]
    constructor(
      private _renderer: Renderer2,
      private _elementRef: ElementRef,
      private cdRef: ChangeDetectorRef,
      private fb: FormBuilder) {

    }

    ngAfterContentChecked() {

    }

    ngOnInit(){

    }

    ngAfterViewInit(){

    }

    ngAfterViewChecked() {
      this.bepInputFormControls = this.childFormControlList.toArray()
      this.bepInputFormControls?.forEach( cmp => {
        if(cmp.idx == this.indexToFocus) {
          cmp.setFocus()
          this.indexToFocus = -1
        }
      })
    }

    ngOnDestroy() {

    }

    //#endregion

    //#region NG_VALUE_ACCESSOR and NG_VALIDATORS
    onTouched: Function = () => {}
    onChange = (_: any) => {}

    registerOnChange(fn: (_: any) => {}): void {
      this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
      this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
      this._renderer.setProperty(this._elementRef.nativeElement, 'disabled',  isDisabled);
      this.childFormControlList?.forEach( cmp => {
        cmp.isDisabled = isDisabled
      })
    }

    writeValue(value: any) { // Found being called once only when this instance is open.
      //console.log('BEPInputGroupFormControlComponent writeValue')
      if (value) {
        this.items = value
      }
    }

    validate(c: AbstractControl): ValidationErrors | null{
      return null
    }

    //#endregion

    //#region UI and User Operations

    @Input()inputClass: string = 'form-control'
    // <input type="checkbox" ...>'s value will be name of the Form Control. its checked attribute will be true or false.
    @Input()inputType: string = 'text' // cannot be checlbox here.
    @Input()defaultValue: any = ''
    @Input()placeHolder: string = ''
    @Input()inputPattern: string = null

    _items: any[] = []
    get items(): any[] { return this._items }
    @Input() set items( ts: any[]){
      this._items = ts
      // The next is not neccessary at all.
      // This will only be called from writeValue() and will cause error: The control ... was found ... after adding new member.
      //this.onChange(this._items)
    }

    onBlur(event, ind){
      if(!event) return
      if(ind<0 || ind>this._items.length-1) return
      let nuValue = event.target?.value
      // <input type="checkbox" ...>'s value will be name of the Form Control. its checked attribute will be true or false.
      // if(this.inputType == 'checkbox'){
      //   nuValue = event.target?.checked
      // }
      if(!nuValue) {
        return
      }
      this._items[ind] = nuValue
      this.onChange(this._items)
    }

    indexToFocus: number = -1
    addNewItem(){
      let nu = this.defaultValue
      this._items.push(nu)
      this.indexToFocus = this._items.length - 1
      this.onChange(this._items)
    }

    deleteItem(ind){
      if(ind<0 || ind>this._items.length-1) return
      this._items.splice(ind,1)
      this.onChange(this._items)
    }

    moveUpItem(ind){
      if(ind<0 || ind>this._items.length-1) return
      if(ind==0) return
      let itm = this._items[ind]
      this._items.splice(ind,1)
      this._items.splice(ind-1,0, itm)
      this.onChange(this._items)
    }

    moveDownItem(ind){
      if(ind<0 || ind>this._items.length-1) return
      if(ind==this._items.length-1) return
      let itm = this._items[ind]
      this._items.splice(ind,1)
      this._items.splice(ind+1,0,itm)
      this.onChange(this._items)
    }

    //#endregion

  } // end of class


  //========================================================================= bep-checkbox-group

  @Component({
      selector: 'bep-checkbox',
      template: `
      <div (click)="toggleCheck()" class="form-control">
        <input #eleInput type="checkbox" [checked]="isChecked()" class="form-check-input me-2" [disabled]="checkboxGroup.isDisabled">
        <ng-content></ng-content>
      </div>
      `
  })
  export class BEPCheckboxComponent {
    @Input() value: any

    constructor(@Host() protected checkboxGroup: BEPCheckboxGroupComponent){ // Good way to point to the host element
    }

    toggleCheck() {
      if(this.checkboxGroup.isDisabled ) return
      this.checkboxGroup.addOrRemove(this.value)
    }

    isChecked() {
        return this.checkboxGroup.contains(this.value)
    }

  } //end of class

  @Component({
      selector: 'bep-checkbox-group',
      template: '<ng-content></ng-content>',
      providers: [
          {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BEPCheckboxGroupComponent),
            multi: true
          }
      ]
  })
  export class BEPCheckboxGroupComponent implements ControlValueAccessor {
    //#region Main
    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef
    ) {
    }

    writeValue(value: any): void {
        this._model = value
    }

    private onChange: (m: any) => void
    private onTouched: (m: any) => void
    registerOnChange(fn: any): void {
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn
    }

    isDisabled: boolean = false
    setDisabledState(disabled: boolean): void {
      this.isDisabled = disabled
      this._renderer.setProperty(this._elementRef.nativeElement, 'disabled',  disabled)
    }
    //#endregion

    //#region Model and Operations
    private _model: any
    get model() {
        return this._model
    }

    set model(value: any) {
        this._model = value
        this.onChange(this._model)
    }

    addOrRemove(value: any) {
        if (this.contains(value)) {
            this.remove(value)
        } else {
            this.add(value)
        }
        this.onTouched(value) // This will ensure the editor form is marked as dirty and so Submit button comes out.
    }

    contains(value: any): boolean {
        if (this._model instanceof Array) {
            return this._model.indexOf(value) > -1
        } else if (!!this._model) {
            return this._model === value
        }
        return false
    }

    private add(value: any) {
        if (!this.contains(value)) {
            if (this._model instanceof Array) {
                this._model.push(value)
            } else {
                this._model = [value]
            }
            this.onChange(this._model)
        }
    }

    private remove(value: any) {
        const index = this._model.indexOf(value);
        if (!this._model || index < 0) {
            return
        }

        this._model.splice(index, 1)
        this.onChange(this._model)
    }

    //#endregion



  } //end of class

  //====================================================================== bep-input-boolean-group

  @Component({
    selector: 'bep-input-boolean',
    template: `
    <div class="form-control d-flex flex-row">
      <input #templateInput type="checkbox" [class]="hostBEPInputBooleanGroup?.inputClass"
        [disabled]="isDisabled" (click)="hostBEPInputBooleanGroup?.onBlur($event, idx)" >
        <i class="fa fa-arrow-up" (click)="hostBEPInputBooleanGroup?.moveUpItem(idx)" style="padding-left: 0.5em; width: 1.5em; "></i>
        <i class="fa fa-arrow-down" (click)="hostBEPInputBooleanGroup?.moveDownItem(idx)" style="padding-left: 0.5em;  width: 1.5em;"></i>
        <i class="fa fa-minus" (click)="hostBEPInputBooleanGroup?.deleteItem(idx)" style="padding-left: 0.5em;  width: 1.5em; "></i>
    </div>
    `
    })
    export class BEPInputBooleanFormControlComponent {
      @Input() idx: number
      isDisabled: boolean = false
      @ViewChild("templateInput") eleInput: ElementRef

      constructor(@Host() protected hostBEPInputBooleanGroup: BEPInputBooleanGroupFormControlComponent){
      }

      setFocus(){
          this.eleInput.nativeElement.focus()
      }

      setChecked(b: boolean){
        if(this.eleInput.nativeElement.checked != b)
          this.eleInput.nativeElement.checked = b
      }

    } //end of class

    @Component({
      selector: 'bep-input-boolean-group',
      template: `
    <div class="form-control" >
      <bep-input-boolean *ngFor="let itm of items; let ind = index" [idx]="ind" ></bep-input-boolean>
      <i class="fa fa-plus" (click)="addNewItem()" style="padding-left: 1em;  width: 1.5em; margin-right: 1em;"></i> Add new value
    </div>
    `,
      providers: [
        { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() =>  BEPInputBooleanGroupFormControlComponent) },
        { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() =>  BEPInputBooleanGroupFormControlComponent ) },
      ]
    })
    export class BEPInputBooleanGroupFormControlComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy, AfterViewInit, AfterViewChecked{

      //#region Main
      agGridThemeName: string = 'ag-theme-alpine-dark'
      @ViewChildren(BEPInputBooleanFormControlComponent) childFormControlList: QueryList<BEPInputBooleanFormControlComponent>
      bepInputFormControls: any[]

      constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private cdRef: ChangeDetectorRef,
        private fb: FormBuilder) {

      }

      ngAfterContentChecked() {
      }

      ngAfterViewChecked() {
        this.bepInputFormControls = this.childFormControlList.toArray()
        this.bepInputFormControls?.forEach( cmp => {
          cmp.setChecked(this.items[cmp.idx])
          if(cmp.idx == this.indexToFocus) {
            cmp.setFocus()
            this.indexToFocus = -1
          }
        })
      }

      ngOnInit(){

      }

      ngAfterViewInit(){
      }

      ngOnDestroy() {

      }

      //#endregion

      //#region NG_VALUE_ACCESSOR and NG_VALIDATORS
      onTouched: Function = () => {}
      onChange = (_: any) => {}

      registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
      }

      registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
      }

      setDisabledState(isDisabled: boolean): void {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled',  isDisabled);
        this.childFormControlList?.forEach( cmp => {
          cmp.isDisabled = isDisabled
        })
      }

      writeValue(value: boolean[]) {
        if (value) {
          this.items = value
        }
      }

      validate(c: AbstractControl): ValidationErrors | null{
        return null
      }

      //#endregion

      //#region UI and User Operations

      @Input()inputClass: string = 'form-check-input'
      @Input()defaultValue: boolean = false

      _items: boolean[] = []
      get items(): any[] { return this._items }
      @Input() set items( ts: boolean[]){
        this._items = ts
      }

      onBlur(event, ind){
        if(!event) return
        if(ind<0 || ind>this._items.length-1) return
        let nuValue = event.target?.checked
        this._items[ind] = nuValue
        this.onChange(this._items)
      }

      indexToFocus: number = -1
      addNewItem(){
        let nu = this.defaultValue
        this._items.push(nu)
        this.indexToFocus = this._items.length - 1
        this.onChange(this._items)
      }

      deleteItem(ind){
        if(ind<0 || ind>this._items.length-1) return
        this._items.splice(ind,1)
        this.onChange(this._items)
      }

      moveUpItem(ind){
        if(ind<0 || ind>this._items.length-1) return
        if(ind==0) return
        let itm = this._items[ind]
        this._items.splice(ind,1)
        this._items.splice(ind-1,0, itm)
        this.onChange(this._items)
      }

      moveDownItem(ind){
        if(ind<0 || ind>this._items.length-1) return
        if(ind==this._items.length-1) return
        let itm = this._items[ind]
        this._items.splice(ind,1)
        this._items.splice(ind+1,0,itm)
        this.onChange(this._items)
      }

      //#endregion

    } // end of class
  