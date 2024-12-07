
  import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
  import { createReducer, createAction, on, props } from "@ngrx/store";
  import { Update } from "@ngrx/entity";
  import { createSelector, createFeatureSelector } from "@ngrx/store";
  import { createEffect, Actions, ofType } from "@ngrx/effects";
  import { catchError, concatMap, find, map, mergeMap, tap } from "rxjs/operators";
  import { Injectable } from "@angular/core";
  import { Router } from "@angular/router";
  import { Observable } from "rxjs";

  import { SchoolCourse  } from "./school-course.model";
  import { SchoolCourseService } from "./school-course.service";
  
  // ========================================== NGRX Store State
  export interface SchoolCourseState extends EntityState<SchoolCourse> {
    schoolCoursesLoaded: boolean
    selectedSchoolCourse: SchoolCourse | undefined
  }
  export const adapterSchoolCourse: EntityAdapter<SchoolCourse> = createEntityAdapter<SchoolCourse>({
  });
  export const initialSchoolCourseState : SchoolCourseState = adapterSchoolCourse.getInitialState({
    schoolCoursesLoaded: false,
    selectedSchoolCourse: undefined,
  });
  
  // ========================================== NGRX Store Actions
  export const loadSchoolCourses = createAction(
    "[SchoolCourse List] Load SchoolCourses via Service"
  );

  export const schoolCoursesLoaded = createAction(
    "[SchoolCourse Effect] SchoolCourses Loaded Successfully",
    props<{ schoolCourses: SchoolCourse[] }>()
  );

  export const createSchoolCourse = createAction(
    "[Create SchoolCourse Component] Create SchoolCourse",
    props<{ schoolCourse: any }>()
  );

  export const schoolCourseCreated = createAction(
    "[Create SchoolCourse Component] SchoolCourse Created",
    props<{ schoolCourse: SchoolCourse }>()
  );

  export const deleteSchoolCourse = createAction(
    "[SchoolCourse List Operations] Delete SchoolCourse",
    props<{ schoolCourseId: string }>()
  );

  export const updateSchoolCourse = createAction(
    "[SchoolCourse List Operations] Update SchoolCourse",
    props<{ update: Update<SchoolCourse> }>()
  );

  export const selectSchoolCourse = createAction(
    "[SchoolCourse List Operations] Select SchoolCourse",
    props<{ selected: SchoolCourse }>()
  );

  export const SchoolCourseActionTypes = {
    loadSchoolCourses,
    schoolCoursesLoaded,
    createSchoolCourse,
    schoolCourseCreated,
    deleteSchoolCourse,
    updateSchoolCourse,
    selectSchoolCourse
  }
  
  // ========================================== NGRX Store Reducer
  export const schoolCourseReducer = createReducer(
    initialSchoolCourseState,

    on(SchoolCourseActionTypes.schoolCoursesLoaded, (state, action) => {
      return adapterSchoolCourse.addMany(action.schoolCourses, { ...state, schoolCoursesLoaded: true });
    }),

    on(SchoolCourseActionTypes.schoolCourseCreated, (state, action) => {
      return adapterSchoolCourse.addOne(action.schoolCourse, state);
    }),

    on(SchoolCourseActionTypes.deleteSchoolCourse, (state, action) => {
      return adapterSchoolCourse.removeOne(action.schoolCourseId, state);
    }),

    on(SchoolCourseActionTypes.updateSchoolCourse, (state, action) => {
      return adapterSchoolCourse.updateOne(action.update, state);
    }),

  )
  
  // ========================================== NGRX Store Selectors
  const { selectAll, selectIds } = adapterSchoolCourse.getSelectors();

  export const schoolCoursesFeatureSelector = createFeatureSelector<SchoolCourseState>(
    "schoolCourses"
  )

  export const selectAllSchoolCourses = createSelector(schoolCoursesFeatureSelector, selectAll );

  export const areSchoolCoursesLoaded = createSelector(
    schoolCoursesFeatureSelector,
    state => state.schoolCoursesLoaded
  )
  
  // ========================================== NGRX Store Effects
  @Injectable()
  export class SchoolCourseEffects {

    constructor(
      private schoolCourseService: SchoolCourseService,
      private actions$: Actions,
      private router: Router
    ) {}

    loadSchoolCourses$ = createEffect(() =>
      this.actions$.pipe(
        ofType(SchoolCourseActionTypes.loadSchoolCourses),
        concatMap(() => this.schoolCourseService.loadSchoolCourses()),
        map(schoolCourses => SchoolCourseActionTypes.schoolCoursesLoaded({ schoolCourses }))
      ),
      { dispatch: true }

    );

    createSchoolCourse$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SchoolCourseActionTypes.createSchoolCourse),
          tap(action => this.schoolCourseService.createSchoolCourse(action.schoolCourse)),
          map( action => SchoolCourseActionTypes.schoolCourseCreated({ schoolCourse: action.schoolCourse }))
        ),
      { dispatch: true }
    );

    deleteSchoolCourse$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SchoolCourseActionTypes.deleteSchoolCourse),
          tap(action => this.schoolCourseService.deleteSchoolCourse(action.schoolCourseId)),
        ),
      { dispatch: false }
    );

    updateSchoolCourse$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SchoolCourseActionTypes.updateSchoolCourse),
          tap(action => this.schoolCourseService.updateSchoolCourse(action.update.id.toString(), action.update.changes ) )
        ),
      { dispatch: false }
    );

  } //end of class
  