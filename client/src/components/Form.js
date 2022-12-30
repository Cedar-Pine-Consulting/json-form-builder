import React, { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import { person } from '@jsonforms/examples';

const initialData = {}

function Form() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formSchema, setFormSchema] = useState([]);
  const [data, setData] = useState(initialData);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("/api/formschema/1")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setFormSchema(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className='App'>
        <JsonForms
          schema={formSchema.schema}
          uischema={formSchema.uischema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data, errors }) => setData(data)}
        />
      </div>
    );
  }
}


export default Form;
