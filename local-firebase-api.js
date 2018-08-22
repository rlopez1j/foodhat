const firestore = require('./firebase')
const notifications = require('./notifications')

/*
TODO:
  make sure addToOutgoing doesn't add duplicate entries
  test & debug
  check if some update methods need to return promise
*/

function addToOutgoing(sender, requested){
  return new Promise((resolve, reject)=>{
    firestore.collection('friends').doc(sender)
    .update({outgoing_requests: firestore.FieldValue.arrayUnion(requested)})
    .then((modified)=>{
      if(modified){
        resolve(true)
      } else{
        resolve(false)
      }
    }).catch((err)=>{
      console.log('error', err)
      reject(err)
    })
  })
}

function addToIncoming(reqested, sender){
  return new Promise((resolve, reject)=>{
    firestore.collection('friends').doc(requested)
    .update({incoming_requests: firestore.FieldValue.arrayUnion(sender)})
    .then((modified)=>{
      if(modified){
        resolve(true)
      } else{
        resolve(false)
      }
    }).catch((err)=>{
      console.log('error: ', err)
      reject(err)
    })
  })
}

module.exports = {
  // checks if a 'username' is in a 'user' collection
  isUsernameAvailable: (username)=>{
    return new Promise(function(resolve, reject){
      firestore.collection('users').where('username', '==', username)
      .get()
      .then(username =>{
        // `_size` is 0 if there are no documents found. i.e. username not database
        if(username._size == 0){
          resolve(true)
        } else{
          resolve(false)
        }
      }).catch((err)=>{
        console.log('error: ', err)
          reject(err)
      })
    })
  },

  // retrives all user hat-history
  getHistory: (username)=>{
    return new Promise(function(resolve, reject){
      // function variables
      user = 'participants.'+username
      user_history = new Array()

      // firestore operations and logic
      firestore.collection('history').where(user, '==', true)
      .get()
      .then(history =>{
        history.forEach((hat)=> user_history.push(hat.data()))
      }).catch((err)=>{
        console.log(err)
        reject(err)
      })
      resolve(user_history) // will most likely have same issue as `getFriendsDetails`
    })
  },

  // retrives a user's friends list along their information
  getFriendsDetails: (id)=>{
    return new Promise(function(resolve, reject){
      friends_list = new Array()

      // firestore operations and logic
      var test = firestore.collection('friends').doc(id)
      .get()
      .then(collection =>{

        // checks if the user has any friends. If they don't, send empty array
        if(collection.data().friends_list[0] == null){
          resolve(friends_list)
        } else{

          // iterates the friend's list and searches for friend's data with username
          collection.data().friends_list.forEach((friend_username)=>{
            firestore.collection('users').where('username', '==', friend_username)
            .get()
            .then((friend_data)=>{
              // update to use getProfile() method
              friend_data.forEach((friend)=>{
                friends_list.push({
                  username: friend.data().username,
                  name: friend.data().name,
                  photo: friend.data().photo
                })
              })
              /* `friends_list` must be sent within the scope of this promise
              if `friends_list` is not within the scope of this promise,
              an empty array is sent instead */
              if(collection.data().friends_list.length == friends_list.length){
                resolve(friends_list)
              }
            }).catch((err)=>{
              console.log('error: ', err);
              reject(err)
            })
          })
        }
      }).catch((err)=>{
        console.log('error: ', err);
        reject(err)
      })
    })
  },

  // updates the 'username' field of a user
  modifyUsername: (id, new_username)=>{
    return new Promise(function(resolve, reject){
      firestore.collection('users').doc(id)
      .update({username: new_username})
      .then(result =>{

        if(result){ // if result is null, then database was not updated
          resolve(true) // json coomunicate w front-end
        } else{
          resolve(false)
        }
      }).catch(err =>{ // hopefully this code will never run
        console.log('error: ', err)
        reject(err)
      })
    })
  },

  getUserProfile: (username)=>{
    return new Promise((resolve, reject)=>{
      firestore.collection('users').where('username', '==', username)
      .get()
      .then((user_data)=>{

        user_data.forEach((data)=>{
          profile = {
            username: data.data().username,
            id: data.data().id,
            name: data.data().name,
            photo: data.data().photo
          }
          resolve(profile)
        })
      }).catch((err)=>{
        console.log('error: ', err)
        reject(err)
      })
    })
  },

  getFCM: (username)=>{
    return new Promise((resolve, reject)=>{
      firestore.collection('fcm').doc(profile.id)
      .get()
      .then((fcm)=>{
        resolve(fcm.data().fcm_token)
      }).catch((err)=>{
        console.log('error: ', err)
        reject(err)
      })
    })
  },
// does this even need to return a promise?
  sendFriendRequest: (sender, requested)=>{
    return new Promise((resolve, reject)=>{
      addToOutgoing(sender, requested)
      .get((added)=>{
        if(added){
          addToIncoming(requested, sender)
          .get((added)=>{
            if(added){
              // send notification to requested
              notifications.sendNotification(sender, requested, {notif_type: 'friend-request'})
              resolve(true)
            } else{
              resolve(false)
            }
          }).catch((err)=>{
            console.log('error: ', err)
            reject(err)
          })
        } else{
          resolve(false)
        }
      }).catch((err)=>{
        console.log('error: ', err)
        reject(err)
      })
    })
  },

  acceptFriendRequest: (user, user_accepted)=>{
    user_ref = firestore.collection('friends').doc(user)
    accepted_ref = firestore.collection('friends').doc(user_accepted)

    user_ref.update({incoming_requests: firestore.FieldValue.arrayRemove(user_accepted)})
    user_ref.update({friends_list: firestore.FieldValue.arrayUnion(user_accepted)})

    accepted_ref.update({outgoing_requests: firestore.FieldValue.arrayRemove(user)})
    accepted_ref.update({friends_list: firestore.FieldValue.arrayUnion(user_accepted)})
    // send notification to user_accepted
    notifications.sendNotification(user_accepted, user, {notif_type: 'request-accepted'})
  },

  rejectFriendRequest: (user, user_rejected)=>{
    user_ref = firestore.collection('friends').doc(user)
    rejected_ref = firestore.collection('friends').doc(user_rejected)

    user_ref.update({incoming_requests: firestore.FieldValue.arrayRemove(user_rejected)})
    rejected_ref.update({outgoing_requests: firestore.FieldValue.arrayRemove(user)})
  }

}
