
    import { Injectable, inject } from "@angular/core"
    import { Observable, of } from "rxjs"
    import { map } from "rxjs/operators"
    import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from "@angular/fire/firestore"

    import { SchoolClass } from "./school-class.model"

    @Injectable()
    export class SchoolClassService {
      constructor() {

      }
      private firestore: Firestore = inject(Firestore)

      get path_col_SchoolClasses(): string {
        return "school-classes"
      }

      loadSchoolClasses(): Observable<SchoolClass[]> {

        const itemCollection = collection(this.firestore, this.path_col_SchoolClasses)
        return collectionData(itemCollection).pipe( map( das => {
          return (das.map( da => {
            let obj = { ...da }
            let usr = new SchoolClass()
            usr.fromValueObject(obj)
            return usr
          }))
        }))

      } // end of function

      createSchoolClass(schoolClass: any){
        setDoc(doc(this.firestore, this.path_col_SchoolClasses, schoolClass.id), schoolClass)
        .then(() => {
            //console.log("Document successfully Added!");
          }).catch((error: any) => {
            //console.error("Error adding document: ", error);
          })

      } // end of function

      deleteSchoolClass(recId: string){

        deleteDoc(doc(this.firestore, this.path_col_SchoolClasses, recId))
        .then(() => {
          //console.log("Document successfully deleted!");
        }).catch((error: any) => {
          //console.error("Error deleting document: ", error);
        })

      } // end of function

      updateSchoolClass( recId: string, changes: Partial<SchoolClass> ) {
          var recChanges: any = { ...changes, id: recId, }
          setDoc(doc(this.firestore, this.path_col_SchoolClasses, recId), recChanges)
          .then(() => {
            //console.log("Document successfully updated!");
          }).catch((error: any) => {
            //console.error("Error updating document: ", error);
          })

      }  // end of function

    } // end of class
    