
  import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
  import { createReducer, createAction, on, props } from "@ngrx/store";
  import { Update } from "@ngrx/entity";
  import { createSelector, createFeatureSelector } from "@ngrx/store";
  import { createEffect, Actions, ofType } from "@ngrx/effects";
  import { catchError, concatMap, find, map, mergeMap, tap } from "rxjs/operators";
  import { Injectable } from "@angular/core";
  import { Router } from "@angular/router";
  import { Observable } from "rxjs";

  import { SchoolClass  } from "./school-class.model";
  import { SchoolClassService } from "./school-class.service";
  
  // ========================================== NGRX Store State
  export interface SchoolClassState extends EntityState<SchoolClass> {
    schoolClassesLoaded: boolean
    selectedSchoolClass: SchoolClass | undefined
  }
  export const adapterSchoolClass: EntityAdapter<SchoolClass> = createEntityAdapter<SchoolClass>({
  });
  export const initialSchoolClassState : SchoolClassState = adapterSchoolClass.getInitialState({
    schoolClassesLoaded: false,
    selectedSchoolClass: undefined,
  });
  
  // ========================================== NGRX Store Actions
  export const loadSchoolClasses = createAction(
    "[SchoolClass List] Load SchoolClasses via Service"
  );

  export const schoolClassesLoaded = createAction(
    "[SchoolClass Effect] SchoolClasses Loaded Successfully",
    props<{ schoolClasses: SchoolClass[] }>()
  );

  export const createSchoolClass = createAction(
    "[Create SchoolClass Component] Create SchoolClass",
    props<{ schoolClass: any }>()
  );

  export const schoolClassCreated = createAction(
    "[Create SchoolClass Component] SchoolClass Created",
    props<{ schoolClass: SchoolClass }>()
  );

  export const deleteSchoolClass = createAction(
    "[SchoolClass List Operations] Delete SchoolClass",
    props<{ schoolClassId: string }>()
  );

  export const updateSchoolClass = createAction(
    "[SchoolClass List Operations] Update SchoolClass",
    props<{ update: Update<SchoolClass> }>()
  );

  export const selectSchoolClass = createAction(
    "[SchoolClass List Operations] Select SchoolClass",
    props<{ selected: SchoolClass }>()
  );

  export const SchoolClassActionTypes = {
    loadSchoolClasses,
    schoolClassesLoaded,
    createSchoolClass,
    schoolClassCreated,
    deleteSchoolClass,
    updateSchoolClass,
    selectSchoolClass
  }
  
  // ========================================== NGRX Store Reducer
  export const schoolClassReducer = createReducer(
    initialSchoolClassState,

    on(SchoolClassActionTypes.schoolClassesLoaded, (state, action) => {
      return adapterSchoolClass.addMany(action.schoolClasses, { ...state, schoolClassesLoaded: true });
    }),

    on(SchoolClassActionTypes.schoolClassCreated, (state, action) => {
      return adapterSchoolClass.addOne(action.schoolClass, state);
    }),

    on(SchoolClassActionTypes.deleteSchoolClass, (state, action) => {
      return adapterSchoolClass.removeOne(action.schoolClassId, state);
    }),

    on(SchoolClassActionTypes.updateSchoolClass, (state, action) => {
      return adapterSchoolClass.updateOne(action.update, state);
    }),

  )
  
  // ========================================== NGRX Store Selectors
  const { selectAll, selectIds } = adapterSchoolClass.getSelectors();

  export const schoolClassesFeatureSelector = createFeatureSelector<SchoolClassState>(
    "schoolClasses"
  )

  export const selectAllSchoolClasses = createSelector(schoolClassesFeatureSelector, selectAll );

  export const areSchoolClassesLoaded = createSelector(
    schoolClassesFeatureSelector,
    state => state.schoolClassesLoaded
  )
  
  // ========================================== NGRX Store Effects
  @Injectable()
  export class SchoolClassEffects {

    constructor(
      private schoolClassService: SchoolClassService,
      private actions$: Actions,
      private router: Router
    ) {}

    loadSchoolClasses$ = createEffect(() =>
      this.actions$.pipe(
        ofType(SchoolClassActionTypes.loadSchoolClasses),
        concatMap(() => this.schoolClassService.loadSchoolClasses()),
        map(schoolClasses => SchoolClassActionTypes.schoolClassesLoaded({ schoolClasses }))
      ),
      { dispatch: true }

    );

    createSchoolClass$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SchoolClassActionTypes.createSchoolClass),
          tap(action => this.schoolClassService.createSchoolClass(action.schoolClass)),
          map( action => SchoolClassActionTypes.schoolClassCreated({ schoolClass: action.schoolClass }))
        ),
      { dispatch: true }
    );

    deleteSchoolClass$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SchoolClassActionTypes.deleteSchoolClass),
          tap(action => this.schoolClassService.deleteSchoolClass(action.schoolClassId)),
        ),
      { dispatch: false }
    );

    updateSchoolClass$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SchoolClassActionTypes.updateSchoolClass),
          tap(action => this.schoolClassService.updateSchoolClass(action.update.id.toString(), action.update.changes ) )
        ),
      { dispatch: false }
    );

  } //end of class
  