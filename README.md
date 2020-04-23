# foodhat
Creating foodhat using node.js, express, angular, and socket.io


## TODO:
1. Refactor front-end and create a SocketIO Service
   - Create a service for google maps thing too. Might need to update the code all together
2. Add models where needed
3. Once `HatComponent` is refactored, refine interactions with SocketIO (e.g. what do do when restaurant selection is initiated)
4. Switch from sessions to JWT tokens and add authorization to SocketIO in backend
5. Switch to MongoDB

### Issues:
1. see issues page

### PROGRESS:
Added Redis for horizontal scaling and for in-memory data-store. Refactored `hat-socket` by adding supporting services.
