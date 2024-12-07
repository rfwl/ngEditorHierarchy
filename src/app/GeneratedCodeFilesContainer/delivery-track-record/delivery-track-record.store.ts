
  import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
  import { createReducer, createAction, on, props } from "@ngrx/store";
  import { Update } from "@ngrx/entity";
  import { createSelector, createFeatureSelector } from "@ngrx/store";
  import { createEffect, Actions, ofType } from "@ngrx/effects";
  import { catchError, concatMap, find, map, mergeMap, tap } from "rxjs/operators";
  import { Injectable } from "@angular/core";
  import { Router } from "@angular/router";
  import { Observable } from "rxjs";

  import { DeliveryTrackRecord  } from "./delivery-track-record.model";
  import { DeliveryTrackRecordService } from "./delivery-track-record.service";
  
  // ========================================== NGRX Store State
  export interface DeliveryTrackRecordState extends EntityState<DeliveryTrackRecord> {
    deliveryTrackRecordsLoaded: boolean
    selectedDeliveryTrackRecord: DeliveryTrackRecord | undefined
  }
  export const adapterDeliveryTrackRecord: EntityAdapter<DeliveryTrackRecord> = createEntityAdapter<DeliveryTrackRecord>({
  });
  export const initialDeliveryTrackRecordState : DeliveryTrackRecordState = adapterDeliveryTrackRecord.getInitialState({
    deliveryTrackRecordsLoaded: false,
    selectedDeliveryTrackRecord: undefined,
  });
  
  // ========================================== NGRX Store Actions
  export const loadDeliveryTrackRecords = createAction(
    "[DeliveryTrackRecord List] Load DeliveryTrackRecords via Service"
  );

  export const deliveryTrackRecordsLoaded = createAction(
    "[DeliveryTrackRecord Effect] DeliveryTrackRecords Loaded Successfully",
    props<{ deliveryTrackRecords: DeliveryTrackRecord[] }>()
  );

  export const createDeliveryTrackRecord = createAction(
    "[Create DeliveryTrackRecord Component] Create DeliveryTrackRecord",
    props<{ deliveryTrackRecord: any }>()
  );

  export const deliveryTrackRecordCreated = createAction(
    "[Create DeliveryTrackRecord Component] DeliveryTrackRecord Created",
    props<{ deliveryTrackRecord: DeliveryTrackRecord }>()
  );

  export const deleteDeliveryTrackRecord = createAction(
    "[DeliveryTrackRecord List Operations] Delete DeliveryTrackRecord",
    props<{ deliveryTrackRecordId: string }>()
  );

  export const updateDeliveryTrackRecord = createAction(
    "[DeliveryTrackRecord List Operations] Update DeliveryTrackRecord",
    props<{ update: Update<DeliveryTrackRecord> }>()
  );

  export const selectDeliveryTrackRecord = createAction(
    "[DeliveryTrackRecord List Operations] Select DeliveryTrackRecord",
    props<{ selected: DeliveryTrackRecord }>()
  );

  export const DeliveryTrackRecordActionTypes = {
    loadDeliveryTrackRecords,
    deliveryTrackRecordsLoaded,
    createDeliveryTrackRecord,
    deliveryTrackRecordCreated,
    deleteDeliveryTrackRecord,
    updateDeliveryTrackRecord,
    selectDeliveryTrackRecord
  }
  
  // ========================================== NGRX Store Reducer
  export const deliveryTrackRecordReducer = createReducer(
    initialDeliveryTrackRecordState,

    on(DeliveryTrackRecordActionTypes.deliveryTrackRecordsLoaded, (state, action) => {
      return adapterDeliveryTrackRecord.addMany(action.deliveryTrackRecords, { ...state, deliveryTrackRecordsLoaded: true });
    }),

    on(DeliveryTrackRecordActionTypes.deliveryTrackRecordCreated, (state, action) => {
      return adapterDeliveryTrackRecord.addOne(action.deliveryTrackRecord, state);
    }),

    on(DeliveryTrackRecordActionTypes.deleteDeliveryTrackRecord, (state, action) => {
      return adapterDeliveryTrackRecord.removeOne(action.deliveryTrackRecordId, state);
    }),

    on(DeliveryTrackRecordActionTypes.updateDeliveryTrackRecord, (state, action) => {
      return adapterDeliveryTrackRecord.updateOne(action.update, state);
    }),

  )
  
  // ========================================== NGRX Store Selectors
  const { selectAll, selectIds } = adapterDeliveryTrackRecord.getSelectors();

  export const deliveryTrackRecordsFeatureSelector = createFeatureSelector<DeliveryTrackRecordState>(
    "deliveryTrackRecords"
  )

  export const selectAllDeliveryTrackRecords = createSelector(deliveryTrackRecordsFeatureSelector, selectAll );

  export const areDeliveryTrackRecordsLoaded = createSelector(
    deliveryTrackRecordsFeatureSelector,
    state => state.deliveryTrackRecordsLoaded
  )
  
  // ========================================== NGRX Store Effects
  @Injectable()
  export class DeliveryTrackRecordEffects {

    constructor(
      private deliveryTrackRecordService: DeliveryTrackRecordService,
      private actions$: Actions,
      private router: Router
    ) {}

    loadDeliveryTrackRecords$ = createEffect(() =>
      this.actions$.pipe(
        ofType(DeliveryTrackRecordActionTypes.loadDeliveryTrackRecords),
        concatMap(() => this.deliveryTrackRecordService.loadDeliveryTrackRecords()),
        map(deliveryTrackRecords => DeliveryTrackRecordActionTypes.deliveryTrackRecordsLoaded({ deliveryTrackRecords }))
      ),
      { dispatch: true }

    );

    createDeliveryTrackRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(DeliveryTrackRecordActionTypes.createDeliveryTrackRecord),
          tap(action => this.deliveryTrackRecordService.createDeliveryTrackRecord(action.deliveryTrackRecord)),
          map( action => DeliveryTrackRecordActionTypes.deliveryTrackRecordCreated({ deliveryTrackRecord: action.deliveryTrackRecord }))
        ),
      { dispatch: true }
    );

    deleteDeliveryTrackRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(DeliveryTrackRecordActionTypes.deleteDeliveryTrackRecord),
          tap(action => this.deliveryTrackRecordService.deleteDeliveryTrackRecord(action.deliveryTrackRecordId)),
        ),
      { dispatch: false }
    );

    updateDeliveryTrackRecord$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(DeliveryTrackRecordActionTypes.updateDeliveryTrackRecord),
          tap(action => this.deliveryTrackRecordService.updateDeliveryTrackRecord(action.update.id.toString(), action.update.changes ) )
        ),
      { dispatch: false }
    );

  } //end of class
  