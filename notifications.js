const request = require('request')
const firebase = require('./local-firebase-api')
//might have key in api_keys

// add options
function sendPOSTRequest(sender, fcm_token, room_name){
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
            'title': 'Hat Invitation!',
            'body': '@'+sender+' has invited you to join a hat!',
            'click_action': 'localhost:4200/?room='+room_name,
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
  sendNotification: (sender, receiver, room_name)=>{
    return new Promise(function(resolve, reject){
      firebase.getFCM(receiver).then((token) =>{
         sendPOSTRequest(sender, token, room_name)
         resolve(true)
       })
    }).catch((err) =>{
        console.log('error: ', err)
        reject(err)
    })
  }
}
