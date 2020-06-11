# foodhat
Creating foodhat using node.js, express, React (previuosly angular), and socket.io


## TODO:
1. Finish frontend rewrite
2. Add models where needed
3. Investigate if I should split Socket Service and backend api into two distinct microservices
4. Look into deployment strategies and possibly dockerize everything
   - see if I need k8


### Issues:
1. see issues page

### PROGRESS:
- Rebuilding frontend with React
- Switched from Sessions to JWT
- Changed to MogoDB from FireStore
- Added Redis for horizontal scaling and for in-memory data-store. Refactored `hat-socket` by adding supporting services.
