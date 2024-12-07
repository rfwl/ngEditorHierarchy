
    import { Injectable, inject } from "@angular/core"
    import { Observable, of } from "rxjs"
    import { map } from "rxjs/operators"
    import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from "@angular/fire/firestore"

    import { SchoolCourse } from "./school-course.model"

    @Injectable()
    export class SchoolCourseService {
      constructor() {

      }
      private firestore: Firestore = inject(Firestore)

      get path_col_SchoolCourses(): string {
        return "school-courses"
      }

      loadSchoolCourses(): Observable<SchoolCourse[]> {

        const itemCollection = collection(this.firestore, this.path_col_SchoolCourses)
        return collectionData(itemCollection).pipe( map( das => {
          return (das.map( da => {
            let obj = { ...da }
            let usr = new SchoolCourse()
            usr.fromValueObject(obj)
            return usr
          }))
        }))

      } // end of function

      createSchoolCourse(schoolCourse: any){
        setDoc(doc(this.firestore, this.path_col_SchoolCourses, schoolCourse.id), schoolCourse)
        .then(() => {
            //console.log("Document successfully Added!");
          }).catch((error: any) => {
            //console.error("Error adding document: ", error);
          })

      } // end of function

      deleteSchoolCourse(recId: string){

        deleteDoc(doc(this.firestore, this.path_col_SchoolCourses, recId))
        .then(() => {
          //console.log("Document successfully deleted!");
        }).catch((error: any) => {
          //console.error("Error deleting document: ", error);
        })

      } // end of function

      updateSchoolCourse( recId: string, changes: Partial<SchoolCourse> ) {
          var recChanges: any = { ...changes, id: recId, }
          setDoc(doc(this.firestore, this.path_col_SchoolCourses, recId), recChanges)
          .then(() => {
            //console.log("Document successfully updated!");
          }).catch((error: any) => {
            //console.error("Error updating document: ", error);
          })

      }  // end of function

    } // end of class
    