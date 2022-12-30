import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {FormBuilder} from '@ginkgo-bioworks/react-json-schema-form-builder';

function FormBuilderApp () {
  const [schemaState, setSchemaState] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!schemaState) {
      toast.error("can not submit empty formschema");
    }
    const data = {
      "name":  JSON.parse(schemaState.schema).title,
      "schema": JSON.parse(schemaState.schema),
      "uischema": JSON.parse(schemaState.uischema)
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
