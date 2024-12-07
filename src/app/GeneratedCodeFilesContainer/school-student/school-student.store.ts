
  import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
  import { createReducer, createAction, on, props } from "@ngrx/store";
  import { Update } from "@ngrx/entity";
  import { createSelector, createFeatureSelector } from "@ngrx/store";
  import { createEffect, Actions, ofType } from "@ngrx/effects";
  import { catchError, concatMap, find, map, mergeMap, tap } from "rxjs/operators";
  import { Injectable } from "@angular/core";
  import { Router } from "@angular/router";
  import { Observable } from "rxjs";

  import { SchoolStudent  } from "./school-student.model";
  import { SchoolStudentService } from "./school-student.service";
  
  // ========================================== NGRX Store State
  export interface SchoolStudentState extends EntityState<SchoolStudent> {
    schoolStudentsLoaded: boolean
    selectedSchoolStudent: SchoolStudent | undefined
  }
  export const adapterSchoolStudent: EntityAdapter<SchoolStudent> = createEntityAdapter<SchoolStudent>({
  });
  export const initialSchoolStudentState : SchoolStudentState = adapterSchoolStudent.getInitialState({
    schoolStudentsLoaded: false,
    selectedSchoolStudent: undefined,
  });
  
  // ========================================== NGRX Store Actions
  export const loadSchoolStudents = createAction(
    "[SchoolStudent List] Load SchoolStudents via Service"
  );

  export const schoolStudentsLoaded = createAction(
    "[SchoolStudent Effect] SchoolStudents Loaded Successfully",
    props<{ schoolStudents: SchoolStudent[] }>()
  );

  export const createSchoolStudent = createAction(
    "[Create SchoolStudent Component] Create SchoolStudent",
    props<{ schoolStudent: any }>()
  );

  export const schoolStudentCreated = createAction(
    "[Create SchoolStudent Component] SchoolStudent Created",
    props<{ schoolStudent: SchoolStudent }>()
  );

  export const deleteSchoolStudent = createAction(
    "[SchoolStudent List Operations] Delete SchoolStudent",
    props<{ schoolStudentId: string }>()
  );

  export const updateSchoolStudent = createAction(
    "[SchoolStudent List Operations] Update SchoolStudent",
    props<{ update: Update<SchoolStudent> }>()
  );

  export const selectSchoolStudent = createAction(
    "[SchoolStudent List Operations] Select SchoolStudent",
    props<{ selected: SchoolStudent }>()
  );

  export const SchoolStudentActionTypes = {
    loadSchoolStudents,
    schoolStudentsLoaded,
    createSchoolStudent,
    schoolStudentCreated,
    deleteSchoolStudent,
    updateSchoolStudent,
    selectSchoolStudent
  }
  
  // ========================================== NGRX Store Reducer
  export const schoolStudentReducer = createReducer(
    initialSchoolStudentState,

    on(SchoolStudentActionTypes.schoolStudentsLoaded, (state, action) => {
      return adapterSchoolStudent.addMany(action.schoolStudents, { ...state, schoolStudentsLoaded: true });
    }),

    on(SchoolStudentActionTypes.schoolStudentCreated, (state, action) => {
      return adapterSchoolStudent.addOne(action.schoolStudent, state);
    }),

    on(SchoolStudentActionTypes.deleteSchoolStudent, (state, action) => {
      return adapterSchoolStudent.removeOne(action.schoolStudentId, state);
    }),

    on(SchoolStudentActionTypes.updateSchoolStudent, (state, action) => {
      return adapterSchoolStudent.updateOne(action.update, state);
    }),

  )
  
  // ========================================== NGRX Store Selectors
  const { selectAll, selectIds } = adapterSchoolStudent.getSelectors();

  export const schoolStudentsFeatureSelector = createFeatureSelector<SchoolStudentState>(
    "schoolStudents"
  )

  export const selectAllSchoolStudents = createSelector(schoolStudentsFeatureSelector, selectAll );

  export const areSchoolStudentsLoaded = createSelector(
    schoolStudentsFeatureSelector,
    state => state.schoolStudentsLoaded
  )
  
  // ========================================== NGRX Store Effects
  @Injectable()
  export class SchoolStudentEffects {

    constructor(
      private schoolStudentService: SchoolStudentService,
      private actions$: Actions,
      private router: Router
    ) {}

    loadSchoolStudents$ = createEffect(() =>
      this.actions$.pipe(
        ofType(SchoolStudentActionTypes.loadSchoolStudents),
        concatMap(() => this.schoolStudentService.loadSchoolStudents()),
        map(schoolStudents => SchoolStudentActionTypes.schoolStudentsLoaded({ schoolStudents }))
      ),
      { dispatch: true }

    );

    createSchoolStudent$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SchoolStudentActionTypes.createSchoolStudent),
          tap(action => this.schoolStudentService.createSchoolStudent(action.schoolStudent)),
          map( action => SchoolStudentActionTypes.schoolStudentCreated({ schoolStudent: action.schoolStudent }))
        ),
      { dispatch: true }
    );

    deleteSchoolStudent$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SchoolStudentActionTypes.deleteSchoolStudent),
          tap(action => this.schoolStudentService.deleteSchoolStudent(action.schoolStudentId)),
        ),
      { dispatch: false }
    );

    updateSchoolStudent$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SchoolStudentActionTypes.updateSchoolStudent),
          tap(action => this.schoolStudentService.updateSchoolStudent(action.update.id.toString(), action.update.changes ) )
        ),
      { dispatch: false }
    );

  } //end of class
  