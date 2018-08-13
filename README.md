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
<ol>
  <li>Brainstorm UI
    <ul><li>make things into modals</li>
    <li>animations</li></ul>
  </li>
  <br>

  <li>Work on Socket.IO randomize algorithm</li>
  <br>

  <li>Design user interactions
    <ul><li> who can add who to hats</li>
    <li> decide how many restaurants each user can add</li>
    <li> timeouts?</li>
    <li> privacy settings(?)</li></ul>
  </li>
  <br>

  <li> Create the actual functionality of the app:
    <ul><li>displaying 'winning' restaurant</li></ul>
  </li>
  <br>

  <li>Work on notifications
    <ul><li>create notifications for different events</li></ul>
  </li>
  <br>

  <li>
    Update database schema
    <ul>
      <li>
        remove email from database, and use a firestore-generated uid instead
      </li>
      <li>
        update methods in local firestore api to reflect the schema changes
      </li>
    </ul>
  </li>
  <br>

  <li> Have a live MVP</li>
  <br>

  <li> Update ComponentFactory to Angular Elements</li>
  <br>

  <li> Remove unnecessary files.</li>
</ol>





### Issues:
1. see issues page

### PROGRESS:

All hat functions except selecting a winning restaurant have been completed. Notifications are functional. Need to work on interactions within users
