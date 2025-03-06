# URL Shortener Service

**The application allows users to shorten long URLs, track link visits, and view access statistics.**

**Project Setup**

1. Clone the repository:
   ```bash
   git clone https://github.com/saranshh/url-shortener
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   nodemon
   ```

# Project Overview

**Develop a URL Shortening Service using NodeJS and PostgreSQL**

**Core Features:**

1. Shorten long URLs to unique short links.
2. Redirect users to the original URL when accessing the short link.
3. Track the number of visits for each short URL.
4. Provide statistical insights on URL visits (Today, This Week, This Month).

**Routes:**

1. Shorten URL: POST `/api/shorten`  
2. Redirect to Original URL: GET `/:shortCode`
3. Get URL Statistics: GET `/api/stats/:shortCode`
4. API Documentation: GET `/api-docs`

