
    import { Injectable, inject } from "@angular/core"
    import { Observable, of } from "rxjs"
    import { map } from "rxjs/operators"
    import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from "@angular/fire/firestore"

    import { DeliveryStore } from "./delivery-store.model"

    @Injectable()
    export class DeliveryStoreService {
      constructor() {

      }
      private firestore: Firestore = inject(Firestore)

      get path_col_DeliveryStores(): string {
        return "delivery-stores"
      }

      loadDeliveryStores(): Observable<DeliveryStore[]> {

        const itemCollection = collection(this.firestore, this.path_col_DeliveryStores)
        return collectionData(itemCollection).pipe( map( das => {
          return (das.map( da => {
            let obj = { ...da }
            let usr = new DeliveryStore()
            usr.fromValueObject(obj)
            return usr
          }))
        }))

      } // end of function

      createDeliveryStore(deliveryStore: any){
        setDoc(doc(this.firestore, this.path_col_DeliveryStores, deliveryStore.id), deliveryStore)
        .then(() => {
            //console.log("Document successfully Added!");
          }).catch((error: any) => {
            //console.error("Error adding document: ", error);
          })

      } // end of function

      deleteDeliveryStore(recId: string){

        deleteDoc(doc(this.firestore, this.path_col_DeliveryStores, recId))
        .then(() => {
          //console.log("Document successfully deleted!");
        }).catch((error: any) => {
          //console.error("Error deleting document: ", error);
        })

      } // end of function

      updateDeliveryStore( recId: string, changes: Partial<DeliveryStore> ) {
          var recChanges: any = { ...changes, id: recId, }
          setDoc(doc(this.firestore, this.path_col_DeliveryStores, recId), recChanges)
          .then(() => {
            //console.log("Document successfully updated!");
          }).catch((error: any) => {
            //console.error("Error updating document: ", error);
          })

      }  // end of function

    } // end of class
    