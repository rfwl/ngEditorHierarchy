
  import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
  import { createReducer, createAction, on, props } from "@ngrx/store";
  import { Update } from "@ngrx/entity";
  import { createSelector, createFeatureSelector } from "@ngrx/store";
  import { createEffect, Actions, ofType } from "@ngrx/effects";
  import { catchError, concatMap, find, map, mergeMap, tap } from "rxjs/operators";
  import { Injectable } from "@angular/core";
  import { Router } from "@angular/router";
  import { Observable } from "rxjs";

  import { DeliveryProduct  } from "./delivery-product.model";
  import { DeliveryProductService } from "./delivery-product.service";
  
  // ========================================== NGRX Store State
  export interface DeliveryProductState extends EntityState<DeliveryProduct> {
    deliveryProductsLoaded: boolean
    selectedDeliveryProduct: DeliveryProduct | undefined
  }
  export const adapterDeliveryProduct: EntityAdapter<DeliveryProduct> = createEntityAdapter<DeliveryProduct>({
  });
  export const initialDeliveryProductState : DeliveryProductState = adapterDeliveryProduct.getInitialState({
    deliveryProductsLoaded: false,
    selectedDeliveryProduct: undefined,
  });
  
  // ========================================== NGRX Store Actions
  export const loadDeliveryProducts = createAction(
    "[DeliveryProduct List] Load DeliveryProducts via Service"
  );

  export const deliveryProductsLoaded = createAction(
    "[DeliveryProduct Effect] DeliveryProducts Loaded Successfully",
    props<{ deliveryProducts: DeliveryProduct[] }>()
  );

  export const createDeliveryProduct = createAction(
    "[Create DeliveryProduct Component] Create DeliveryProduct",
    props<{ deliveryProduct: any }>()
  );

  export const deliveryProductCreated = createAction(
    "[Create DeliveryProduct Component] DeliveryProduct Created",
    props<{ deliveryProduct: DeliveryProduct }>()
  );

  export const deleteDeliveryProduct = createAction(
    "[DeliveryProduct List Operations] Delete DeliveryProduct",
    props<{ deliveryProductId: string }>()
  );

  export const updateDeliveryProduct = createAction(
    "[DeliveryProduct List Operations] Update DeliveryProduct",
    props<{ update: Update<DeliveryProduct> }>()
  );

  export const selectDeliveryProduct = createAction(
    "[DeliveryProduct List Operations] Select DeliveryProduct",
    props<{ selected: DeliveryProduct }>()
  );

  export const DeliveryProductActionTypes = {
    loadDeliveryProducts,
    deliveryProductsLoaded,
    createDeliveryProduct,
    deliveryProductCreated,
    deleteDeliveryProduct,
    updateDeliveryProduct,
    selectDeliveryProduct
  }
  
  // ========================================== NGRX Store Reducer
  export const deliveryProductReducer = createReducer(
    initialDeliveryProductState,

    on(DeliveryProductActionTypes.deliveryProductsLoaded, (state, action) => {
      return adapterDeliveryProduct.addMany(action.deliveryProducts, { ...state, deliveryProductsLoaded: true });
    }),

    on(DeliveryProductActionTypes.deliveryProductCreated, (state, action) => {
      return adapterDeliveryProduct.addOne(action.deliveryProduct, state);
    }),

    on(DeliveryProductActionTypes.deleteDeliveryProduct, (state, action) => {
      return adapterDeliveryProduct.removeOne(action.deliveryProductId, state);
    }),

    on(DeliveryProductActionTypes.updateDeliveryProduct, (state, action) => {
      return adapterDeliveryProduct.updateOne(action.update, state);
    }),

  )
  
  // ========================================== NGRX Store Selectors
  const { selectAll, selectIds } = adapterDeliveryProduct.getSelectors();

  export const deliveryProductsFeatureSelector = createFeatureSelector<DeliveryProductState>(
    "deliveryProducts"
  )

  export const selectAllDeliveryProducts = createSelector(deliveryProductsFeatureSelector, selectAll );

  export const areDeliveryProductsLoaded = createSelector(
    deliveryProductsFeatureSelector,
    state => state.deliveryProductsLoaded
  )
  
  // ========================================== NGRX Store Effects
  @Injectable()
  export class DeliveryProductEffects {

    constructor(
      private deliveryProductService: DeliveryProductService,
      private actions$: Actions,
      private router: Router
    ) {}

    loadDeliveryProducts$ = createEffect(() =>
      this.actions$.pipe(
        ofType(DeliveryProductActionTypes.loadDeliveryProducts),
        concatMap(() => this.deliveryProductService.loadDeliveryProducts()),
        map(deliveryProducts => DeliveryProductActionTypes.deliveryProductsLoaded({ deliveryProducts }))
      ),
      { dispatch: true }

    );

    createDeliveryProduct$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(DeliveryProductActionTypes.createDeliveryProduct),
          tap(action => this.deliveryProductService.createDeliveryProduct(action.deliveryProduct)),
          map( action => DeliveryProductActionTypes.deliveryProductCreated({ deliveryProduct: action.deliveryProduct }))
        ),
      { dispatch: true }
    );

    deleteDeliveryProduct$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(DeliveryProductActionTypes.deleteDeliveryProduct),
          tap(action => this.deliveryProductService.deleteDeliveryProduct(action.deliveryProductId)),
        ),
      { dispatch: false }
    );

    updateDeliveryProduct$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(DeliveryProductActionTypes.updateDeliveryProduct),
          tap(action => this.deliveryProductService.updateDeliveryProduct(action.update.id.toString(), action.update.changes ) )
        ),
      { dispatch: false }
    );

  } //end of class
  