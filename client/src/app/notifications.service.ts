import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import * as firebase from 'firebase'
import { Subject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
/**
    NOT FUNCTIONAL YET.

    A lot of the things here are not working
    and the methods have not been tweeked for
    my own enviroment/architecture.

    This is still in early development.
*/
@Injectable({
  providedIn: 'root'
})
export class NotificationsService{
  notifications = firebase.messaging()
  notif_source = new Subject()
  current_notif = this.notif_source.asObservable()

  constructor(private db: AngularFirestore){}

  getPermission(user){
    this.notifications.requestPermission()
    .then(()=>{
      console.log('notifs allowed')
      return this.notifications.getToken()
    })
    .then((token)=>{
      console.log('token: ', token)
      this.saveToken(user, token)
    })
    .catch((err)=>{
      console.log('error: ', err)
    })
  }

  pollToken(user){
    this.notifications.onTokenRefresh(()=>{
      this.notifications.getToken()
      .then((refreshed_token)=>{
        console.log('refreshed token: ', refreshed_token)
        this.saveToken(user, refreshed_token)
      })
      .catch((err)=>{
        console.log(err)
      })
    })
  }

  private saveToken(user, token): void{
    var fcm_ref = this.db.collection<string>('fcm').doc(user.email)

    fcm_ref.valueChanges().subscribe((current_token) =>{
      if(current_token != token){
        fcm_ref.update({fcm_token: token})
      }
    })
  }

  // do stuff to front end with this
  receiveNotifications(){
    this.notifications.onMessage((payload)=>{
      console.log('notif: ', payload)
      //this.notif_source.next(payload)
    })
  }
}
