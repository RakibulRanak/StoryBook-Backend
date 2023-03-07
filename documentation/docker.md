# Steps To Follow For Dockerization : 

## 1. Write a docker file 
- [Dockerfile](../Dockerfile)
- [.dockerignore](../.dockerignore)

## 2. Create a docker image
    docker build -t storyapp . 

## 3. Push image ( rakibulranak/storyhub:app ) in dockerhub
    docker tag storyapp:latest rakibulranak/storyhub:app
    docker push rakibulranak/storyhub:app 

## 4. Pulling docker image and running in any machine
    docker pull rakibulranak/storyhub:app
    docker run -it -p 6000:8000 rakibulranak/storyhub/app
## 5. Browsing
     go to http://localhost:6000/
** *to create a docker image with frontend static files, build folder  of the frontend repository has to be put in the root folder and process.env.NODE_ENV of the backend must has to be 'production'*
## structure:
    public
        build
        media
            images

 
