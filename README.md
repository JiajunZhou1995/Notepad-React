# Notepad SPA

**This is a notepad SPA (single page application) with a react and redux front-end and a rest API that uses a postgres to store notes.**

Technology used:
- Written in es6 (use babel)
- Use webpack for packaging client side code
- expressjs
- nodejs
- npm
- React
- Redux
- CSS animations
- Postgress

This nice and clean Notepad is available 24/7 in here: [Notepad](http://aws.jiajunzhou.ca:3000/).

## If you want this to running locally:

First, Install postgres and creat a server with following credentials

**username:postgres**

**password:password**

After you login to your server, set up a postgres database called 'todo' on your local machine.

Now, you are ready to clone my code!

```bash
# Clone this repository
git clone https://github.com/JiajunZhou1995/Notepad-React.git
# Go into the repository
cd Notepad-React
# Install dependencies
npm install
# compile all the js code
webpack
# Run the app
npm start
```

Finally, go to localhost:3000 in your browser and have fun.

## WARNING
**This is my first try on expressjs, React and Redux, so the overall desgin may not be the best, be careful if you want to imitate my code.**





# API Documentation 

**Add note**
----
  Add note to the notepad

* **URL**

  /note/add

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `NONE`

*  **Data Params**

   **Required:**
   
   `{"text": "sample"}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 1, "text": "sample", "complete": false}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error: 'Not found' }`

  OR

  * **Code:** 400 Bad Request <br />
    **Content:** `{ error: 'text body is missing' }`



**Get all note**
----
  Retrieve note from the notepad

* **URL**

  /note

* **Method:**

  `GET`
  
*  **URL Params**

   `start:int`
 
   `order:ASCD||ESC`
   
   `limit:int`

   **Required:**
 
   `NONE`

*  **Data Params**

   **Required:**
   
   `NONE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 1, "text": "sample", "complete": false}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error: 'Not found' }`

  OR

  * **Code:** 404 Bad Request <br />
    **Content:** `{ error: 'order parameter is invalid, please enter ASC or DESC' }`


**Get one note**
----
  Retrieve note by id from the notepad

* **URL**

  /note/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `NONE`

*  **Data Params**

   **Required:**
   
   `NONE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 1, "text": "sample", "complete": false}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error: 'Not found' }`

  OR

  * **Code:** 404 Bad Request <br />
    **Content:** `{ error: 'id parameter must be a number' }`



**Update note**
----
  Update note from the notepad

* **URL**

  /note

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `NONE`

*  **Data Params**

   **Required:**
   
   `{"text": "sample", "complete": false}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 1, "text": "sample", "complete": false}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error: 'Not found' }`

  OR

  * **Code:** 404 Bad Request <br />
    **Content:** `{ error: 'text body is missing' }`

  OR

  * **Code:** 404 Bad Request <br />
    **Content:** `{ error: 'complete body is invalid' }`



**Delete one note**
----
  Delete note by id from the notepad

* **URL**

  /note/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `NONE`

*  **Data Params**

   **Required:**
   
   `NONE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 1, "text": "sample", "complete": false}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error: 'Not found' }`

  OR

  * **Code:** 404 Bad Request <br />
    **Content:** `{ error: 'id parameter must be a number' }`



