import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {FormBuilder} from '@ginkgo-bioworks/react-json-schema-form-builder';

function FormBuilderApp () {
  const [schemaState, setSchemaState] = useState("");

  const generateUISchema = (jsonSchema) => {
    const elements = Object.keys(jsonSchema.properties)
                             // for every property in the json schema
                             .map((property) => {
                               // return a jsonforms.io compatible ui-schema object
                               return {
                                 "type": "Control",
                                 "scope": `#/properties/${property}`
                               }
                             })
    return {
      "type": "VerticalLayout",
      "elements": elements
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!schemaState) {
      toast.error("can not submit empty formschema");
    }
    const schemaData = JSON.parse(schemaState.schema);
    // console.log("converted json-schema data",  schemaData);
    const uiSchemaData = generateUISchema(schemaData);
    console.log("converted ui-schema data",  uiSchemaData);
    const data = {
      "name":  schemaData.title,
      "schema": schemaData,
      "uischema": uiSchemaData
    };
    console.log(data);
    axios.post('/api/formschema/', data)
         .then(resp => console.log(resp))
         .catch(err => {
              console.log(err, 'ERR ON FormSchema Submit');
              toast.error(err.response.data);
         });
  }
  return (
      <>
          <FormBuilder
            schema={schemaState.schema}
            uischema={schemaState.uischema}
            onChange={(newSchema: string, newUiSchema: string) => {
                setSchemaState({
                    schema: newSchema,
                    uischema: newUiSchema
                  })
              }}
          />
          <button
            onClick={onSubmit}>
            Submit
          </button>
          {/* <table> */}
          {/*   <tr> */}
          {/*     <td>schema</td> */}
          {/*     <td><div>{schemaState.schema}</div></td> */}
          {/*   </tr> */}
          {/*   <tr> */}
          {/*     <td>ui-schema</td> */}
          {/*     <td><div>{schemaState.uischema}</div></td> */}
          {/*   </tr> */}
          {/* </table> */}
      </>
  );
}

export default FormBuilderApp;
