# JSON Form Builder

Builing forms with jsonforms.io, ajv.js and postgres JSON fields.

## Architecture

The proposed architecture of the app is relatively straightforward. A `FormBuilder` React component will be used to generate a `schema` and `uischema` for a form. Those schemas are saved together in the `FormSchema` database table. There is a `FormComponent` react component that will render the form defined by the `FormSchema`. 

``` mermaid
graph TD
FormSchemaTable;
FormBuilder -- saves formschemas --> FormSchemaTable;
FormSchemaTable <-- FormComponent renders FormSchemas --> FormComponent;
FormComponent -- submits form data --> FormSubmissionTable;
Tableau -- reads data --> FormSubmissionTable
subgraph Client
FormBuilder & FormComponent
end
subgraph Database
FormSchemaTable & FormSubmissionTable
end
```

### JSON Schema and jsonforms.io

The app architecture is centered around JSON Forms as defined in a JSON Schema. There are several form libraries that use JSON Schema to define forms, one of the best one's is [jsonforms.io](https://jsonforms.io/). The library is well mantained and has extensive documentation and deep esctensibility.

In essence, the FormBuilder component is just constructing two JSON objects (`schema` and `uischema`) that define the structure and layout of the form. **Unfortunately, I couldn't find a prebuilt, out-of-the box formbuilder that is compatible with jsonforms.io.**

## Running

Run `docker-compose up` will start up the database, server and a frontend build process. Both `FormBuilder` and `FormComponent` should be visible on http://localhost:3001/

## Known issues

**Currently, the FormBuilderComponent doesn't generate compatible JSON schemas for the FormComponent**. Because of this, if you create a new form and refresh the page, you may see a "No applicable renderer found." error message. To solve this, we either need to find or write a comaptible form builder component OR write a custom renderer for the jsonforms component as detailed here: https://jsonforms.io/docs/tutorial/custom-renderers

## TODO:

### App:
- Find or build a FormBuilder component that's compatible with JSON forms renderers
- create seperate UI pages
  - form builder
  - form viewer
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
