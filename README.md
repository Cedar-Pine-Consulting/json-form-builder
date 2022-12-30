# JSON Form Builder

Builing forms with jsonforms.io, ajv.js and postgres JSON fields.

## Running

Run `docker-compose up`


## TODO:

### App:
- build FormSchema create endpoint
- figure UI URLs
- create FormSubmission table
  - use AJV for server side form validation
- create FormSubmission create / view endpoints


### Housekeeping
- actions all `TODO`s in code
- add SASS + styles
- add jest unit tests
- add husky + prettier hooks
- have fun with the frontend
- add singular error handler to Koa

### Knex commands:

- check package.json for shortcuts added
- npx knex seed:make users (create a seed data file)
- npx knex migrate:latest (migrate to latest status)
- npx knex migrate:rollback (rollback knex migration)
