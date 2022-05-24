# missionDashboard
A mission control dashboard written in Node js &amp; React
# Start Project
1-have Node.js installed.

2-Create a free [Mongo Atlas](https://mongodb.com/atlas) database online or start a local MongoDB database.

3-Create a `server/.env` file with a `MONGO_URL` property set to your MongoDB connection string.

4-In the terminal and Root directory, run: `npm install`

# Running the Project

1-In the terminal , run: `npm run app`

2-Browse `localhost:8000` 


# CI/CD
Checkout `main.yaml` for Github Actions workflow

# Docker
1-Install the latest version of Docker 

2-Run `docker build -t mission-dashboard `.

3-Run `docker run -it -p 8000:8000 mission-dashboard`
