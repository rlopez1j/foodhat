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
11. semicolons are not necessary. though if you use semicolons for a file, use them for the entirety of that file

TODO:
1. brainstorm ui

2. Have user select username after signing up.
  -Pull user history from FireStore to the home page.

3. Work on Socket.IO functionality

4. Design user interactions
  -who can add who to hats
  -privacy settings(?)

5. Create the actual functionality of the app:
  -adding users to hat session
  -selecting restaurant
  -displaying 'winning' restaurant

6. Work on notifications
   -requires deployment

6. Finish backend API to start mobile app

7. have a live MVP


Bugs:

b.0: adblock extensions stop google places api from working

b.1: api is currently unrestricted and viewable client-side


Issues:

i.0: autocomplete does not work

PROGRESS:

firebase compatibility has been added. Database of choice is going to be FireStore. User authentication for Google is working.
Angular has been connected to the backend. Homepage for logged in users will be created soon.
