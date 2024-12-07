
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'j2eh-documents',
  templateUrl: 'j2eh-documents.component.html'


})
export class J2EHDocumentsComponent {

  agGridThemeName: string = 'ag-theme-alpine-dark'
  editorFormTitle: string = 'Extract Entity from JSON'
  isInModal: boolean = true
  topFormGroup?: FormGroup = undefined
  constructor(private fb: FormBuilder) {
    this.topFormGroup = this.fb.group([])
  }

  submitEditorForm(){

  }



} // end of class

/*


*/




