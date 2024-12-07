
    import { Injectable, inject } from "@angular/core"
    import { Observable, of } from "rxjs"
    import { map } from "rxjs/operators"
    import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from "@angular/fire/firestore"

    import { ProjectDiaryRecord } from "./project-diary-record.model"

    @Injectable()
    export class ProjectDiaryRecordService {
      constructor() {

      }
      private firestore: Firestore = inject(Firestore)

      get path_col_ProjectDiaryRecords(): string {
        return "project-diary-records"
      }

      loadProjectDiaryRecords(): Observable<ProjectDiaryRecord[]> {

        const itemCollection = collection(this.firestore, this.path_col_ProjectDiaryRecords)
        return collectionData(itemCollection).pipe( map( das => {
          return (das.map( da => {
            let obj = { ...da }
            let usr = new ProjectDiaryRecord()
            usr.fromValueObject(obj)
            return usr
          }))
        }))

      } // end of function

      createProjectDiaryRecord(projectDiaryRecord: any){
        setDoc(doc(this.firestore, this.path_col_ProjectDiaryRecords, projectDiaryRecord.id), projectDiaryRecord)
        .then(() => {
            //console.log("Document successfully Added!");
          }).catch((error: any) => {
            //console.error("Error adding document: ", error);
          })

      } // end of function

      deleteProjectDiaryRecord(recId: string){

        deleteDoc(doc(this.firestore, this.path_col_ProjectDiaryRecords, recId))
        .then(() => {
          //console.log("Document successfully deleted!");
        }).catch((error: any) => {
          //console.error("Error deleting document: ", error);
        })

      } // end of function

      updateProjectDiaryRecord( recId: string, changes: Partial<ProjectDiaryRecord> ) {
          var recChanges: any = { ...changes, id: recId, }
          setDoc(doc(this.firestore, this.path_col_ProjectDiaryRecords, recId), recChanges)
          .then(() => {
            //console.log("Document successfully updated!");
          }).catch((error: any) => {
            //console.error("Error updating document: ", error);
          })

      }  // end of function

    } // end of class
    