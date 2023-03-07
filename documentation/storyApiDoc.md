## Story Api Docs

### 
- **Without any authorization**

    * Get All Stories  : `GET /api/v1/stories`
        -  Request Header
            
               Accept : application/json or application/xml
        - Valid Response

              Status: 200 OK
            JSON Response
            ```json
                {
                    "status": "success",
                    "message": "Stories fetched successfully",
                    "data": [
                        {
                            "id": 195,
                            "title": "Please don't post anything unacceptable!!",
                            "story": "If you are visiting this site, and want to test functionalities, you are kindly requested to open an account with fair username and post decent contents.",
                            "author": "RakibulRanak",
                            "postedAt": "2021-11-30T09:20:23.785Z"
                        },
                        {
                            "id": 194,
                            "title": "সমুদ্র",
                            "story": "সমুদ্র বিশাল।সমুদ্রপানে তাকালে নিজেকে খুবই ক্ষুদ্র মনে হয়।পৃথিবীর কোনো এক প্রান্তে,যেখানে আকাশ মিলেছে সমুদ্রের সাথে,যেখানে বাতাসের সাথে গা ভাসায় বিস্তৃত ঢেউরাজি",
                            "author": "RakibulRanak",
                            "postedAt": "2021-11-30T09:14:00.787Z"
                        },
                        {
                            "id": 193,
                            "title": "একাকী দ্বীপ",
                            "story": "আমি যদি কোনো এক দ্বীপে একাকী থাকতে পারতাম! যে দ্বীপ হবে অরণ্য শোভিত ,স্বচ্ছ পানি প্রবেশ করবে যার হৃদয় চিরে । সেখানে আকাশ হবে বিশাল-বিস্তৃত,যে আকাশ থাকবে স্বচ্ছ সাদা মেঘে ঢাকা ।" ,
                            "author": "RakibulRanak",
                            "postedAt": "2021-11-30T09:11:29.272Z"
                        }
                    ]
                }
            ```
            XML Response
            ```xml
            <?xml version='1.0'?>
            <data>
                <data>
                    <id>9</id>
                    <title>Hello World</title>
                    <story>Once upon a time.......</story>
                    <author>acquaman</author>
                    <postedAt>Mon Nov 15 2021 13:41:51 GMT+0600 (Bangladesh Standard Time)</postedAt>
                </data>
                <data>
                    <id>8</id>
                    <title>Why do we live?</title>
                    <story>Once upon a time.......</story>
                    <author>RakibulRanak</author>
                    <postedAt>Mon Nov 15 2021 13:41:42 GMT+0600 (Bangladesh Standard Time)</postedAt>
                </data>
            </data>
            ```
       
    * Get A Single Story : `GET /api/v1/stories/:storyId`
        -  Request Header
            
               Accept : application/json or application/xml
         - Valid Response
            
               Status: 200 OK
            JSON Response
            ```json
                {
                    "status": "success",
                    "message": "Story fetched successfully",
                    "data": {
                        "id": 59,
                        "title": "Hello World",
                        "story": "What do you think about your world?...",
                        "author": "acquaman",
                        "postedAt": "2021-11-19T06:01:20.380Z"
                    }
                }
            ```
            XML Response
            ```xml
                 <?xml version='1.0'?>
                 <data>
                    <id>9</id>
                    <title>Hello World</title>
                    <story>Once upon a time.......</story>
                    <author>acquaman</author>
                    <postedAt>Mon Nov 15 2021 13:41:51 GMT+0600 (Bangladesh Standard Time)</postedAt>
                </data>
            ```

### 
- **Authorized And Performed By User Himself** ( *jwt cookie must be included with request* )

   * Post A Story : `POST /api/v1/stories`

        -  Request Header
            
               Accept : application/json or application/xml
        - Request Body
    
            ```json
            {
                "title" : "Brave Lion",
                "story" : "Once upon a time a lion lived in a jungle. ....."
            }
            ```

        - Valid Response
            
              Status: 201 Created
            JSON Response
            
            ```json
                {
                    "status": "success",
                    "message": "Story created successfully",
                    "data": {
                        "id": 196,
                        "title": "A cat and a dog",
                        "story": "Once upon a time....... they lived in peach",
                        "author": "RakibulRanak",
                        "postedAt": "2021-12-09T06:16:17.546Z"
                    }
                }
            ```
            XML Response
            ```xml
            <?xml version='1.0'?>
            <data>
                <id>199</id>
                <title>A cat and a dog</title>
                <story>Once upon a time....... they lived in peach</story>
                <author>RakibulRanak</author>
                <postedAt>Thu Dec 09 2021 16:56:24 GMT+0600 (Bangladesh Standard Time)</postedAt>
            </data>
            ```
        - Valid Request Field Requirements:
            - title must be between 1 to 50 chars
            - description must be between 1 to 10000 chars
  
    &nbsp;

    * Update A Story : `PUT /api/v1/stories/:storyId`
        -  Request Header
            
               Accept : application/json or application/xml
        - Request Body
            ```json
            {
                "title" : "Brave Cow",
                "story" : "Once upon a time a lion lived in a jungle. ....."
            }
           ```
        - Valid Response
            
            Status: 200 OK
            
            ```json
                {
                    "status": "success",
                    "message": "Story updated successfully",
                    "data": {
                        "id": 196,
                        "title": "A cat and a dog",
                        "story": "Once upon a time....... they lived in peach",
                        "author": "RakibulRanak",
                        "postedAt": "2021-12-09T06:16:17.546Z"
                    }
                }
            ```
            ```xml
            <?xml version='1.0'?>
            <data>
                <id>199</id>
                <title>A cat and a dog</title>
                <story>Once upon a time....... they lived in peach</story>
                <author>RakibulRanak</author>
                <postedAt>Thu Dec 09 2021 16:56:24 GMT+0600 (Bangladesh Standard Time)</postedAt>
            </data>
            ```
        - Valid Request Field Requirements:
            - title must be between 1 to 50 chars
            - description must be between 1 to 10000 chars
    
    &nbsp;
    * Delete  A Story : `DELETE /api/v1/stories/:storyId`
       
        - Valid Response

            Status: 204 No Content
            
            
