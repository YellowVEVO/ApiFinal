## Project: Restrict Library Access by IP Address

This project prevents users from logging into the library system if they are located in a restricted country, based on their IP address.



## Folder Structure:

```
library-access-system/
├── server/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
|   ├── .env 
│   ├── seedBooks.js
│   ├── seedCountries.js
│   ├── seedUsers.js
├── frontend/
│   ├── login.html
│   ├── config.js
│   ├── dashboard.html
│   ├── index.html
│   ├── register.html
│   ├── styles.css
├── postman/
│   ├── library-access-system.postman_collection.json
├── .gitignore
├── package.json
├── README.txt
```



## How to Run Locally

1. **Clone or download the project.**

2. **Install backend dependencies:**

```bash
cd server
npm install
```

3. **Create `.env` file inside `/server` folder:**

```bash
PORT=3000
MONGODB_URI=your_mongodb_atlas_or_local_uri
JWT_SECRET=your_jwt_secret
GEOLOCATION_API_KEY=your_ipgeolocation_api_key
PORT=5000
```

**Replace**:
- `your_mongodb_atlas_or_local_uri` with your MongoDB Atlas URI or local MongoDB URI.
- `your_jwt_secret` with a secret key for JWT.
- `your_ipgeolocation_api_key` with your API key from IPGeolocation.io.

4. **Start the server:**

```bash
npm start
```

Server will run at:
```
http://localhost:5000
```

5. **Open the Frontend:**

- Open `frontend/login.html` directly in your browser.
- Enter username and password to login.



## How to Get IP Geolocation API Key

1. Visit [https://app.ipgeolocation.io/](https://app.ipgeolocation.io/)
2. Sign up for a free account.
3. Go to the "API Keys" section.
4. Copy your generated API key.
5. Update your `.env` file:

```bash
IP_API_KEY=your_generated_api_key
```

Example:
```
IP_API_KEY=m81LFJytxulip123F3NMs78EDYclvIRP0vidCpLT4
```

