docker build . -t muzio-backend
docker rm -f muzio-backend
docker run --name=muzio-backend --restart=always --network=my-network -d muzio-backend