
  import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
  import { createReducer, createAction, on, props } from "@ngrx/store";
  import { Update } from "@ngrx/entity";
  import { createSelector, createFeatureSelector } from "@ngrx/store";
  import { createEffect, Actions, ofType } from "@ngrx/effects";
  import { catchError, concatMap, find, map, mergeMap, tap } from "rxjs/operators";
  import { Injectable } from "@angular/core";
  import { Router } from "@angular/router";
  import { Observable } from "rxjs";

  import { AllSimpleDataTypesRecord  } from "./all-simple-data-types-record.model";
  import { AllSimpleDataTypesRecordService } from "./all-simple-data-types-record.service";
  
  // ========================================== NGRX Store State
  export interface AllSimpleDataTypesRecordState extends EntityState<AllSimpleDataTypesRecord> {
    allSimpleDataTypesRecordsLoaded: boolean
    selectedAllSimpleDataTypesRecord: AllSimpleDataTypesRecord | undefined
  }
  export const adapterAllSimpleDataTypesRecord: EntityAdapter<AllSimpleDataTypesRecord> = createEntityAdapter<AllSimpleDataTypesRecord>({
  });
  export const initialAllSimpleDataTypesRecordState : AllSimpleDataTypesRecordState = adapterAllSimpleDataTypesRecord.getInitialState({
    allSimpleDataTypesRecordsLoaded: false,
    selectedAllSimpleDataTypesRecord: undefined,
  });
  
  // ========================================== NGRX Store Actions
  export const loadAllSimpleDataTypesRecords = createAction(
    "[AllSimpleDataTypesRecord List] Load AllSimpleDataTypesRecords via Service"
  );

  export const allSimpleDataTypesRecordsLoaded = createAction(
    "[AllSimpleDataTypesRecord Effect] AllSimpleDataTypesRecords Loaded Successfully",
    props<{ allSimpleDataTypesRecords: AllSimpleDataTypesRecord[] }>()
  );

  export const createAllSimpleDataTypesRecord = createAction(
    "[Create AllSimpleDataTypesRecord Component] Create AllSimpleDataTypesRecord",
    props<{ allSimpleDataTypesRecord: any }>()
  );

  export const allSimpleDataTypesRecordCreated = createAction(
    "[Create AllSimpleDataTypesRecord Component] AllSimpleDataTypesRecord Created",
    props<{ allSimpleDataTypesRecord: AllSimpleDataTypesRecord }>()
  );

  export const deleteAllSimpleDataTypesRecord = createAction(
    "[AllSimpleDataTypesRecord List Operations] Delete AllSimpleDataTypesRecord",
    props<{ allSimpleDataTypesRecordId: string }>()
  );

  export const updateAllSimpleDataTypesRecord = createAction(
    "[AllSimpleDataTypesRecord List Operations] Update AllSimpleDataTypesRecord",
    props<{ update: Update<AllSimpleDataTypesRecord> }>()
  );

  export const selectAllSimpleDataTypesRecord = createAction(
    "[AllSimpleDataTypesRecord List Operations] Select AllSimpleDataTypesRecord",
    props<{ selected: AllSimpleDataTypesRecord }>()
  );

  export const AllSimpleDataTypesRecordActionTypes = {
    loadAllSimpleDataTypesRecords,
    allSimpleDataTypesRecordsLoaded,
    createAllSimpleDataTypesRecord,
    allSimpleDataTypesRecordCreated,
    deleteAllSimpleDataTypesRecord,
    updateAllSimpleDataTypesRecord,
    selectAllSimpleDataTypesRecord
  }
  
  // ========================================== NGRX Store Reducer
  export const allSimpleDataTypesRecordReducer = createReducer(
    initialAllSimpleDataTypesRecordState,

    on(AllSimpleDataTypesRecordActionTypes.allSimpleDataTypesRecordsLoaded, (state, action) => {
      return adapterAllSimpleDataTypesRecord.addMany(action.allSimpleDataTypesRecords, { ...state, allSimpleDataTypesRecordsLoaded: true });
    }),

    on(AllSimpleDataTypesRecordActionTypes.allSimpleDataTypesRecordCreated, (state, action) => {
      return adapterAllSimpleDataTypesRecord.addOne(action.allSimpleDataTypesRecord, state);
    }),

    on(AllSimpleDataTypesRecordActionTypes.deleteAllSimpleDataTypesRecord, (state, action) => {
      return adapterAllSimpleDataTypesRecord.removeOne(action.allSimpleDataTypesRecordId, state);
    }),

    on(AllSimpleDataTypesRecordActionTypes.updateAllSimpleDataTypesRecord, (state, action) => {
      return adapterAllSimpleDataTypesRecord.updateOne(action.update, state);
    }),

  )
  
  // ========================================== NGRX Store Selectors
  const { selectAll, selectIds } = adapterAllSimpleDataTypesRecord.getSelectors();

  export const allSimpleDataTypesRecordsFeatureSelector = createFeatureSelector<AllSimpleDataTypesRecordState>(
    "allSimpleDataTypesRecords"
  )

  export const selectAllAllSimpleDataTypesRecords = createSelector(allSimpleDataTypesRecordsFeatureSelector, selectAll );

  export const areAllSimpleDataTypesRecordsLoaded = createSelector(
    allSimpleDataTypesRecordsFeatureSelector,
    state => state.allSimpleDataTypesRecordsLoaded
  )
  
  // ========================================== NGRX Store Effects
  @Injectable()
  export class AllSimpleDataTypesRecordEffects {

    constructor(
      private allSimpleDataTypesRecordService: AllSimpleDataTypesRecordService,
      private actions$: Actions,
      private router: Router
    ) {}

    loadAllSimpleDataTypesRecords$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AllSimpleDataTypesRecordActionTypes.loadAllSimpleDataTypesRecords),
        concatMap(() => this.allSimpleDataTypesRecordService.loadAllSimpleDataTypesRecords()),
        map(allSimpleDataTypesRecords => AllSimpleDataTypesRecordActionTypes.allSimpleDataTypesRecordsLoaded({ allSimpleDataTypesRecords }))
      ),
      { dispatch: true }

    );

    createAllSimpleDataTypesRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AllSimpleDataTypesRecordActionTypes.createAllSimpleDataTypesRecord),
          tap(action => this.allSimpleDataTypesRecordService.createAllSimpleDataTypesRecord(action.allSimpleDataTypesRecord)),
          map( action => AllSimpleDataTypesRecordActionTypes.allSimpleDataTypesRecordCreated({ allSimpleDataTypesRecord: action.allSimpleDataTypesRecord }))
        ),
      { dispatch: true }
    );

    deleteAllSimpleDataTypesRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AllSimpleDataTypesRecordActionTypes.deleteAllSimpleDataTypesRecord),
          tap(action => this.allSimpleDataTypesRecordService.deleteAllSimpleDataTypesRecord(action.allSimpleDataTypesRecordId)),
        ),
      { dispatch: false }
    );

    updateAllSimpleDataTypesRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AllSimpleDataTypesRecordActionTypes.updateAllSimpleDataTypesRecord),
          tap(action => this.allSimpleDataTypesRecordService.updateAllSimpleDataTypesRecord(action.update.id.toString(), action.update.changes ) )
        ),
      { dispatch: false }
    );

  } //end of class
  