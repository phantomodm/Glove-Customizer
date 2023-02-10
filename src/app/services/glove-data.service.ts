import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GloveDataService {

  constructor(private afs:AngularFirestore) { }

  getColors(){
    return this.afs.collection('gloveColors').valueChanges();
  }

  getSteps(){
    return this.afs.collection('gloveSteps', ref => ref.orderBy('seqNo','asc')).valueChanges();
  }

  getGloveSize(){
    return this.afs.collection('gloveSize',ref => ref.orderBy('seqNo','asc')).valueChanges();
  }

  getGloveWebs(){
    return this.afs.collection('gloveWebs').valueChanges();
  }

}
