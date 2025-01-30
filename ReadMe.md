* To install all dependencies
 yarn install

* Create a .env file in the root of the project directory

* Copy all variables from sample.env to .env file and put the values

* To start the project
yarn start
 or
yarn dev

* Two endpoints were created

- to create a subscription
make a post request and use the data below for req.body

POST: ${url}/api/subscribe
data: {
  "walletAddress": "0x123454781",
  "plan": "Business"
}
Note: replace plan with either "Business", "Personal" or "Starter"

- to get a subscription
make a get request

${url}/api/subscription/${walletAddress}

Note: Don't forget to replace ${url} with the actual backend port(like http://localhost:5000) and  ${walletAddress} will the saved walletAddress in the database
