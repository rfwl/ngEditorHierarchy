
    import { Injectable, inject } from "@angular/core"
    import { Observable, of } from "rxjs"
    import { map } from "rxjs/operators"
    import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from "@angular/fire/firestore"

    import { SelectableOptionRecord } from "./selectable-option-record.model"

    @Injectable()
    export class SelectableOptionRecordService {
      constructor() {

      }
      private firestore: Firestore = inject(Firestore)

      get path_col_SelectableOptionRecords(): string {
        return "selectable-option-records"
      }

      loadSelectableOptionRecords(): Observable<SelectableOptionRecord[]> {

        const itemCollection = collection(this.firestore, this.path_col_SelectableOptionRecords)
        return collectionData(itemCollection).pipe( map( das => {
          return (das.map( da => {
            let obj = { ...da }
            let usr = new SelectableOptionRecord()
            usr.fromValueObject(obj)
            return usr
          }))
        }))

      } // end of function

      createSelectableOptionRecord(selectableOptionRecord: any){
        setDoc(doc(this.firestore, this.path_col_SelectableOptionRecords, selectableOptionRecord.id), selectableOptionRecord)
        .then(() => {
            //console.log("Document successfully Added!");
          }).catch((error: any) => {
            //console.error("Error adding document: ", error);
          })

      } // end of function

      deleteSelectableOptionRecord(recId: string){

        deleteDoc(doc(this.firestore, this.path_col_SelectableOptionRecords, recId))
        .then(() => {
          //console.log("Document successfully deleted!");
        }).catch((error: any) => {
          //console.error("Error deleting document: ", error);
        })

      } // end of function

      updateSelectableOptionRecord( recId: string, changes: Partial<SelectableOptionRecord> ) {
          var recChanges: any = { ...changes, id: recId, }
          setDoc(doc(this.firestore, this.path_col_SelectableOptionRecords, recId), recChanges)
          .then(() => {
            //console.log("Document successfully updated!");
          }).catch((error: any) => {
            //console.error("Error updating document: ", error);
          })

      }  // end of function

    } // end of class
    