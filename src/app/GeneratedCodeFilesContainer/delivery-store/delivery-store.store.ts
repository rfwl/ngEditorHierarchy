
  import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
  import { createReducer, createAction, on, props } from "@ngrx/store";
  import { Update } from "@ngrx/entity";
  import { createSelector, createFeatureSelector } from "@ngrx/store";
  import { createEffect, Actions, ofType } from "@ngrx/effects";
  import { catchError, concatMap, find, map, mergeMap, tap } from "rxjs/operators";
  import { Injectable } from "@angular/core";
  import { Router } from "@angular/router";
  import { Observable } from "rxjs";

  import { DeliveryStore  } from "./delivery-store.model";
  import { DeliveryStoreService } from "./delivery-store.service";
  
  // ========================================== NGRX Store State
  export interface DeliveryStoreState extends EntityState<DeliveryStore> {
    deliveryStoresLoaded: boolean
    selectedDeliveryStore: DeliveryStore | undefined
  }
  export const adapterDeliveryStore: EntityAdapter<DeliveryStore> = createEntityAdapter<DeliveryStore>({
  });
  export const initialDeliveryStoreState : DeliveryStoreState = adapterDeliveryStore.getInitialState({
    deliveryStoresLoaded: false,
    selectedDeliveryStore: undefined,
  });
  
  // ========================================== NGRX Store Actions
  export const loadDeliveryStores = createAction(
    "[DeliveryStore List] Load DeliveryStores via Service"
  );

  export const deliveryStoresLoaded = createAction(
    "[DeliveryStore Effect] DeliveryStores Loaded Successfully",
    props<{ deliveryStores: DeliveryStore[] }>()
  );

  export const createDeliveryStore = createAction(
    "[Create DeliveryStore Component] Create DeliveryStore",
    props<{ deliveryStore: any }>()
  );

  export const deliveryStoreCreated = createAction(
    "[Create DeliveryStore Component] DeliveryStore Created",
    props<{ deliveryStore: DeliveryStore }>()
  );

  export const deleteDeliveryStore = createAction(
    "[DeliveryStore List Operations] Delete DeliveryStore",
    props<{ deliveryStoreId: string }>()
  );

  export const updateDeliveryStore = createAction(
    "[DeliveryStore List Operations] Update DeliveryStore",
    props<{ update: Update<DeliveryStore> }>()
  );

  export const selectDeliveryStore = createAction(
    "[DeliveryStore List Operations] Select DeliveryStore",
    props<{ selected: DeliveryStore }>()
  );

  export const DeliveryStoreActionTypes = {
    loadDeliveryStores,
    deliveryStoresLoaded,
    createDeliveryStore,
    deliveryStoreCreated,
    deleteDeliveryStore,
    updateDeliveryStore,
    selectDeliveryStore
  }
  
  // ========================================== NGRX Store Reducer
  export const deliveryStoreReducer = createReducer(
    initialDeliveryStoreState,

    on(DeliveryStoreActionTypes.deliveryStoresLoaded, (state, action) => {
      return adapterDeliveryStore.addMany(action.deliveryStores, { ...state, deliveryStoresLoaded: true });
    }),

    on(DeliveryStoreActionTypes.deliveryStoreCreated, (state, action) => {
      return adapterDeliveryStore.addOne(action.deliveryStore, state);
    }),

    on(DeliveryStoreActionTypes.deleteDeliveryStore, (state, action) => {
      return adapterDeliveryStore.removeOne(action.deliveryStoreId, state);
    }),

    on(DeliveryStoreActionTypes.updateDeliveryStore, (state, action) => {
      return adapterDeliveryStore.updateOne(action.update, state);
    }),

  )
  
  // ========================================== NGRX Store Selectors
  const { selectAll, selectIds } = adapterDeliveryStore.getSelectors();

  export const deliveryStoresFeatureSelector = createFeatureSelector<DeliveryStoreState>(
    "deliveryStores"
  )

  export const selectAllDeliveryStores = createSelector(deliveryStoresFeatureSelector, selectAll );

  export const areDeliveryStoresLoaded = createSelector(
    deliveryStoresFeatureSelector,
    state => state.deliveryStoresLoaded
  )
  
  // ========================================== NGRX Store Effects
  @Injectable()
  export class DeliveryStoreEffects {

    constructor(
      private deliveryStoreService: DeliveryStoreService,
      private actions$: Actions,
      private router: Router
    ) {}

    loadDeliveryStores$ = createEffect(() =>
      this.actions$.pipe(
        ofType(DeliveryStoreActionTypes.loadDeliveryStores),
        concatMap(() => this.deliveryStoreService.loadDeliveryStores()),
        map(deliveryStores => DeliveryStoreActionTypes.deliveryStoresLoaded({ deliveryStores }))
      ),
      { dispatch: true }

    );

    createDeliveryStore$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(DeliveryStoreActionTypes.createDeliveryStore),
          tap(action => this.deliveryStoreService.createDeliveryStore(action.deliveryStore)),
          map( action => DeliveryStoreActionTypes.deliveryStoreCreated({ deliveryStore: action.deliveryStore }))
        ),
      { dispatch: true }
    );

    deleteDeliveryStore$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(DeliveryStoreActionTypes.deleteDeliveryStore),
          tap(action => this.deliveryStoreService.deleteDeliveryStore(action.deliveryStoreId)),
        ),
      { dispatch: false }
    );

    updateDeliveryStore$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(DeliveryStoreActionTypes.updateDeliveryStore),
          tap(action => this.deliveryStoreService.updateDeliveryStore(action.update.id.toString(), action.update.changes ) )
        ),
      { dispatch: false }
    );

  } //end of class
  