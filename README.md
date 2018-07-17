# foodhat
Creating foodhat using node.js, express, angular, and socket.io

## Code Style:
* functions will use Camel Case: `functionName()`
* variables will use lowercase with underscore: `var_name`
* global variables will use uppercase with underscore: `GLOBAL_NAME`
* object instances will use Title Case: `new ObjectInstance()`
* will use single quote `''` for strings, unless otherwise required
* Parentheses encasing arguments will not have space between them and the call: `if(args)`, `funcName(args)`, `for(i; 0; i)`
* braces will not have spaces after anything prior to it: `json_var{}`, `funcName(args){}`, `if(args){}`
* parameter arguments will be separated by spaces: `funcName(param1, param2)`, `for(i; 0; i)`
* **use tabs.**
* comments will have a space after comment operator: `// comment here`
* semicolons are not necessary. though if you use semicolons for a file, use them for the entirety of that file


## TODO:
1. Brainstorm UI
  - make things into modals
  - animations

2. Work on Socket.IO randomize algorithm

3. Design user interactions
    - who can add who to hats
    - decide how many restaurants each user can add
    - timeouts?
    - privacy settings(?)

4. Create the actual functionality of the app:
    - displaying 'winning' restaurant

5. Work on notifications
    - requires deployment

6. Have a live MVP

7. Update ComponentFactory to Angular Elements

8. Remove unnecessary files.


### Issues:
1. see issues page

### PROGRESS:

Users can create and join a hat. Users can add restaurants to the hat. All hat functions except selecting a winning restaurant have been completed.
