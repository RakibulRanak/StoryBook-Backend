# Deployment

- ## Deploy docker image in heroku 
    1. heroku container:login
    2. heroku create appname  
    3. heroku container:push web --app appname
    4. heroku container:release web --app appname
    5. heroku logs --tail --app appname


    ** *change HOST to 0.0.0.0 before pushing image to heroku*
    
    ** *to deploy only the backend, no need to have a build folder in root repository*
 
 - ## Deploy server repository in heroku 
    1. heroku login
    2. heroku create appname  
    3. git init
    4. heroku git:remote -a appname
    5. git add .
    6. git commit -am "your message"
    7. git push heroku master

     ** *in the case of pushing the repository, all the .env variables has to be set in heroku by terminal or go to your app in heroku server> settings> reveal config vars> set all the config vars*

     ** *HOST has to be set 0.0.0.0*