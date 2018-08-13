const firestore = require('./firebase')

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
  getFriendsDetails: (email)=>{
    return new Promise(function(resolve, reject){
      friends_list = new Array()

      // firestore operations and logic
      var test = firestore.collection('friends').doc(email)
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
  modifyUsername: (email, new_username)=>{
    return new Promise(function(resolve, reject){
      firestore.collection('users').doc(email)
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

  getUserProfile: (username, get_email=false)=>{
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
          if(get_email == true)
            profile['email'] = data.data().email
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
      module.exports.getUserProfile(username, get_email=true)
      .then((profile)=>{
        firestore.collection('fcm').doc(profile.email)
        .get()
        .then((fcm)=>{
          resolve(fcm.data().fcm_token)
        }).catch((err)=>{
          console.log('error: ', err)
          reject(err)
        })
      })
    })
  },

  sendFriendRequest: (sender, requested)=>{
    return new Promise((resolve, reject)=>{
      addToOutgoing(sender, requested)
      .get((added)=>{
        if(added){
          addToIncoming(requested, sender)
          .get((added)=>{
            if(added){
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
  }
}
