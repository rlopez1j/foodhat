docker pull redis
docker pull mongo

# need to specify what folder from host and container to mount 
docker run -dit -p 6379:6379 --name redis redis
docker run -dit -p 27017:27017 --name mongo mongo
