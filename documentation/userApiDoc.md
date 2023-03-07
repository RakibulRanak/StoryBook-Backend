## User Api Docs

### 
- **Without any authorization** ( must be logged out )

    * Sign Up  : `POST /api/v1/users`
        -  Request Header
            
                Accept : application/json or application/xml
            
        -  Request Body
            ```json
                {
                    "username" : "aquaman",
                    "name" : "Md. Tarek",
                    "email" : "acquatarek@gmail.com",
                    "password":"1234678",
                    "confirmPassword":"12345678"
                }
            ```
        - Valid Request Field Requirements:
            - username can't be null
            - name can't be null
            - email can't be null
            - password must be between 8 to 15 chars
            - confirmPassword must match password
        
        &nbsp;

        - Valid Response
            
              Status: 201 Created  
            JSON Response
            ```json
                {
                    "status": "success",
                    "message": "User Created Successfully",
                    "data": {
                        "email": "acquatarek@gmail.com",
                        "name": "Md. Tarek",
                        "username": "aquaman"
                    }
                }       
            ```
            XML Response
            ```xml
                <?xml version='1.0'?>
                 <data>
                        <email>acquatarek@gmail.com</email>
                        <name>Md. Tarek</name>
                        <username>aquaman</username>
                </data>
            ```
            
        
   * Login User : `POST /api/v1/users/login`
        -  Request Body
            ```json
            {
                "email":"acquatarek@gmail.com",
                "password":"12345678"
            }
            ```
        - Valid Request Field Requirements:
            - username can't be null
            - password must be between 8 to 15 chars        
        &nbsp;
        - Valid Response ( returns with a jwt cookie )
        
              Status: 200 OK  
            JSON Response
            ```json
                {
                    "status": "success",
                    "message": "User looged In successfully",
                    "data": {
                        "email": "acquatarek@gmail.com",
                        "name": "Md. Tarek",
                        "username": "aquaman"
                    }
                }       
            ```
            XML Response
            ```xml
            <?xml version='1.0'?>
            <data>
                <email>rakibul05@student.sust.edu</email>
                <name>Rakibul Hasan</name>
                <username>RakibulRanak</username>
            </data>
            ```


### 
- **Authorized And Performed By User Himself**

   * Log Out User : `GET /api/v1/users/logout`

     - Valid Response
        
        Status: 200 OK  
        
        ```json
            {
                "status": "success",
                "message": "User looged Out successfully",
                "data": null
            }
        ```
