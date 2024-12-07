
  import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
  import { createReducer, createAction, on, props } from "@ngrx/store";
  import { Update } from "@ngrx/entity";
  import { createSelector, createFeatureSelector } from "@ngrx/store";
  import { createEffect, Actions, ofType } from "@ngrx/effects";
  import { catchError, concatMap, find, map, mergeMap, tap } from "rxjs/operators";
  import { Injectable } from "@angular/core";
  import { Router } from "@angular/router";
  import { Observable } from "rxjs";

  import { SchoolRoom  } from "./school-room.model";
  import { SchoolRoomService } from "./school-room.service";
  
  // ========================================== NGRX Store State
  export interface SchoolRoomState extends EntityState<SchoolRoom> {
    schoolRoomsLoaded: boolean
    selectedSchoolRoom: SchoolRoom | undefined
  }
  export const adapterSchoolRoom: EntityAdapter<SchoolRoom> = createEntityAdapter<SchoolRoom>({
  });
  export const initialSchoolRoomState : SchoolRoomState = adapterSchoolRoom.getInitialState({
    schoolRoomsLoaded: false,
    selectedSchoolRoom: undefined,
  });
  
  // ========================================== NGRX Store Actions
  export const loadSchoolRooms = createAction(
    "[SchoolRoom List] Load SchoolRooms via Service"
  );

  export const schoolRoomsLoaded = createAction(
    "[SchoolRoom Effect] SchoolRooms Loaded Successfully",
    props<{ schoolRooms: SchoolRoom[] }>()
  );

  export const createSchoolRoom = createAction(
    "[Create SchoolRoom Component] Create SchoolRoom",
    props<{ schoolRoom: any }>()
  );

  export const schoolRoomCreated = createAction(
    "[Create SchoolRoom Component] SchoolRoom Created",
    props<{ schoolRoom: SchoolRoom }>()
  );

  export const deleteSchoolRoom = createAction(
    "[SchoolRoom List Operations] Delete SchoolRoom",
    props<{ schoolRoomId: string }>()
  );

  export const updateSchoolRoom = createAction(
    "[SchoolRoom List Operations] Update SchoolRoom",
    props<{ update: Update<SchoolRoom> }>()
  );

  export const selectSchoolRoom = createAction(
    "[SchoolRoom List Operations] Select SchoolRoom",
    props<{ selected: SchoolRoom }>()
  );

  export const SchoolRoomActionTypes = {
    loadSchoolRooms,
    schoolRoomsLoaded,
    createSchoolRoom,
    schoolRoomCreated,
    deleteSchoolRoom,
    updateSchoolRoom,
    selectSchoolRoom
  }
  
  // ========================================== NGRX Store Reducer
  export const schoolRoomReducer = createReducer(
    initialSchoolRoomState,

    on(SchoolRoomActionTypes.schoolRoomsLoaded, (state, action) => {
      return adapterSchoolRoom.addMany(action.schoolRooms, { ...state, schoolRoomsLoaded: true });
    }),

    on(SchoolRoomActionTypes.schoolRoomCreated, (state, action) => {
      return adapterSchoolRoom.addOne(action.schoolRoom, state);
    }),

    on(SchoolRoomActionTypes.deleteSchoolRoom, (state, action) => {
      return adapterSchoolRoom.removeOne(action.schoolRoomId, state);
    }),

    on(SchoolRoomActionTypes.updateSchoolRoom, (state, action) => {
      return adapterSchoolRoom.updateOne(action.update, state);
    }),

  )
  
  // ========================================== NGRX Store Selectors
  const { selectAll, selectIds } = adapterSchoolRoom.getSelectors();

  export const schoolRoomsFeatureSelector = createFeatureSelector<SchoolRoomState>(
    "schoolRooms"
  )

  export const selectAllSchoolRooms = createSelector(schoolRoomsFeatureSelector, selectAll );

  export const areSchoolRoomsLoaded = createSelector(
    schoolRoomsFeatureSelector,
    state => state.schoolRoomsLoaded
  )
  
  // ========================================== NGRX Store Effects
  @Injectable()
  export class SchoolRoomEffects {

    constructor(
      private schoolRoomService: SchoolRoomService,
      private actions$: Actions,
      private router: Router
    ) {}

    loadSchoolRooms$ = createEffect(() =>
      this.actions$.pipe(
        ofType(SchoolRoomActionTypes.loadSchoolRooms),
        concatMap(() => this.schoolRoomService.loadSchoolRooms()),
        map(schoolRooms => SchoolRoomActionTypes.schoolRoomsLoaded({ schoolRooms }))
      ),
      { dispatch: true }

    );

    createSchoolRoom$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SchoolRoomActionTypes.createSchoolRoom),
          tap(action => this.schoolRoomService.createSchoolRoom(action.schoolRoom)),
          map( action => SchoolRoomActionTypes.schoolRoomCreated({ schoolRoom: action.schoolRoom }))
        ),
      { dispatch: true }
    );

    deleteSchoolRoom$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SchoolRoomActionTypes.deleteSchoolRoom),
          tap(action => this.schoolRoomService.deleteSchoolRoom(action.schoolRoomId)),
        ),
      { dispatch: false }
    );

    updateSchoolRoom$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(SchoolRoomActionTypes.updateSchoolRoom),
          tap(action => this.schoolRoomService.updateSchoolRoom(action.update.id.toString(), action.update.changes ) )
        ),
      { dispatch: false }
    );

  } //end of class
  