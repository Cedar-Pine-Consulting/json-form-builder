import React, { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';


function Form() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formSchema, setFormSchema] = useState([]);
  const [data, setData] = useState({});

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    // TODO: dynamically set form ID
    fetch("/api/formschema/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setFormSchema(result[0]);
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
        {/* <div>{JSON.stringify(formSchema)}</div> */}
      </div>
    );
  }
}


export default Form;
