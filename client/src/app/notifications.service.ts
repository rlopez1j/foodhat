import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import * as firebase from 'firebase'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class NotificationsService{
  notifications = firebase.messaging()
  notif_source = new Subject()
  current_notif = this.notif_source.asObservable()

  constructor(private db: AngularFirestore){}

  getPermission(user){
    console.log('in getPermission()')
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
      console.log('do something here ', err)
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
    // figure what '|| {}' means, and change vars to fit my architecture
    const current_tokens = user.fcmTokens || {}
    if(!current_tokens[token]){ // it's an array?
      // might change this to fit my own architecture and run from backend
      // is it better to call backend to do this, or do it directly from angular?
      const user_ref = this.db.collection('users').doc(user.uid)
      const tokens = { ...current_tokens, [token]: true}
      user_ref.update({fcmTokens: tokens})
    }
  }

  receiveNotifications(){
    this.notifications.onMessage((payload)=>{
      console.log('notif: ', payload)
      this.notif_source.next(payload)
    })
  }
}
