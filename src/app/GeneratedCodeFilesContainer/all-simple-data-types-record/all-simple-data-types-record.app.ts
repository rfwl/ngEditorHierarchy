
  //=====================================================================================
  // Add the following lines to the module file to reference the generated module
  // Replace "GeneratedCodeFilesContainer" with proper folder path
  /*

  import { AllSimpleDataTypesRecordModule } from './GeneratedCodeFilesContainer/all-simple-data-types-record/all-simple-data-types-record.module'
  import { AllSimpleDataTypesRecordEffects } from './GeneratedCodeFilesContainer/all-simple-data-types-record/all-simple-data-types-record.store'

  imports: [
    ......
    AllSimpleDataTypesRecordModule,
    EffectsModule.forRoot([... AllSimpleDataTypesRecordEffects, ...]),
    ......
  ]

  */
  //====================================================================================
  // The following lines might be needed to add into the component file to show the generated top components
  // Replace "GeneratedCodeFilesContainer" with proper folder path
  /*

  import { AllSimpleDataTypesRecordEditorAgGridComponent } from './GeneratedCodeFilesContainer/all-simple-data-types-record/editor-aggrid/all-simple-data-types-record-editor-aggrid.component'

  import { AllSimpleDataTypesRecordEditorPTableComponent } from './GeneratedCodeFilesContainer/all-simple-data-types-record/editor-ptable/all-simple-data-types-record-editor-ptable.component'

  import { AllSimpleDataTypesRecordEditorFormComponent } from './GeneratedCodeFilesContainer/all-simple-data-types-record/editor-form/all-simple-data-types-record-editor-form.component'

  <all-simple-data-types-record-editor-aggrid #allSimpleDataTypesRecordEditorAgGridPage ></all-simple-data-types-record-editor-aggrid>

  <all-simple-data-types-record-editor-ptable #allSimpleDataTypesRecordEditorPTablePage ></all-simple-data-types-record-editor-ptable>

  @ViewChild('allSimpleDataTypesRecordEditorAgGridPage', { static: false }) allSimpleDataTypesRecordEditorAgGrid?: AllSimpleDataTypesRecordEditorAgGridComponent

  @ViewChild('allSimpleDataTypesRecordEditorPTablePage', { static: false }) allSimpleDataTypesRecordEditorPTable?: AllSimpleDataTypesRecordEditorPTableComponent

  */
  //====================================================================================
  // Add the following lines to the file defining the NGRX store: state and reducer.
  // Replace "GeneratedCodeFilesContainer" with proper folder path
  /*

  import { AllSimpleDataTypesRecordState, allSimpleDataTypesRecordReducer } from "./GeneratedCodeFilesContainer/all-simple-data-types-record/all-simple-data-types-record.store"

  export interface AppState {
    ......
    allSimpleDataTypesRecord: AllSimpleDataTypesRecordState
    ......
  }

  export const reducers: ActionReducerMap<AppState> = {
    ......
    allSimpleDataTypesRecord: allSimpleDataTypesRecordReducer,
    ......
  }

  */
  //====================================================================================
  