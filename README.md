# JSON Form Builder Component

Builing forms with jsonforms.io, ajv.js and postgres JSON fields.

## JSON Schema and jsonforms.io

The app architecture is centered around JSON Forms as defined in a JSON Schema. There are several form libraries that use JSON Schema to define forms, one of the best one's is [jsonforms.io](https://jsonforms.io/). The library is well mantained and has extensive documentation and deep esctensibility.

In essence, the FormBuilder component is just constructing two JSON objects (`schema` and `uischema`) that define the structure and layout of the form. **Unfortunately, I couldn't find a prebuilt, out-of-the box formbuilder that is compatible with jsonforms.io.**

## Running

Run `npm run sart` or `docker-compose up`

## TODO:

### Housekeeping
- actions all `TODO`s in code
- add SASS + styles
- add jest unit tests
- add husky + prettier hooks
- have fun with the frontend
- add singular error handler to Koa
