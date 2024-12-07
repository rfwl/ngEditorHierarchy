
  import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
  import { createReducer, createAction, on, props } from "@ngrx/store";
  import { Update } from "@ngrx/entity";
  import { createSelector, createFeatureSelector } from "@ngrx/store";
  import { createEffect, Actions, ofType } from "@ngrx/effects";
  import { catchError, concatMap, find, map, mergeMap, tap } from "rxjs/operators";
  import { Injectable } from "@angular/core";
  import { Router } from "@angular/router";
  import { Observable } from "rxjs";

  import { DeliveryContractor  } from "./delivery-contractor.model";
  import { DeliveryContractorService } from "./delivery-contractor.service";
  
  // ========================================== NGRX Store State
  export interface DeliveryContractorState extends EntityState<DeliveryContractor> {
    deliveryContractorsLoaded: boolean
    selectedDeliveryContractor: DeliveryContractor | undefined
  }
  export const adapterDeliveryContractor: EntityAdapter<DeliveryContractor> = createEntityAdapter<DeliveryContractor>({
  });
  export const initialDeliveryContractorState : DeliveryContractorState = adapterDeliveryContractor.getInitialState({
    deliveryContractorsLoaded: false,
    selectedDeliveryContractor: undefined,
  });
  
  // ========================================== NGRX Store Actions
  export const loadDeliveryContractors = createAction(
    "[DeliveryContractor List] Load DeliveryContractors via Service"
  );

  export const deliveryContractorsLoaded = createAction(
    "[DeliveryContractor Effect] DeliveryContractors Loaded Successfully",
    props<{ deliveryContractors: DeliveryContractor[] }>()
  );

  export const createDeliveryContractor = createAction(
    "[Create DeliveryContractor Component] Create DeliveryContractor",
    props<{ deliveryContractor: any }>()
  );

  export const deliveryContractorCreated = createAction(
    "[Create DeliveryContractor Component] DeliveryContractor Created",
    props<{ deliveryContractor: DeliveryContractor }>()
  );

  export const deleteDeliveryContractor = createAction(
    "[DeliveryContractor List Operations] Delete DeliveryContractor",
    props<{ deliveryContractorId: string }>()
  );

  export const updateDeliveryContractor = createAction(
    "[DeliveryContractor List Operations] Update DeliveryContractor",
    props<{ update: Update<DeliveryContractor> }>()
  );

  export const selectDeliveryContractor = createAction(
    "[DeliveryContractor List Operations] Select DeliveryContractor",
    props<{ selected: DeliveryContractor }>()
  );

  export const DeliveryContractorActionTypes = {
    loadDeliveryContractors,
    deliveryContractorsLoaded,
    createDeliveryContractor,
    deliveryContractorCreated,
    deleteDeliveryContractor,
    updateDeliveryContractor,
    selectDeliveryContractor
  }
  
  // ========================================== NGRX Store Reducer
  export const deliveryContractorReducer = createReducer(
    initialDeliveryContractorState,

    on(DeliveryContractorActionTypes.deliveryContractorsLoaded, (state, action) => {
      return adapterDeliveryContractor.addMany(action.deliveryContractors, { ...state, deliveryContractorsLoaded: true });
    }),

    on(DeliveryContractorActionTypes.deliveryContractorCreated, (state, action) => {
      return adapterDeliveryContractor.addOne(action.deliveryContractor, state);
    }),

    on(DeliveryContractorActionTypes.deleteDeliveryContractor, (state, action) => {
      return adapterDeliveryContractor.removeOne(action.deliveryContractorId, state);
    }),

    on(DeliveryContractorActionTypes.updateDeliveryContractor, (state, action) => {
      return adapterDeliveryContractor.updateOne(action.update, state);
    }),

  )
  
  // ========================================== NGRX Store Selectors
  const { selectAll, selectIds } = adapterDeliveryContractor.getSelectors();

  export const deliveryContractorsFeatureSelector = createFeatureSelector<DeliveryContractorState>(
    "deliveryContractors"
  )

  export const selectAllDeliveryContractors = createSelector(deliveryContractorsFeatureSelector, selectAll );

  export const areDeliveryContractorsLoaded = createSelector(
    deliveryContractorsFeatureSelector,
    state => state.deliveryContractorsLoaded
  )
  
  // ========================================== NGRX Store Effects
  @Injectable()
  export class DeliveryContractorEffects {

    constructor(
      private deliveryContractorService: DeliveryContractorService,
      private actions$: Actions,
      private router: Router
    ) {}

    loadDeliveryContractors$ = createEffect(() =>
      this.actions$.pipe(
        ofType(DeliveryContractorActionTypes.loadDeliveryContractors),
        concatMap(() => this.deliveryContractorService.loadDeliveryContractors()),
        map(deliveryContractors => DeliveryContractorActionTypes.deliveryContractorsLoaded({ deliveryContractors }))
      ),
      { dispatch: true }

    );

    createDeliveryContractor$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(DeliveryContractorActionTypes.createDeliveryContractor),
          tap(action => this.deliveryContractorService.createDeliveryContractor(action.deliveryContractor)),
          map( action => DeliveryContractorActionTypes.deliveryContractorCreated({ deliveryContractor: action.deliveryContractor }))
        ),
      { dispatch: true }
    );

    deleteDeliveryContractor$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(DeliveryContractorActionTypes.deleteDeliveryContractor),
          tap(action => this.deliveryContractorService.deleteDeliveryContractor(action.deliveryContractorId)),
        ),
      { dispatch: false }
    );

    updateDeliveryContractor$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(DeliveryContractorActionTypes.updateDeliveryContractor),
          tap(action => this.deliveryContractorService.updateDeliveryContractor(action.update.id.toString(), action.update.changes ) )
        ),
      { dispatch: false }
    );

  } //end of class
  