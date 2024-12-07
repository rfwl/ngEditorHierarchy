
  import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
  import { createReducer, createAction, on, props } from "@ngrx/store";
  import { Update } from "@ngrx/entity";
  import { createSelector, createFeatureSelector } from "@ngrx/store";
  import { createEffect, Actions, ofType } from "@ngrx/effects";
  import { catchError, concatMap, find, map, mergeMap, tap } from "rxjs/operators";
  import { Injectable } from "@angular/core";
  import { Router } from "@angular/router";
  import { Observable } from "rxjs";

  import { SelectableOptionRecord  } from "./selectable-option-record.model";
  import { SelectableOptionRecordService } from "./selectable-option-record.service";
  
  // ========================================== NGRX Store State
  export interface SelectableOptionRecordState extends EntityState<SelectableOptionRecord> {
    selectableOptionRecordsLoaded: boolean
    selectedSelectableOptionRecord: SelectableOptionRecord | undefined
  }
  export const adapterSelectableOptionRecord: EntityAdapter<SelectableOptionRecord> = createEntityAdapter<SelectableOptionRecord>({
  });
  export const initialSelectableOptionRecordState : SelectableOptionRecordState = adapterSelectableOptionRecord.getInitialState({
    selectableOptionRecordsLoaded: false,
    selectedSelectableOptionRecord: undefined,
  });
  
  // ========================================== NGRX Store Actions
  export const loadSelectableOptionRecords = createAction(
    "[SelectableOptionRecord List] Load SelectableOptionRecords via Service"
  );

  export const selectableOptionRecordsLoaded = createAction(
    "[SelectableOptionRecord Effect] SelectableOptionRecords Loaded Successfully",
    props<{ selectableOptionRecords: SelectableOptionRecord[] }>()
  );

  export const createSelectableOptionRecord = createAction(
    "[Create SelectableOptionRecord Component] Create SelectableOptionRecord",
    props<{ selectableOptionRecord: any }>()
  );

  export const selectableOptionRecordCreated = createAction(
    "[Create SelectableOptionRecord Component] SelectableOptionRecord Created",
    props<{ selectableOptionRecord: SelectableOptionRecord }>()
  );

  export const deleteSelectableOptionRecord = createAction(
    "[SelectableOptionRecord List Operations] Delete SelectableOptionRecord",
    props<{ selectableOptionRecordId: string }>()
  );

  export const updateSelectableOptionRecord = createAction(
    "[SelectableOptionRecord List Operations] Update SelectableOptionRecord",
    props<{ update: Update<SelectableOptionRecord> }>()
  );

  export const selectSelectableOptionRecord = createAction(
    "[SelectableOptionRecord List Operations] Select SelectableOptionRecord",
    props<{ selected: SelectableOptionRecord }>()
  );

  export const SelectableOptionRecordActionTypes = {
    loadSelectableOptionRecords,
    selectableOptionRecordsLoaded,
    createSelectableOptionRecord,
    selectableOptionRecordCreated,
    deleteSelectableOptionRecord,
    updateSelectableOptionRecord,
    selectSelectableOptionRecord
  }
  
  // ========================================== NGRX Store Reducer
  export const selectableOptionRecordReducer = createReducer(
    initialSelectableOptionRecordState,

    on(SelectableOptionRecordActionTypes.selectableOptionRecordsLoaded, (state, action) => {
      return adapterSelectableOptionRecord.addMany(action.selectableOptionRecords, { ...state, selectableOptionRecordsLoaded: true });
    }),

    on(SelectableOptionRecordActionTypes.selectableOptionRecordCreated, (state, action) => {
      return adapterSelectableOptionRecord.addOne(action.selectableOptionRecord, state);
    }),

    on(SelectableOptionRecordActionTypes.deleteSelectableOptionRecord, (state, action) => {
      return adapterSelectableOptionRecord.removeOne(action.selectableOptionRecordId, state);
    }),

    on(SelectableOptionRecordActionTypes.updateSelectableOptionRecord, (state, action) => {
      return adapterSelectableOptionRecord.updateOne(action.update, state);
    }),

  )
  
  // ========================================== NGRX Store Selectors
  const { selectAll, selectIds } = adapterSelectableOptionRecord.getSelectors();

  export const selectableOptionRecordsFeatureSelector = createFeatureSelector<SelectableOptionRecordState>(
    "selectableOptionRecords"
  )

  export const selectAllSelectableOptionRecords = createSelector(selectableOptionRecordsFeatureSelector, selectAll );

  export const areSelectableOptionRecordsLoaded = createSelector(
    selectableOptionRecordsFeatureSelector,
    state => state.selectableOptionRecordsLoaded
  )
  
  // ========================================== NGRX Store Effects
  @Injectable()
  export class SelectableOptionRecordEffects {

    constructor(
      private selectableOptionRecordService: SelectableOptionRecordService,
      private actions$: Actions,
      private router: Router
    ) {}

    loadSelectableOptionRecords$ = createEffect(() =>
      this.actions$.pipe(
        ofType(SelectableOptionRecordActionTypes.loadSelectableOptionRecords),
        concatMap(() => this.selectableOptionRecordService.loadSelectableOptionRecords()),
        map(selectableOptionRecords => SelectableOptionRecordActionTypes.selectableOptionRecordsLoaded({ selectableOptionRecords }))
      ),
      { dispatch: true }

    );

    createSelectableOptionRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SelectableOptionRecordActionTypes.createSelectableOptionRecord),
          tap(action => this.selectableOptionRecordService.createSelectableOptionRecord(action.selectableOptionRecord)),
          map( action => SelectableOptionRecordActionTypes.selectableOptionRecordCreated({ selectableOptionRecord: action.selectableOptionRecord }))
        ),
      { dispatch: true }
    );

    deleteSelectableOptionRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SelectableOptionRecordActionTypes.deleteSelectableOptionRecord),
          tap(action => this.selectableOptionRecordService.deleteSelectableOptionRecord(action.selectableOptionRecordId)),
        ),
      { dispatch: false }
    );

    updateSelectableOptionRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SelectableOptionRecordActionTypes.updateSelectableOptionRecord),
          tap(action => this.selectableOptionRecordService.updateSelectableOptionRecord(action.update.id.toString(), action.update.changes ) )
        ),
      { dispatch: false }
    );

  } //end of class
  