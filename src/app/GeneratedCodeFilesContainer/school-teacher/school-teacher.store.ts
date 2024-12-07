
  import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
  import { createReducer, createAction, on, props } from "@ngrx/store";
  import { Update } from "@ngrx/entity";
  import { createSelector, createFeatureSelector } from "@ngrx/store";
  import { createEffect, Actions, ofType } from "@ngrx/effects";
  import { catchError, concatMap, find, map, mergeMap, tap } from "rxjs/operators";
  import { Injectable } from "@angular/core";
  import { Router } from "@angular/router";
  import { Observable } from "rxjs";

  import { SchoolTeacher  } from "./school-teacher.model";
  import { SchoolTeacherService } from "./school-teacher.service";
  
  // ========================================== NGRX Store State
  export interface SchoolTeacherState extends EntityState<SchoolTeacher> {
    schoolTeachersLoaded: boolean
    selectedSchoolTeacher: SchoolTeacher | undefined
  }
  export const adapterSchoolTeacher: EntityAdapter<SchoolTeacher> = createEntityAdapter<SchoolTeacher>({
  });
  export const initialSchoolTeacherState : SchoolTeacherState = adapterSchoolTeacher.getInitialState({
    schoolTeachersLoaded: false,
    selectedSchoolTeacher: undefined,
  });
  
  // ========================================== NGRX Store Actions
  export const loadSchoolTeachers = createAction(
    "[SchoolTeacher List] Load SchoolTeachers via Service"
  );

  export const schoolTeachersLoaded = createAction(
    "[SchoolTeacher Effect] SchoolTeachers Loaded Successfully",
    props<{ schoolTeachers: SchoolTeacher[] }>()
  );

  export const createSchoolTeacher = createAction(
    "[Create SchoolTeacher Component] Create SchoolTeacher",
    props<{ schoolTeacher: any }>()
  );

  export const schoolTeacherCreated = createAction(
    "[Create SchoolTeacher Component] SchoolTeacher Created",
    props<{ schoolTeacher: SchoolTeacher }>()
  );

  export const deleteSchoolTeacher = createAction(
    "[SchoolTeacher List Operations] Delete SchoolTeacher",
    props<{ schoolTeacherId: string }>()
  );

  export const updateSchoolTeacher = createAction(
    "[SchoolTeacher List Operations] Update SchoolTeacher",
    props<{ update: Update<SchoolTeacher> }>()
  );

  export const selectSchoolTeacher = createAction(
    "[SchoolTeacher List Operations] Select SchoolTeacher",
    props<{ selected: SchoolTeacher }>()
  );

  export const SchoolTeacherActionTypes = {
    loadSchoolTeachers,
    schoolTeachersLoaded,
    createSchoolTeacher,
    schoolTeacherCreated,
    deleteSchoolTeacher,
    updateSchoolTeacher,
    selectSchoolTeacher
  }
  
  // ========================================== NGRX Store Reducer
  export const schoolTeacherReducer = createReducer(
    initialSchoolTeacherState,

    on(SchoolTeacherActionTypes.schoolTeachersLoaded, (state, action) => {
      return adapterSchoolTeacher.addMany(action.schoolTeachers, { ...state, schoolTeachersLoaded: true });
    }),

    on(SchoolTeacherActionTypes.schoolTeacherCreated, (state, action) => {
      return adapterSchoolTeacher.addOne(action.schoolTeacher, state);
    }),

    on(SchoolTeacherActionTypes.deleteSchoolTeacher, (state, action) => {
      return adapterSchoolTeacher.removeOne(action.schoolTeacherId, state);
    }),

    on(SchoolTeacherActionTypes.updateSchoolTeacher, (state, action) => {
      return adapterSchoolTeacher.updateOne(action.update, state);
    }),

  )
  
  // ========================================== NGRX Store Selectors
  const { selectAll, selectIds } = adapterSchoolTeacher.getSelectors();

  export const schoolTeachersFeatureSelector = createFeatureSelector<SchoolTeacherState>(
    "schoolTeachers"
  )

  export const selectAllSchoolTeachers = createSelector(schoolTeachersFeatureSelector, selectAll );

  export const areSchoolTeachersLoaded = createSelector(
    schoolTeachersFeatureSelector,
    state => state.schoolTeachersLoaded
  )
  
  // ========================================== NGRX Store Effects
  @Injectable()
  export class SchoolTeacherEffects {

    constructor(
      private schoolTeacherService: SchoolTeacherService,
      private actions$: Actions,
      private router: Router
    ) {}

    loadSchoolTeachers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(SchoolTeacherActionTypes.loadSchoolTeachers),
        concatMap(() => this.schoolTeacherService.loadSchoolTeachers()),
        map(schoolTeachers => SchoolTeacherActionTypes.schoolTeachersLoaded({ schoolTeachers }))
      ),
      { dispatch: true }

    );

    createSchoolTeacher$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SchoolTeacherActionTypes.createSchoolTeacher),
          tap(action => this.schoolTeacherService.createSchoolTeacher(action.schoolTeacher)),
          map( action => SchoolTeacherActionTypes.schoolTeacherCreated({ schoolTeacher: action.schoolTeacher }))
        ),
      { dispatch: true }
    );

    deleteSchoolTeacher$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SchoolTeacherActionTypes.deleteSchoolTeacher),
          tap(action => this.schoolTeacherService.deleteSchoolTeacher(action.schoolTeacherId)),
        ),
      { dispatch: false }
    );

    updateSchoolTeacher$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SchoolTeacherActionTypes.updateSchoolTeacher),
          tap(action => this.schoolTeacherService.updateSchoolTeacher(action.update.id.toString(), action.update.changes ) )
        ),
      { dispatch: false }
    );

  } //end of class
  