
  import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
  import { createReducer, createAction, on, props } from "@ngrx/store";
  import { Update } from "@ngrx/entity";
  import { createSelector, createFeatureSelector } from "@ngrx/store";
  import { createEffect, Actions, ofType } from "@ngrx/effects";
  import { catchError, concatMap, find, map, mergeMap, tap } from "rxjs/operators";
  import { Injectable } from "@angular/core";
  import { Router } from "@angular/router";
  import { Observable } from "rxjs";

  import { SelectableFieldRecord  } from "./selectable-field-record.model";
  import { SelectableFieldRecordService } from "./selectable-field-record.service";
  
  // ========================================== NGRX Store State
  export interface SelectableFieldRecordState extends EntityState<SelectableFieldRecord> {
    selectableFieldRecordsLoaded: boolean
    selectedSelectableFieldRecord: SelectableFieldRecord | undefined
  }
  export const adapterSelectableFieldRecord: EntityAdapter<SelectableFieldRecord> = createEntityAdapter<SelectableFieldRecord>({
  });
  export const initialSelectableFieldRecordState : SelectableFieldRecordState = adapterSelectableFieldRecord.getInitialState({
    selectableFieldRecordsLoaded: false,
    selectedSelectableFieldRecord: undefined,
  });
  
  // ========================================== NGRX Store Actions
  export const loadSelectableFieldRecords = createAction(
    "[SelectableFieldRecord List] Load SelectableFieldRecords via Service"
  );

  export const selectableFieldRecordsLoaded = createAction(
    "[SelectableFieldRecord Effect] SelectableFieldRecords Loaded Successfully",
    props<{ selectableFieldRecords: SelectableFieldRecord[] }>()
  );

  export const createSelectableFieldRecord = createAction(
    "[Create SelectableFieldRecord Component] Create SelectableFieldRecord",
    props<{ selectableFieldRecord: any }>()
  );

  export const selectableFieldRecordCreated = createAction(
    "[Create SelectableFieldRecord Component] SelectableFieldRecord Created",
    props<{ selectableFieldRecord: SelectableFieldRecord }>()
  );

  export const deleteSelectableFieldRecord = createAction(
    "[SelectableFieldRecord List Operations] Delete SelectableFieldRecord",
    props<{ selectableFieldRecordId: string }>()
  );

  export const updateSelectableFieldRecord = createAction(
    "[SelectableFieldRecord List Operations] Update SelectableFieldRecord",
    props<{ update: Update<SelectableFieldRecord> }>()
  );

  export const selectSelectableFieldRecord = createAction(
    "[SelectableFieldRecord List Operations] Select SelectableFieldRecord",
    props<{ selected: SelectableFieldRecord }>()
  );

  export const SelectableFieldRecordActionTypes = {
    loadSelectableFieldRecords,
    selectableFieldRecordsLoaded,
    createSelectableFieldRecord,
    selectableFieldRecordCreated,
    deleteSelectableFieldRecord,
    updateSelectableFieldRecord,
    selectSelectableFieldRecord
  }
  
  // ========================================== NGRX Store Reducer
  export const selectableFieldRecordReducer = createReducer(
    initialSelectableFieldRecordState,

    on(SelectableFieldRecordActionTypes.selectableFieldRecordsLoaded, (state, action) => {
      return adapterSelectableFieldRecord.addMany(action.selectableFieldRecords, { ...state, selectableFieldRecordsLoaded: true });
    }),

    on(SelectableFieldRecordActionTypes.selectableFieldRecordCreated, (state, action) => {
      return adapterSelectableFieldRecord.addOne(action.selectableFieldRecord, state);
    }),

    on(SelectableFieldRecordActionTypes.deleteSelectableFieldRecord, (state, action) => {
      return adapterSelectableFieldRecord.removeOne(action.selectableFieldRecordId, state);
    }),

    on(SelectableFieldRecordActionTypes.updateSelectableFieldRecord, (state, action) => {
      return adapterSelectableFieldRecord.updateOne(action.update, state);
    }),

  )
  
  // ========================================== NGRX Store Selectors
  const { selectAll, selectIds } = adapterSelectableFieldRecord.getSelectors();

  export const selectableFieldRecordsFeatureSelector = createFeatureSelector<SelectableFieldRecordState>(
    "selectableFieldRecords"
  )

  export const selectAllSelectableFieldRecords = createSelector(selectableFieldRecordsFeatureSelector, selectAll );

  export const areSelectableFieldRecordsLoaded = createSelector(
    selectableFieldRecordsFeatureSelector,
    state => state.selectableFieldRecordsLoaded
  )
  
  // ========================================== NGRX Store Effects
  @Injectable()
  export class SelectableFieldRecordEffects {

    constructor(
      private selectableFieldRecordService: SelectableFieldRecordService,
      private actions$: Actions,
      private router: Router
    ) {}

    loadSelectableFieldRecords$ = createEffect(() =>
      this.actions$.pipe(
        ofType(SelectableFieldRecordActionTypes.loadSelectableFieldRecords),
        concatMap(() => this.selectableFieldRecordService.loadSelectableFieldRecords()),
        map(selectableFieldRecords => SelectableFieldRecordActionTypes.selectableFieldRecordsLoaded({ selectableFieldRecords }))
      ),
      { dispatch: true }

    );

    createSelectableFieldRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SelectableFieldRecordActionTypes.createSelectableFieldRecord),
          tap(action => this.selectableFieldRecordService.createSelectableFieldRecord(action.selectableFieldRecord)),
          map( action => SelectableFieldRecordActionTypes.selectableFieldRecordCreated({ selectableFieldRecord: action.selectableFieldRecord }))
        ),
      { dispatch: true }
    );

    deleteSelectableFieldRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SelectableFieldRecordActionTypes.deleteSelectableFieldRecord),
          tap(action => this.selectableFieldRecordService.deleteSelectableFieldRecord(action.selectableFieldRecordId)),
        ),
      { dispatch: false }
    );

    updateSelectableFieldRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SelectableFieldRecordActionTypes.updateSelectableFieldRecord),
          tap(action => this.selectableFieldRecordService.updateSelectableFieldRecord(action.update.id.toString(), action.update.changes ) )
        ),
      { dispatch: false }
    );

  } //end of class
  