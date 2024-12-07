
  import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
  import { createReducer, createAction, on, props } from "@ngrx/store";
  import { Update } from "@ngrx/entity";
  import { createSelector, createFeatureSelector } from "@ngrx/store";
  import { createEffect, Actions, ofType } from "@ngrx/effects";
  import { catchError, concatMap, find, map, mergeMap, tap } from "rxjs/operators";
  import { Injectable } from "@angular/core";
  import { Router } from "@angular/router";
  import { Observable } from "rxjs";

  import { ContactPersonList  } from "./contact-person-list.model";
  import { ContactPersonListService } from "./contact-person-list.service";
  
  // ========================================== NGRX Store State
  export interface ContactPersonListState extends EntityState<ContactPersonList> {
    contactPersonListsLoaded: boolean
    selectedContactPersonList: ContactPersonList | undefined
  }
  export const adapterContactPersonList: EntityAdapter<ContactPersonList> = createEntityAdapter<ContactPersonList>({
  });
  export const initialContactPersonListState : ContactPersonListState = adapterContactPersonList.getInitialState({
    contactPersonListsLoaded: false,
    selectedContactPersonList: undefined,
  });
  
  // ========================================== NGRX Store Actions
  export const loadContactPersonLists = createAction(
    "[ContactPersonList List] Load ContactPersonLists via Service"
  );

  export const contactPersonListsLoaded = createAction(
    "[ContactPersonList Effect] ContactPersonLists Loaded Successfully",
    props<{ contactPersonLists: ContactPersonList[] }>()
  );

  export const createContactPersonList = createAction(
    "[Create ContactPersonList Component] Create ContactPersonList",
    props<{ contactPersonList: any }>()
  );

  export const contactPersonListCreated = createAction(
    "[Create ContactPersonList Component] ContactPersonList Created",
    props<{ contactPersonList: ContactPersonList }>()
  );

  export const deleteContactPersonList = createAction(
    "[ContactPersonList List Operations] Delete ContactPersonList",
    props<{ contactPersonListId: string }>()
  );

  export const updateContactPersonList = createAction(
    "[ContactPersonList List Operations] Update ContactPersonList",
    props<{ update: Update<ContactPersonList> }>()
  );

  export const selectContactPersonList = createAction(
    "[ContactPersonList List Operations] Select ContactPersonList",
    props<{ selected: ContactPersonList }>()
  );

  export const ContactPersonListActionTypes = {
    loadContactPersonLists,
    contactPersonListsLoaded,
    createContactPersonList,
    contactPersonListCreated,
    deleteContactPersonList,
    updateContactPersonList,
    selectContactPersonList
  }
  
  // ========================================== NGRX Store Reducer
  export const contactPersonListReducer = createReducer(
    initialContactPersonListState,

    on(ContactPersonListActionTypes.contactPersonListsLoaded, (state, action) => {
      return adapterContactPersonList.addMany(action.contactPersonLists, { ...state, contactPersonListsLoaded: true });
    }),

    on(ContactPersonListActionTypes.contactPersonListCreated, (state, action) => {
      return adapterContactPersonList.addOne(action.contactPersonList, state);
    }),

    on(ContactPersonListActionTypes.deleteContactPersonList, (state, action) => {
      return adapterContactPersonList.removeOne(action.contactPersonListId, state);
    }),

    on(ContactPersonListActionTypes.updateContactPersonList, (state, action) => {
      return adapterContactPersonList.updateOne(action.update, state);
    }),

  )
  
  // ========================================== NGRX Store Selectors
  const { selectAll, selectIds } = adapterContactPersonList.getSelectors();

  export const contactPersonListsFeatureSelector = createFeatureSelector<ContactPersonListState>(
    "contactPersonLists"
  )

  export const selectAllContactPersonLists = createSelector(contactPersonListsFeatureSelector, selectAll );

  export const areContactPersonListsLoaded = createSelector(
    contactPersonListsFeatureSelector,
    state => state.contactPersonListsLoaded
  )
  
  // ========================================== NGRX Store Effects
  @Injectable()
  export class ContactPersonListEffects {

    constructor(
      private contactPersonListService: ContactPersonListService,
      private actions$: Actions,
      private router: Router
    ) {}

    loadContactPersonLists$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ContactPersonListActionTypes.loadContactPersonLists),
        concatMap(() => this.contactPersonListService.loadContactPersonLists()),
        map(contactPersonLists => ContactPersonListActionTypes.contactPersonListsLoaded({ contactPersonLists }))
      ),
      { dispatch: true }

    );

    createContactPersonList$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(ContactPersonListActionTypes.createContactPersonList),
          tap(action => this.contactPersonListService.createContactPersonList(action.contactPersonList)),
          map( action => ContactPersonListActionTypes.contactPersonListCreated({ contactPersonList: action.contactPersonList }))
        ),
      { dispatch: true }
    );

    deleteContactPersonList$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(ContactPersonListActionTypes.deleteContactPersonList),
          tap(action => this.contactPersonListService.deleteContactPersonList(action.contactPersonListId)),
        ),
      { dispatch: false }
    );

    updateContactPersonList$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(ContactPersonListActionTypes.updateContactPersonList),
          tap(action => this.contactPersonListService.updateContactPersonList(action.update.id.toString(), action.update.changes ) )
        ),
      { dispatch: false }
    );

  } //end of class
  