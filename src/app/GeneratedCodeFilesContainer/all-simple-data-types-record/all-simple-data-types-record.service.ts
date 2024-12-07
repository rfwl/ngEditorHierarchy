
    import { Injectable, inject } from "@angular/core"
    import { Observable, of } from "rxjs"
    import { map } from "rxjs/operators"
    import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from "@angular/fire/firestore"

    import { AllSimpleDataTypesRecord } from "./all-simple-data-types-record.model"

    @Injectable()
    export class AllSimpleDataTypesRecordService {
      constructor() {

      }
      private firestore: Firestore = inject(Firestore)

      get path_col_AllSimpleDataTypesRecords(): string {
        return "all-simple-data-types-records"
      }

      loadAllSimpleDataTypesRecords(): Observable<AllSimpleDataTypesRecord[]> {

        const itemCollection = collection(this.firestore, this.path_col_AllSimpleDataTypesRecords)
        return collectionData(itemCollection).pipe( map( das => {
          return (das.map( da => {
            let obj = { ...da }
            let usr = new AllSimpleDataTypesRecord()
            usr.fromValueObject(obj)
            return usr
          }))
        }))

      } // end of function

      createAllSimpleDataTypesRecord(allSimpleDataTypesRecord: any){
        setDoc(doc(this.firestore, this.path_col_AllSimpleDataTypesRecords, allSimpleDataTypesRecord.id), allSimpleDataTypesRecord)
        .then(() => {
            //console.log("Document successfully Added!");
          }).catch((error: any) => {
            //console.error("Error adding document: ", error);
          })

      } // end of function

      deleteAllSimpleDataTypesRecord(recId: string){

        deleteDoc(doc(this.firestore, this.path_col_AllSimpleDataTypesRecords, recId))
        .then(() => {
          //console.log("Document successfully deleted!");
        }).catch((error: any) => {
          //console.error("Error deleting document: ", error);
        })

      } // end of function

      updateAllSimpleDataTypesRecord( recId: string, changes: Partial<AllSimpleDataTypesRecord> ) {
          var recChanges: any = { ...changes, id: recId, }
          setDoc(doc(this.firestore, this.path_col_AllSimpleDataTypesRecords, recId), recChanges)
          .then(() => {
            //console.log("Document successfully updated!");
          }).catch((error: any) => {
            //console.error("Error updating document: ", error);
          })

      }  // end of function

    } // end of class
    