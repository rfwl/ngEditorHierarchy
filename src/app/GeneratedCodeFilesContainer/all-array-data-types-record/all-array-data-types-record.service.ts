
    import { Injectable, inject } from "@angular/core"
    import { Observable, of } from "rxjs"
    import { map } from "rxjs/operators"
    import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from "@angular/fire/firestore"

    import { AllArrayDataTypesRecord } from "./all-array-data-types-record.model"

    @Injectable()
    export class AllArrayDataTypesRecordService {
      constructor() {

      }
      private firestore: Firestore = inject(Firestore)

      get path_col_AllArrayDataTypesRecords(): string {
        return "all-array-data-types-records"
      }

      loadAllArrayDataTypesRecords(): Observable<AllArrayDataTypesRecord[]> {

        const itemCollection = collection(this.firestore, this.path_col_AllArrayDataTypesRecords)
        return collectionData(itemCollection).pipe( map( das => {
          return (das.map( da => {
            let obj = { ...da }
            let usr = new AllArrayDataTypesRecord()
            usr.fromValueObject(obj)
            return usr
          }))
        }))

      } // end of function

      createAllArrayDataTypesRecord(allArrayDataTypesRecord: any){
        setDoc(doc(this.firestore, this.path_col_AllArrayDataTypesRecords, allArrayDataTypesRecord.id), allArrayDataTypesRecord)
        .then(() => {
            //console.log("Document successfully Added!");
          }).catch((error: any) => {
            //console.error("Error adding document: ", error);
          })

      } // end of function

      deleteAllArrayDataTypesRecord(recId: string){

        deleteDoc(doc(this.firestore, this.path_col_AllArrayDataTypesRecords, recId))
        .then(() => {
          //console.log("Document successfully deleted!");
        }).catch((error: any) => {
          //console.error("Error deleting document: ", error);
        })

      } // end of function

      updateAllArrayDataTypesRecord( recId: string, changes: Partial<AllArrayDataTypesRecord> ) {
          var recChanges: any = { ...changes, id: recId, }
          setDoc(doc(this.firestore, this.path_col_AllArrayDataTypesRecords, recId), recChanges)
          .then(() => {
            //console.log("Document successfully updated!");
          }).catch((error: any) => {
            //console.error("Error updating document: ", error);
          })

      }  // end of function

    } // end of class
    