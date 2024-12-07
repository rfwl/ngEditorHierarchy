
    import { Injectable, inject } from "@angular/core"
    import { Observable, of } from "rxjs"
    import { map } from "rxjs/operators"
    import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from "@angular/fire/firestore"

    import { DeliveryContractor } from "./delivery-contractor.model"

    @Injectable()
    export class DeliveryContractorService {
      constructor() {

      }
      private firestore: Firestore = inject(Firestore)

      get path_col_DeliveryContractors(): string {
        return "delivery-contractors"
      }

      loadDeliveryContractors(): Observable<DeliveryContractor[]> {

        const itemCollection = collection(this.firestore, this.path_col_DeliveryContractors)
        return collectionData(itemCollection).pipe( map( das => {
          return (das.map( da => {
            let obj = { ...da }
            let usr = new DeliveryContractor()
            usr.fromValueObject(obj)
            return usr
          }))
        }))

      } // end of function

      createDeliveryContractor(deliveryContractor: any){
        setDoc(doc(this.firestore, this.path_col_DeliveryContractors, deliveryContractor.id), deliveryContractor)
        .then(() => {
            //console.log("Document successfully Added!");
          }).catch((error: any) => {
            //console.error("Error adding document: ", error);
          })

      } // end of function

      deleteDeliveryContractor(recId: string){

        deleteDoc(doc(this.firestore, this.path_col_DeliveryContractors, recId))
        .then(() => {
          //console.log("Document successfully deleted!");
        }).catch((error: any) => {
          //console.error("Error deleting document: ", error);
        })

      } // end of function

      updateDeliveryContractor( recId: string, changes: Partial<DeliveryContractor> ) {
          var recChanges: any = { ...changes, id: recId, }
          setDoc(doc(this.firestore, this.path_col_DeliveryContractors, recId), recChanges)
          .then(() => {
            //console.log("Document successfully updated!");
          }).catch((error: any) => {
            //console.error("Error updating document: ", error);
          })

      }  // end of function

    } // end of class
    