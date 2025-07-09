# Design Document - URL Shortener Microservice

## Overview

This project is a basic URL Shortener built using Node.js and Express. It helps convert long URLs into short and simple ones. The shortened link can also expire after a certain time and gives some basic analytics like number of clicks, referrer, and location.

---

## Folder Structure

22J41A05K1-url-shortner/
│
├── LoggingMiddleware/ 
│ └── logger.js
│
├── BackendTestSubmission/
│ ├── index.js 
│ ├── routes.js 
│ ├── controller.js 
│ ├── model.js 
│ ├── util.js 
│ ├── package.json 
│
└── design_document.md 


---

## Key Design Choices

### 1. **Technology Stack**
- **Node.js** and **Express**: I chose these because they are lightweight and easy to work with.
- No database is used. I used an object in memory to store the data temporarily.

### 2. **Logging**
I created a separate folder called `LoggingMiddleware` where I wrote a custom logger. It logs the timestamp, IP, and endpoint of every request to a file called `access.log`. Console logging or inbuilt loggers were not used as per the instruction.

### 3. **Shortcode Handling**
- If a user gives a custom shortcode, it is checked for uniqueness.
- If not given, a random one is generated using alphanumeric characters.
- All shortcodes are stored in an object called `urls` inside `model.js`.

### 4. **Expiry Time**
- Every short URL can expire. If the user doesn't provide a time, it defaults to 30 minutes.
- After expiry, the short link stops working and gives an error message.

### 5. **Analytics**
- Every time a short URL is clicked, data is stored in the `analytics` object.
- It stores the click time, referrer, and location (mocked as "IN").
