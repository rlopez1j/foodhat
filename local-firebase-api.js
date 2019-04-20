const firestore = require('./firebase')
FieldValue = require('firebase-admin').firestore.FieldValue
const notifications = require('./notifications')

/*
TODO:
  make sure addToOutgoing doesn't add duplicate entries
  test & debug
  check if some update methods need to return promise
*/

//probably need to make this a promise
function addSearchTerms(id, username){
  firestore.collection('users').doc(id)
    .update({'search':
      FieldValue.delete()})

  for(i = 1; i < username.length+1; i++){
    firestore.collection('users').doc(id)
      .update({'search':
        FieldValue.arrayUnion(username.slice(0,i))})
  }
}

function addToOutgoing(sender, requested){
  firestore.collection('friends').doc(sender)
  .update({'outgoing_requests':
    FieldValue.arrayUnion(requested)})
}

function addToIncoming(requested, sender){
  firestore.collection('friends').doc(requested)
  .update({'incoming_requests':
    FieldValue.arrayUnion(sender)})
}

function incomingToFriend(user, accepted){
  batch = firestore.batch()
  user_ref = firestore.collection('friends').doc(user)

  batch.update(user_ref, {'incoming_requests':
    FieldValue.arrayRemove(accepted)})
  batch.update(user_ref, {'friends_list':
    FieldValue.arrayUnion(accepted)})
  batch.commit()
}

function outgoingToFriend(user, accepted){
  batch = firestore.batch()
  user_ref = firestore.collection('friends').doc(user)
  batch.update(user_ref, {'outgoing_requests':
    FieldValue.arrayRemove(accepted)})
  batch.update(user_ref, {'friends_list':
    FieldValue.arrayUnion(accepted)})
  batch.commit()
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
            module.exports.getUserProfile(friend_username)
            .then((profile)=>{
              friends_list.push(profile)
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
          addSearchTerms(id, new_username)
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

  getFCM: (id)=>{
    return new Promise((resolve, reject)=>{
      firestore.collection('fcm').doc(id)
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
    addToOutgoing(sender, requested)
    addToIncoming(requested, sender)
  },

  acceptFriendRequest: (user, user_accepted)=>{
    incomingToFriend(user, user_accepted)
    outgoingToFriend(user_accepted, user)
  },

  rejectFriendRequest: (user, user_rejected)=>{
    user_ref = firestore.collection('friends').doc(user)
    rejected_ref = firestore.collection('friends').doc(user_rejected)

    user_ref.update({incoming_requests: FieldValue.arrayRemove(user_rejected)})
    rejected_ref.update({outgoing_requests: FieldValue.arrayRemove(user)})
  },

  // modify to work with friends only
  searchUser: (search_term)=>{
    return new Promise((resolve, reject)=>{
      firestore.collection('users').where('search', 'array-contains', search_term)
      .get()
      .then((user_list)=>{
        if(user_list._size > 0){
          user_list._docs().forEach((data)=>{
            profile = {
              username: data.data().username,
              id: data.data().id,
              name: data.data().name,
              photo: data.data().photo
            }
          })
          resolve(profile)
        } else{
          resolve(null)
        }
      }).catch((err)=>{
        console.log('err: ', err)
        reject(err)
      })
    })
  }

}
