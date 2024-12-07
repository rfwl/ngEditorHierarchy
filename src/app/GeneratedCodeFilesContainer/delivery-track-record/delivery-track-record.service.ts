
    import { Injectable, inject } from "@angular/core"
    import { Observable, of } from "rxjs"
    import { map } from "rxjs/operators"
    import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from "@angular/fire/firestore"

    import { DeliveryTrackRecord } from "./delivery-track-record.model"

    @Injectable()
    export class DeliveryTrackRecordService {
      constructor() {

      }
      private firestore: Firestore = inject(Firestore)

      get path_col_DeliveryTrackRecords(): string {
        return "delivery-track-records"
      }

      loadDeliveryTrackRecords(): Observable<DeliveryTrackRecord[]> {

        const itemCollection = collection(this.firestore, this.path_col_DeliveryTrackRecords)
        return collectionData(itemCollection).pipe( map( das => {
          return (das.map( da => {
            let obj = { ...da }
            let usr = new DeliveryTrackRecord()
            usr.fromValueObject(obj)
            return usr
          }))
        }))

      } // end of function

      createDeliveryTrackRecord(deliveryTrackRecord: any){
        setDoc(doc(this.firestore, this.path_col_DeliveryTrackRecords, deliveryTrackRecord.id), deliveryTrackRecord)
        .then(() => {
            //console.log("Document successfully Added!");
          }).catch((error: any) => {
            //console.error("Error adding document: ", error);
          })

      } // end of function

      deleteDeliveryTrackRecord(recId: string){

        deleteDoc(doc(this.firestore, this.path_col_DeliveryTrackRecords, recId))
        .then(() => {
          //console.log("Document successfully deleted!");
        }).catch((error: any) => {
          //console.error("Error deleting document: ", error);
        })

      } // end of function

      updateDeliveryTrackRecord( recId: string, changes: Partial<DeliveryTrackRecord> ) {
          var recChanges: any = { ...changes, id: recId, }
          setDoc(doc(this.firestore, this.path_col_DeliveryTrackRecords, recId), recChanges)
          .then(() => {
            //console.log("Document successfully updated!");
          }).catch((error: any) => {
            //console.error("Error updating document: ", error);
          })

      }  // end of function

    } // end of class
    