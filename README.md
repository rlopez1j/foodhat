# foodhat
Creating foodhat using node.js, express and socket.io

TODO:
1. connect webapp to mongodb (using index.js)

2. brainstorm ui

3. find which APIs to use (Googl Maps, Auth, etc)
  Might do this to hide the API keys later on
  https://hackernoon.com/how-to-use-environment-variables-keep-your-secret-keys-safe-secure-8b1a7877d69c

4. figure out "sessions" and userAuth

5. Create the actual functionality of the app:
  -adding users to hat session
  -selecting restaurant
  -displaying 'winning' restaurant

Bugs:

b.0: adblock extensions stop google places api from working
b.1: api is currently unrestricted and viewable client-side


Issues:

i.0: autocomplete does not work

HOWTO:FIX:

b1: create env-var for api key and store it there

PROGRESS:

routing has been setup
