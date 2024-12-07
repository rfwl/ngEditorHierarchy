
    import { Injectable, inject } from "@angular/core"
    import { Observable, of } from "rxjs"
    import { map } from "rxjs/operators"
    import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from "@angular/fire/firestore"

    import { DeliveryProduct } from "./delivery-product.model"

    @Injectable()
    export class DeliveryProductService {
      constructor() {

      }
      private firestore: Firestore = inject(Firestore)

      get path_col_DeliveryProducts(): string {
        return "delivery-products"
      }

      loadDeliveryProducts(): Observable<DeliveryProduct[]> {

        const itemCollection = collection(this.firestore, this.path_col_DeliveryProducts)
        return collectionData(itemCollection).pipe( map( das => {
          return (das.map( da => {
            let obj = { ...da }
            let usr = new DeliveryProduct()
            usr.fromValueObject(obj)
            return usr
          }))
        }))

      } // end of function

      createDeliveryProduct(deliveryProduct: any){
        setDoc(doc(this.firestore, this.path_col_DeliveryProducts, deliveryProduct.id), deliveryProduct)
        .then(() => {
            //console.log("Document successfully Added!");
          }).catch((error: any) => {
            //console.error("Error adding document: ", error);
          })

      } // end of function

      deleteDeliveryProduct(recId: string){

        deleteDoc(doc(this.firestore, this.path_col_DeliveryProducts, recId))
        .then(() => {
          //console.log("Document successfully deleted!");
        }).catch((error: any) => {
          //console.error("Error deleting document: ", error);
        })

      } // end of function

      updateDeliveryProduct( recId: string, changes: Partial<DeliveryProduct> ) {
          var recChanges: any = { ...changes, id: recId, }
          setDoc(doc(this.firestore, this.path_col_DeliveryProducts, recId), recChanges)
          .then(() => {
            //console.log("Document successfully updated!");
          }).catch((error: any) => {
            //console.error("Error updating document: ", error);
          })

      }  // end of function

    } // end of class
    