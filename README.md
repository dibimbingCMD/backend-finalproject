# backend-eplnews

# backend-eplnews

## **1. Setup Node.js Backend Project**

- Open **_app.js_** & edit these lines to configure your database:
  ```javascript
  module.exports = {
    url: "mongodb://localhost:27017/epl_news"
  ```
- Save it, then run your backend project. It will run at **_localhost:3000_**:
  ```bash
  $ nodemon app.js
  ```
- **Done!**

#

## **2. API Usage**

- API in this project is divided into 2 groups namely _users_and _news_. How to access the API is as follows:

### **1. Users**

##### **1. User Login with Users ( POST /login )**

_Parameters_ : body

- email **(required, email)**
- password **(required, min: 9)**
  _Result_ : JSON
- status : 400 _Login failed_
  ```bash
  {
  "massage": "Phone number or password is invalid.",
  "data": []
  }
  ```
- status : 200 _Login success_
  ```bash
  {
  "massage": "Data is found",
      "payload": {
          ......
          }
  }
  ```

##### **2. User Register with Users ( POST /register )**

_Parameters_ : body

- email **(required, email)**
- password **(required, min: 9)**
  _Result_ : JSON
- status : 400 Register failed\_
  ```bash
  _Error_
  ```
- status : 200 _Register success_
  ```bash
  {
  "result" {
          ......
          }
  }
  ```

##### **2. Get All User ( GET /user )**

### **2. News**
##### **1. Entry News ( POST /news )**
- Login / Register your account
##### **2. Get All User ( GET /news )**
##### **3. Delete User ( DEL /user/id )**

#### Danang Suyoko

Email : dsuyoko@yahoo.com
:
octocat: [GitHub](https://github.com/dansuyoko) |


#### Muhammad Fatillah Daulay

Email : fathillahd@gmail.com
:
octocat: [GitHub](https://github.com/dftl) |