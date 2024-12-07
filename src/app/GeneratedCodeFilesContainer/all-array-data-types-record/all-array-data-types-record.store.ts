
  import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
  import { createReducer, createAction, on, props } from "@ngrx/store";
  import { Update } from "@ngrx/entity";
  import { createSelector, createFeatureSelector } from "@ngrx/store";
  import { createEffect, Actions, ofType } from "@ngrx/effects";
  import { catchError, concatMap, find, map, mergeMap, tap } from "rxjs/operators";
  import { Injectable } from "@angular/core";
  import { Router } from "@angular/router";
  import { Observable } from "rxjs";

  import { AllArrayDataTypesRecord  } from "./all-array-data-types-record.model";
  import { AllArrayDataTypesRecordService } from "./all-array-data-types-record.service";
  
  // ========================================== NGRX Store State
  export interface AllArrayDataTypesRecordState extends EntityState<AllArrayDataTypesRecord> {
    allArrayDataTypesRecordsLoaded: boolean
    selectedAllArrayDataTypesRecord: AllArrayDataTypesRecord | undefined
  }
  export const adapterAllArrayDataTypesRecord: EntityAdapter<AllArrayDataTypesRecord> = createEntityAdapter<AllArrayDataTypesRecord>({
  });
  export const initialAllArrayDataTypesRecordState : AllArrayDataTypesRecordState = adapterAllArrayDataTypesRecord.getInitialState({
    allArrayDataTypesRecordsLoaded: false,
    selectedAllArrayDataTypesRecord: undefined,
  });
  
  // ========================================== NGRX Store Actions
  export const loadAllArrayDataTypesRecords = createAction(
    "[AllArrayDataTypesRecord List] Load AllArrayDataTypesRecords via Service"
  );

  export const allArrayDataTypesRecordsLoaded = createAction(
    "[AllArrayDataTypesRecord Effect] AllArrayDataTypesRecords Loaded Successfully",
    props<{ allArrayDataTypesRecords: AllArrayDataTypesRecord[] }>()
  );

  export const createAllArrayDataTypesRecord = createAction(
    "[Create AllArrayDataTypesRecord Component] Create AllArrayDataTypesRecord",
    props<{ allArrayDataTypesRecord: any }>()
  );

  export const allArrayDataTypesRecordCreated = createAction(
    "[Create AllArrayDataTypesRecord Component] AllArrayDataTypesRecord Created",
    props<{ allArrayDataTypesRecord: AllArrayDataTypesRecord }>()
  );

  export const deleteAllArrayDataTypesRecord = createAction(
    "[AllArrayDataTypesRecord List Operations] Delete AllArrayDataTypesRecord",
    props<{ allArrayDataTypesRecordId: string }>()
  );

  export const updateAllArrayDataTypesRecord = createAction(
    "[AllArrayDataTypesRecord List Operations] Update AllArrayDataTypesRecord",
    props<{ update: Update<AllArrayDataTypesRecord> }>()
  );

  export const selectAllArrayDataTypesRecord = createAction(
    "[AllArrayDataTypesRecord List Operations] Select AllArrayDataTypesRecord",
    props<{ selected: AllArrayDataTypesRecord }>()
  );

  export const AllArrayDataTypesRecordActionTypes = {
    loadAllArrayDataTypesRecords,
    allArrayDataTypesRecordsLoaded,
    createAllArrayDataTypesRecord,
    allArrayDataTypesRecordCreated,
    deleteAllArrayDataTypesRecord,
    updateAllArrayDataTypesRecord,
    selectAllArrayDataTypesRecord
  }
  
  // ========================================== NGRX Store Reducer
  export const allArrayDataTypesRecordReducer = createReducer(
    initialAllArrayDataTypesRecordState,

    on(AllArrayDataTypesRecordActionTypes.allArrayDataTypesRecordsLoaded, (state, action) => {
      return adapterAllArrayDataTypesRecord.addMany(action.allArrayDataTypesRecords, { ...state, allArrayDataTypesRecordsLoaded: true });
    }),

    on(AllArrayDataTypesRecordActionTypes.allArrayDataTypesRecordCreated, (state, action) => {
      return adapterAllArrayDataTypesRecord.addOne(action.allArrayDataTypesRecord, state);
    }),

    on(AllArrayDataTypesRecordActionTypes.deleteAllArrayDataTypesRecord, (state, action) => {
      return adapterAllArrayDataTypesRecord.removeOne(action.allArrayDataTypesRecordId, state);
    }),

    on(AllArrayDataTypesRecordActionTypes.updateAllArrayDataTypesRecord, (state, action) => {
      return adapterAllArrayDataTypesRecord.updateOne(action.update, state);
    }),

  )
  
  // ========================================== NGRX Store Selectors
  const { selectAll, selectIds } = adapterAllArrayDataTypesRecord.getSelectors();

  export const allArrayDataTypesRecordsFeatureSelector = createFeatureSelector<AllArrayDataTypesRecordState>(
    "allArrayDataTypesRecords"
  )

  export const selectAllAllArrayDataTypesRecords = createSelector(allArrayDataTypesRecordsFeatureSelector, selectAll );

  export const areAllArrayDataTypesRecordsLoaded = createSelector(
    allArrayDataTypesRecordsFeatureSelector,
    state => state.allArrayDataTypesRecordsLoaded
  )
  
  // ========================================== NGRX Store Effects
  @Injectable()
  export class AllArrayDataTypesRecordEffects {

    constructor(
      private allArrayDataTypesRecordService: AllArrayDataTypesRecordService,
      private actions$: Actions,
      private router: Router
    ) {}

    loadAllArrayDataTypesRecords$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AllArrayDataTypesRecordActionTypes.loadAllArrayDataTypesRecords),
        concatMap(() => this.allArrayDataTypesRecordService.loadAllArrayDataTypesRecords()),
        map(allArrayDataTypesRecords => AllArrayDataTypesRecordActionTypes.allArrayDataTypesRecordsLoaded({ allArrayDataTypesRecords }))
      ),
      { dispatch: true }

    );

    createAllArrayDataTypesRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AllArrayDataTypesRecordActionTypes.createAllArrayDataTypesRecord),
          tap(action => this.allArrayDataTypesRecordService.createAllArrayDataTypesRecord(action.allArrayDataTypesRecord)),
          map( action => AllArrayDataTypesRecordActionTypes.allArrayDataTypesRecordCreated({ allArrayDataTypesRecord: action.allArrayDataTypesRecord }))
        ),
      { dispatch: true }
    );

    deleteAllArrayDataTypesRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AllArrayDataTypesRecordActionTypes.deleteAllArrayDataTypesRecord),
          tap(action => this.allArrayDataTypesRecordService.deleteAllArrayDataTypesRecord(action.allArrayDataTypesRecordId)),
        ),
      { dispatch: false }
    );

    updateAllArrayDataTypesRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AllArrayDataTypesRecordActionTypes.updateAllArrayDataTypesRecord),
          tap(action => this.allArrayDataTypesRecordService.updateAllArrayDataTypesRecord(action.update.id.toString(), action.update.changes ) )
        ),
      { dispatch: false }
    );

  } //end of class
  