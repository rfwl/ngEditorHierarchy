
    import { Injectable, inject } from "@angular/core"
    import { Observable, of } from "rxjs"
    import { map } from "rxjs/operators"
    import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from "@angular/fire/firestore"

    import { SchoolStudent } from "./school-student.model"

    @Injectable()
    export class SchoolStudentService {
      constructor() {

      }
      private firestore: Firestore = inject(Firestore)

      get path_col_SchoolStudents(): string {
        return "school-students"
      }

      loadSchoolStudents(): Observable<SchoolStudent[]> {

        const itemCollection = collection(this.firestore, this.path_col_SchoolStudents)
        return collectionData(itemCollection).pipe( map( das => {
          return (das.map( da => {
            let obj = { ...da }
            let usr = new SchoolStudent()
            usr.fromValueObject(obj)
            return usr
          }))
        }))

      } // end of function

      createSchoolStudent(schoolStudent: any){
        setDoc(doc(this.firestore, this.path_col_SchoolStudents, schoolStudent.id), schoolStudent)
        .then(() => {
            //console.log("Document successfully Added!");
          }).catch((error: any) => {
            //console.error("Error adding document: ", error);
          })

      } // end of function

      deleteSchoolStudent(recId: string){

        deleteDoc(doc(this.firestore, this.path_col_SchoolStudents, recId))
        .then(() => {
          //console.log("Document successfully deleted!");
        }).catch((error: any) => {
          //console.error("Error deleting document: ", error);
        })

      } // end of function

      updateSchoolStudent( recId: string, changes: Partial<SchoolStudent> ) {
          var recChanges: any = { ...changes, id: recId, }
          setDoc(doc(this.firestore, this.path_col_SchoolStudents, recId), recChanges)
          .then(() => {
            //console.log("Document successfully updated!");
          }).catch((error: any) => {
            //console.error("Error updating document: ", error);
          })

      }  // end of function

    } // end of class
    