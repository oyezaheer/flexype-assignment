# Flexype - Alerting System

Flexype is a simple alerting system built using **Node.js**, **Express**, **MongoDB**, and **Redis**. The system monitors failed POST request attempts, tracks the number of attempts from specific IP addresses, and sends email alerts if the failure count exceeds a defined threshold.

## Features

- Tracks failed POST requests from users based on their IP address.
- Stores failed attempts in a **MongoDB** database.
- Uses **Redis** to store and track failed requests with a sliding window mechanism.
- Sends email alerts when the number of failed attempts exceeds a threshold.
- Customizable failure threshold and window size for tracking.

## Tech Stack

- **Node.js**: JavaScript runtime used for backend development.
- **Express**: Web framework for Node.js to handle routing and middleware.
- **MongoDB**: Database used to store failed requests.
- **Redis**: Used for fast tracking of failed requests with a sliding window approach.
- **Nodemailer**: For sending email alerts when a threshold is exceeded.
- **dotenv**: To manage environment variables for sensitive configurations (e.g., database URL, email credentials).

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/<your-username>/flexype.git
   ```
2. Navigate into the project directory:
   ```
   cd flexype
   ```
3. Install dependencies:
   ```
   npm instal
   ```
4. Create a .env file in the root of the project and add the necessary environment variables:
   ```
   MONGO_URI=<your_mongodb_connection_string>
   REDIS_URL=<your_redis_connection_string>
   EMAIL_USER=<your_email>
   EMAIL_PASS=<your_email_password>
   THRESHOLD=5
   WINDOW_SIZE=600
   ```
   Replace the placeholders with your actual MongoDB URI, Redis URL, and email credentials.

## API Endpoints
POST /api/submit
- Endpoint for submitting requests.
- Requires x-access-token header for validation
- Returns 401 if token is invalid
GET /api/metrics
- Retrieves metrics about failed requests
- Returns array of fialed request records with timestamps

## Running the Application
1. Start the server:
   ```
   node server.js
   ```
2. The server will start on http://localhost:3000


## Testing with Postman
Request 1 : Invalid Post Request
   ```
  Method: POST
  URL: http://localhost:3000/api/submit
  Headers:
    - Content-Type: application/json
    - x-access-token: invalid_token
   Body (raw JSON):
    {
    "data": "test request"
    }
```
Expected Response (401 Unauthorized): 
```
{
    "message": "Unauthorized"
}
```
Request 2 : Get Metrics
```
Method: GET
URL: http://localhost:3000/api/metrics
Headers:
  - Content-Type: application/json
```
Expected Response(200 OK) : 
```
[
    {
        "_id": "...",
        "ip": "::1",
        "timestamp": "2024-01-09T10:00:00.000Z",
        "reason": "Invalid token"
    }
]
```





