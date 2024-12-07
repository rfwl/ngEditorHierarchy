
    import { Injectable, inject } from "@angular/core"
    import { Observable, of } from "rxjs"
    import { map } from "rxjs/operators"
    import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from "@angular/fire/firestore"

    import { SelectableFieldRecord } from "./selectable-field-record.model"

    @Injectable()
    export class SelectableFieldRecordService {
      constructor() {

      }
      private firestore: Firestore = inject(Firestore)

      get path_col_SelectableFieldRecords(): string {
        return "selectable-field-records"
      }

      loadSelectableFieldRecords(): Observable<SelectableFieldRecord[]> {

        const itemCollection = collection(this.firestore, this.path_col_SelectableFieldRecords)
        return collectionData(itemCollection).pipe( map( das => {
          return (das.map( da => {
            let obj = { ...da }
            let usr = new SelectableFieldRecord()
            usr.fromValueObject(obj)
            return usr
          }))
        }))

      } // end of function

      createSelectableFieldRecord(selectableFieldRecord: any){
        setDoc(doc(this.firestore, this.path_col_SelectableFieldRecords, selectableFieldRecord.id), selectableFieldRecord)
        .then(() => {
            //console.log("Document successfully Added!");
          }).catch((error: any) => {
            //console.error("Error adding document: ", error);
          })

      } // end of function

      deleteSelectableFieldRecord(recId: string){

        deleteDoc(doc(this.firestore, this.path_col_SelectableFieldRecords, recId))
        .then(() => {
          //console.log("Document successfully deleted!");
        }).catch((error: any) => {
          //console.error("Error deleting document: ", error);
        })

      } // end of function

      updateSelectableFieldRecord( recId: string, changes: Partial<SelectableFieldRecord> ) {
          var recChanges: any = { ...changes, id: recId, }
          setDoc(doc(this.firestore, this.path_col_SelectableFieldRecords, recId), recChanges)
          .then(() => {
            //console.log("Document successfully updated!");
          }).catch((error: any) => {
            //console.error("Error updating document: ", error);
          })

      }  // end of function

    } // end of class
    