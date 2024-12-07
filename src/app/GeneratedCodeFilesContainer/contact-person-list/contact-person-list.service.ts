
    import { Injectable, inject } from "@angular/core"
    import { Observable, of } from "rxjs"
    import { map } from "rxjs/operators"
    import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from "@angular/fire/firestore"

    import { ContactPersonList } from "./contact-person-list.model"

    @Injectable()
    export class ContactPersonListService {
      constructor() {

      }
      private firestore: Firestore = inject(Firestore)

      get path_col_ContactPersonLists(): string {
        return "contact-person-lists"
      }

      loadContactPersonLists(): Observable<ContactPersonList[]> {

        const itemCollection = collection(this.firestore, this.path_col_ContactPersonLists)
        return collectionData(itemCollection).pipe( map( das => {
          return (das.map( da => {
            let obj = { ...da }
            let usr = new ContactPersonList()
            usr.fromValueObject(obj)
            return usr
          }))
        }))

      } // end of function

      createContactPersonList(contactPersonList: any){
        setDoc(doc(this.firestore, this.path_col_ContactPersonLists, contactPersonList.id), contactPersonList)
        .then(() => {
            //console.log("Document successfully Added!");
          }).catch((error: any) => {
            //console.error("Error adding document: ", error);
          })

      } // end of function

      deleteContactPersonList(recId: string){

        deleteDoc(doc(this.firestore, this.path_col_ContactPersonLists, recId))
        .then(() => {
          //console.log("Document successfully deleted!");
        }).catch((error: any) => {
          //console.error("Error deleting document: ", error);
        })

      } // end of function

      updateContactPersonList( recId: string, changes: Partial<ContactPersonList> ) {
          var recChanges: any = { ...changes, id: recId, }
          setDoc(doc(this.firestore, this.path_col_ContactPersonLists, recId), recChanges)
          .then(() => {
            //console.log("Document successfully updated!");
          }).catch((error: any) => {
            //console.error("Error updating document: ", error);
          })

      }  // end of function

    } // end of class
    