import { Injectable, inject } from "@angular/core"
import { Firestore } from "@angular/fire/firestore"
import { Observable, Subscription, of } from "rxjs"

@Injectable()
export class AppService {

  private firestore: Firestore = inject(Firestore)
  constructor( ) {

  }

  constantsObject: any
  selectorOption_valueArrayNames: string[]
  selectorOption_labelledValueArrayNames: string[]
  selectorOption_objectArrayNames: string[]



  loadConstantsObject(cnstObject: any){
    this.constantsObject = cnstObject

    this.selectorOption_valueArrayNames =[]
    if(this.constantsObject.valueArrays){
      const kys: string[] = Object.keys(this.constantsObject.valueArrays)
      if(kys && kys.length > 0){
        this.selectorOption_valueArrayNames = kys
      }
    }
    this.selectorOption_labelledValueArrayNames =[]
    if(this.constantsObject.labelledValueArrays){
      const kys: string[] = Object.keys(this.constantsObject.labelledValueArrays)
      if(kys && kys.length > 0){
        this.selectorOption_labelledValueArrayNames = kys
      }
    }
    this.selectorOption_objectArrayNames =[]
    if(this.constantsObject.objectArrays){
      const kys: string[] = Object.keys(this.constantsObject.objectArrays)
      if(kys && kys.length > 0){
        this.selectorOption_objectArrayNames = kys
      }
    }

  } // end of function

  get_selectorOption_ValueArray(aryName: string): any[]{
    if(this.constantsObject.valueArrays){
      return this.constantsObject.valueArrays[aryName]
    } else return undefined
  }

  get_selectorOption_LabelledValueArray(aryName: string): any[]{
    if(this.constantsObject.labelledValueArrays){
      return this.constantsObject.labelledValueArrays[aryName]
    } else return undefined
  }

  get_selectorOption_ObjectArray(aryName: string): any[]{
    if(this.constantsObject.objectArrays){
      return this.constantsObject.objectArrays[aryName]
    } else return undefined
  }



} // end of class

