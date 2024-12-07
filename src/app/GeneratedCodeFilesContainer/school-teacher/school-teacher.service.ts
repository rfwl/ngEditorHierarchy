
    import { Injectable, inject } from "@angular/core"
    import { Observable, of } from "rxjs"
    import { map } from "rxjs/operators"
    import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from "@angular/fire/firestore"

    import { SchoolTeacher } from "./school-teacher.model"

    @Injectable()
    export class SchoolTeacherService {
      constructor() {

      }
      private firestore: Firestore = inject(Firestore)

      get path_col_SchoolTeachers(): string {
        return "school-teachers"
      }

      loadSchoolTeachers(): Observable<SchoolTeacher[]> {

        const itemCollection = collection(this.firestore, this.path_col_SchoolTeachers)
        return collectionData(itemCollection).pipe( map( das => {
          return (das.map( da => {
            let obj = { ...da }
            let usr = new SchoolTeacher()
            usr.fromValueObject(obj)
            return usr
          }))
        }))

      } // end of function

      createSchoolTeacher(schoolTeacher: any){
        setDoc(doc(this.firestore, this.path_col_SchoolTeachers, schoolTeacher.id), schoolTeacher)
        .then(() => {
            //console.log("Document successfully Added!");
          }).catch((error: any) => {
            //console.error("Error adding document: ", error);
          })

      } // end of function

      deleteSchoolTeacher(recId: string){

        deleteDoc(doc(this.firestore, this.path_col_SchoolTeachers, recId))
        .then(() => {
          //console.log("Document successfully deleted!");
        }).catch((error: any) => {
          //console.error("Error deleting document: ", error);
        })

      } // end of function

      updateSchoolTeacher( recId: string, changes: Partial<SchoolTeacher> ) {
          var recChanges: any = { ...changes, id: recId, }
          setDoc(doc(this.firestore, this.path_col_SchoolTeachers, recId), recChanges)
          .then(() => {
            //console.log("Document successfully updated!");
          }).catch((error: any) => {
            //console.error("Error updating document: ", error);
          })

      }  // end of function

    } // end of class
    