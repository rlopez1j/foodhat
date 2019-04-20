const request = require('request')
const firebase = require('./local-firebase-api')
//might have key in api_keys


// add options
function sendPOSTRequest(sent_from, fcm_token, options){
  var notif_args = {title, body, click_action}

  switch(options.notif_type){
    case 'hat-invitation':
      notif_args.title = 'Hat Invitation!'
      notif_args.body = '@'+sent_from+' has invited you to join a hat!'
      notif_args.click_action = 'localhost:4200/?room='+options.room_name
      break
    case 'friend-request':
      notif_args.title = 'Friend Request!'
      notif_args.body = '@'+sent_from+' has sent you a friend request!'
      notif_args.click_action = 'localhost:4200/requests' // need to build this
      break
    case 'request-accepted':
      notif_args.title = 'Friend Request Accpted!'
      notif_args.body = '@'+sent_from+' has accepted your friend request!'
      notif_args.click_action = 'localhost:4200' // to user profile?
      break
  }


  request({
    url: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAAW_1G-i8:APA91bGMUDCMn7tXcAhCvJY0k6v8h7pMim9x8-z7cM4M0NOOI_Krk0j6FShEiPaXz9UikA1yXVaIwaq1azgVIxlTSNnJA4DQyXz3EDg1fUnp0gLBmB939Bz4ooKU2FkOZqhuvjxUF10I'
    },
    body: JSON.stringify(
      {
          'notification': {
            'title': notif_args.title,
            'body': notif_args.body,
            'click_action': notif_args.click_action,
          },
          'to': fcm_token
        }
    )
  }, (error, response, body)=>{
    if(error){
      console.log('error: ', error)
      console.log('response', response);
    }
  })
}
// may not need to return a promise
module.exports = {
  sendNotification: (sender, receiver, options)=>{
    return new Promise(function(resolve, reject){
      firebase.getFCM(receiver).then((token) =>{
         sendPOSTRequest(sender, token, options)
         resolve(true)
       })
    }).catch((err) =>{
        console.log('error: ', err)
        reject(err)
    })
  }
}
