# foodhat
Creating foodhat using node.js, express and socket.io

Code Style:
1. functions will use Camel Case: functionName()
2. variables will use lowercase with underscore: var_name
3. global variables will use uppercase with underscore: GLOBAL_NAME
4. object instances will use Title Case: new ObjectInstance()
5. will use single quote '' for strings, unless otherwise required
6. Parentheses encasing arguments will not have space between them and the call: if(args), funcName(args), for(i; 0; i)
7. braces will not have spaces after anything prior to it: json_var{}, funcName(args){}, if(args){}
8. parameter arguments will be separated by spaces: funcName(param1, param2), for(i; 0; i)
9. use tabs.
10. comments will have a space after comment operator: // comment here

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
