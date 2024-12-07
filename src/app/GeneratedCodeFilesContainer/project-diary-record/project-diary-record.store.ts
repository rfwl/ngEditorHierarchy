
  import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
  import { createReducer, createAction, on, props } from "@ngrx/store";
  import { Update } from "@ngrx/entity";
  import { createSelector, createFeatureSelector } from "@ngrx/store";
  import { createEffect, Actions, ofType } from "@ngrx/effects";
  import { catchError, concatMap, find, map, mergeMap, tap } from "rxjs/operators";
  import { Injectable } from "@angular/core";
  import { Router } from "@angular/router";
  import { Observable } from "rxjs";

  import { ProjectDiaryRecord  } from "./project-diary-record.model";
  import { ProjectDiaryRecordService } from "./project-diary-record.service";
  
  // ========================================== NGRX Store State
  export interface ProjectDiaryRecordState extends EntityState<ProjectDiaryRecord> {
    projectDiaryRecordsLoaded: boolean
    selectedProjectDiaryRecord: ProjectDiaryRecord | undefined
  }
  export const adapterProjectDiaryRecord: EntityAdapter<ProjectDiaryRecord> = createEntityAdapter<ProjectDiaryRecord>({
  });
  export const initialProjectDiaryRecordState : ProjectDiaryRecordState = adapterProjectDiaryRecord.getInitialState({
    projectDiaryRecordsLoaded: false,
    selectedProjectDiaryRecord: undefined,
  });
  
  // ========================================== NGRX Store Actions
  export const loadProjectDiaryRecords = createAction(
    "[ProjectDiaryRecord List] Load ProjectDiaryRecords via Service"
  );

  export const projectDiaryRecordsLoaded = createAction(
    "[ProjectDiaryRecord Effect] ProjectDiaryRecords Loaded Successfully",
    props<{ projectDiaryRecords: ProjectDiaryRecord[] }>()
  );

  export const createProjectDiaryRecord = createAction(
    "[Create ProjectDiaryRecord Component] Create ProjectDiaryRecord",
    props<{ projectDiaryRecord: any }>()
  );

  export const projectDiaryRecordCreated = createAction(
    "[Create ProjectDiaryRecord Component] ProjectDiaryRecord Created",
    props<{ projectDiaryRecord: ProjectDiaryRecord }>()
  );

  export const deleteProjectDiaryRecord = createAction(
    "[ProjectDiaryRecord List Operations] Delete ProjectDiaryRecord",
    props<{ projectDiaryRecordId: string }>()
  );

  export const updateProjectDiaryRecord = createAction(
    "[ProjectDiaryRecord List Operations] Update ProjectDiaryRecord",
    props<{ update: Update<ProjectDiaryRecord> }>()
  );

  export const selectProjectDiaryRecord = createAction(
    "[ProjectDiaryRecord List Operations] Select ProjectDiaryRecord",
    props<{ selected: ProjectDiaryRecord }>()
  );

  export const ProjectDiaryRecordActionTypes = {
    loadProjectDiaryRecords,
    projectDiaryRecordsLoaded,
    createProjectDiaryRecord,
    projectDiaryRecordCreated,
    deleteProjectDiaryRecord,
    updateProjectDiaryRecord,
    selectProjectDiaryRecord
  }
  
  // ========================================== NGRX Store Reducer
  export const projectDiaryRecordReducer = createReducer(
    initialProjectDiaryRecordState,

    on(ProjectDiaryRecordActionTypes.projectDiaryRecordsLoaded, (state, action) => {
      return adapterProjectDiaryRecord.addMany(action.projectDiaryRecords, { ...state, projectDiaryRecordsLoaded: true });
    }),

    on(ProjectDiaryRecordActionTypes.projectDiaryRecordCreated, (state, action) => {
      return adapterProjectDiaryRecord.addOne(action.projectDiaryRecord, state);
    }),

    on(ProjectDiaryRecordActionTypes.deleteProjectDiaryRecord, (state, action) => {
      return adapterProjectDiaryRecord.removeOne(action.projectDiaryRecordId, state);
    }),

    on(ProjectDiaryRecordActionTypes.updateProjectDiaryRecord, (state, action) => {
      return adapterProjectDiaryRecord.updateOne(action.update, state);
    }),

  )
  
  // ========================================== NGRX Store Selectors
  const { selectAll, selectIds } = adapterProjectDiaryRecord.getSelectors();

  export const projectDiaryRecordsFeatureSelector = createFeatureSelector<ProjectDiaryRecordState>(
    "projectDiaryRecords"
  )

  export const selectAllProjectDiaryRecords = createSelector(projectDiaryRecordsFeatureSelector, selectAll );

  export const areProjectDiaryRecordsLoaded = createSelector(
    projectDiaryRecordsFeatureSelector,
    state => state.projectDiaryRecordsLoaded
  )
  
  // ========================================== NGRX Store Effects
  @Injectable()
  export class ProjectDiaryRecordEffects {

    constructor(
      private projectDiaryRecordService: ProjectDiaryRecordService,
      private actions$: Actions,
      private router: Router
    ) {}

    loadProjectDiaryRecords$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ProjectDiaryRecordActionTypes.loadProjectDiaryRecords),
        concatMap(() => this.projectDiaryRecordService.loadProjectDiaryRecords()),
        map(projectDiaryRecords => ProjectDiaryRecordActionTypes.projectDiaryRecordsLoaded({ projectDiaryRecords }))
      ),
      { dispatch: true }

    );

    createProjectDiaryRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(ProjectDiaryRecordActionTypes.createProjectDiaryRecord),
          tap(action => this.projectDiaryRecordService.createProjectDiaryRecord(action.projectDiaryRecord)),
          map( action => ProjectDiaryRecordActionTypes.projectDiaryRecordCreated({ projectDiaryRecord: action.projectDiaryRecord }))
        ),
      { dispatch: true }
    );

    deleteProjectDiaryRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(ProjectDiaryRecordActionTypes.deleteProjectDiaryRecord),
          tap(action => this.projectDiaryRecordService.deleteProjectDiaryRecord(action.projectDiaryRecordId)),
        ),
      { dispatch: false }
    );

    updateProjectDiaryRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(ProjectDiaryRecordActionTypes.updateProjectDiaryRecord),
          tap(action => this.projectDiaryRecordService.updateProjectDiaryRecord(action.update.id.toString(), action.update.changes ) )
        ),
      { dispatch: false }
    );

  } //end of class
  