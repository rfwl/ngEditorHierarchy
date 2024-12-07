
  //=====================================================================================
  // Add the following lines to the module file to reference the generated module
  // Replace "GeneratedCodeFilesContainer" with proper folder path
  /*

  import { AllArrayDataTypesRecordModule } from './GeneratedCodeFilesContainer/all-array-data-types-record/all-array-data-types-record.module'
  import { AllArrayDataTypesRecordEffects } from './GeneratedCodeFilesContainer/all-array-data-types-record/all-array-data-types-record.store'

  imports: [
    ......
    AllArrayDataTypesRecordModule,
    EffectsModule.forRoot([... AllArrayDataTypesRecordEffects, ...]),
    ......
  ]

  */
  //====================================================================================
  // The following lines might be needed to add into the component file to show the generated top components
  // Replace "GeneratedCodeFilesContainer" with proper folder path
  /*

  import { AllArrayDataTypesRecordEditorAgGridComponent } from './GeneratedCodeFilesContainer/all-array-data-types-record/editor-aggrid/all-array-data-types-record-editor-aggrid.component'

  import { AllArrayDataTypesRecordEditorPTableComponent } from './GeneratedCodeFilesContainer/all-array-data-types-record/editor-ptable/all-array-data-types-record-editor-ptable.component'

  import { AllArrayDataTypesRecordEditorFormComponent } from './GeneratedCodeFilesContainer/all-array-data-types-record/editor-form/all-array-data-types-record-editor-form.component'

  <all-array-data-types-record-editor-aggrid #allArrayDataTypesRecordEditorAgGridPage ></all-array-data-types-record-editor-aggrid>

  <all-array-data-types-record-editor-ptable #allArrayDataTypesRecordEditorPTablePage ></all-array-data-types-record-editor-ptable>

  @ViewChild('allArrayDataTypesRecordEditorAgGridPage', { static: false }) allArrayDataTypesRecordEditorAgGrid?: AllArrayDataTypesRecordEditorAgGridComponent

  @ViewChild('allArrayDataTypesRecordEditorPTablePage', { static: false }) allArrayDataTypesRecordEditorPTable?: AllArrayDataTypesRecordEditorPTableComponent

  */
  //====================================================================================
  // Add the following lines to the file defining the NGRX store: state and reducer.
  // Replace "GeneratedCodeFilesContainer" with proper folder path
  /*

  import { AllArrayDataTypesRecordState, allArrayDataTypesRecordReducer } from "./GeneratedCodeFilesContainer/all-array-data-types-record/all-array-data-types-record.store"

  export interface AppState {
    ......
    allArrayDataTypesRecord: AllArrayDataTypesRecordState
    ......
  }

  export const reducers: ActionReducerMap<AppState> = {
    ......
    allArrayDataTypesRecord: allArrayDataTypesRecordReducer,
    ......
  }

  */
  //====================================================================================
  