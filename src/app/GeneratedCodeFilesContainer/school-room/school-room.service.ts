
    import { Injectable, inject } from "@angular/core"
    import { Observable, of } from "rxjs"
    import { map } from "rxjs/operators"
    import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from "@angular/fire/firestore"

    import { SchoolRoom } from "./school-room.model"

    @Injectable()
    export class SchoolRoomService {
      constructor() {

      }
      private firestore: Firestore = inject(Firestore)

      get path_col_SchoolRooms(): string {
        return "school-rooms"
      }

      loadSchoolRooms(): Observable<SchoolRoom[]> {

        const itemCollection = collection(this.firestore, this.path_col_SchoolRooms)
        return collectionData(itemCollection).pipe( map( das => {
          return (das.map( da => {
            let obj = { ...da }
            let usr = new SchoolRoom()
            usr.fromValueObject(obj)
            return usr
          }))
        }))

      } // end of function

      createSchoolRoom(schoolRoom: any){
        setDoc(doc(this.firestore, this.path_col_SchoolRooms, schoolRoom.id), schoolRoom)
        .then(() => {
            //console.log("Document successfully Added!");
          }).catch((error: any) => {
            //console.error("Error adding document: ", error);
          })

      } // end of function

      deleteSchoolRoom(recId: string){

        deleteDoc(doc(this.firestore, this.path_col_SchoolRooms, recId))
        .then(() => {
          //console.log("Document successfully deleted!");
        }).catch((error: any) => {
          //console.error("Error deleting document: ", error);
        })

      } // end of function

      updateSchoolRoom( recId: string, changes: Partial<SchoolRoom> ) {
          var recChanges: any = { ...changes, id: recId, }
          setDoc(doc(this.firestore, this.path_col_SchoolRooms, recId), recChanges)
          .then(() => {
            //console.log("Document successfully updated!");
          }).catch((error: any) => {
            //console.error("Error updating document: ", error);
          })

      }  // end of function

    } // end of class
    