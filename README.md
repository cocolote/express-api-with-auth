# express-api-with-auth
Template of express API with Auth and database connection.

---

The intention of this repo is to have a starting point with authentication and DB connection to create simple APIs.
This API design is easily expandable.

**Environment Variables:**

`API_JWT_SECRET: string` This is use to create jwt tokens.

`API_DB_USER: string` The db user name to connect.

`API_DB_PASS: string` User's password to connect.

`API_DB_NAME: string` The database name.

`API_DB_HOST: string` The database host name or DNS.

**Database setup**

In the directory database there are 2 scripts to run and setup the db. This is to use locally since is using docker.
In a prod enviroment is better to have the database somewhere else, for example in AWS is better to use RDS to not have to worry about scaling and provisioning.

**To run it:**

`yarn install` to install dependencies.

`yarn dev` to run locally

`yarn build` to build the app and the user something like nginx or Node to run the app in prod.
