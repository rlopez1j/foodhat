const router = require('express').Router()
const db = require('../firebase')

/* this middlware function checks if there is an active session
   if req.user is empty, then there is no active session and
   the function will send a json object to communicate that w front-end */
const LogInStatus = (req, res, next) =>{
  if(!req.user){
    console.log('logged out') // for debugging
    res.send({signedOut: true})
  } else{
    next()
  }
}

router.get('/profile', LogInStatus, (req, res)=>{
  console.log('logged in') // for debugging
  res.send(req.user.data()) // sends the data from the cookie session
})

router.get('/check-username', (req, res)=>{
  db.collection('users').where('username', '==', req.query.username)
  .get().then(username =>{
    if(username._size == 0){ // if the size of query result is 0 then username is not in db
      res.send({avaiable: true})
    } else{
      res.send({avaiable: false})
    }
  }).catch(err =>{
    console.log('error: ', err)
  })
})

router.get('/get-history', (req, res)=>{
  history_list = {}
  n = 0
  db.collection('history').where('participants.'+req.user.data().username, '==', true)
  .get().then(history =>{
    history.forEach((doc)=>{
      history_list[n] = doc.data()
      n++
    })
    res.send(history_list)
  }

  )
})

router.get('/get-friends-list', (req, res)=>{
  list = {}
  n = 0
  db.collection('friends').doc(req.user.data().email)
  .get().then(friends =>{
      friends.data().friends_list.forEach((friend)=>{
        db.collection('users').where('username', '==', friend)
        .get().then((info)=>{
          info.forEach((friend_info)=>{
            list[n] = {
              username: friend_info.data().username,
              name: friend_info.data().name,
              photo: friend_info.data().photo
            }
        })
        n++
        if(friends.data().friends_list.length == n){ // I am not sure why this is the only way this works
          res.send(list)
        }
      })
    })
  })
})

router.post('/create-username', (req, res)=>{
  user = req.user.data() // gets user data from the session cookie

  db.collection('users').doc(user.email).update({username: req.body.username})
  .then(result =>{
    if(result){ // if result is null, then database was not updated
      res.send({success: true}) // json coomunicate w front-end
    }
  }).catch(err =>{ // hopefully this code will never run
    console.log('error: ', err)
    res.send({success: false})
  })
})

module.exports = router
