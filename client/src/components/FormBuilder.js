import React, { Component } from 'react';

import {FormBuilder} from '@ginkgo-bioworks/react-json-schema-form-builder';

class FormBuilderApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: '',
      uischema: ''
    };
  }
  render() {
    return (
        <>
            <FormBuilder
                schema={this.state.schema}
                uischema={this.state.uischema}
                onChange={(newSchema: string, newUiSchema: string) => {
                this.setState({
                    schema: newSchema,
                    uischema: newUiSchema
                }
                )
                }}
            />
          <table>
            <tr>
              <td>schema</td>
              <td><div>{this.state.schema}</div></td>
            </tr>
            <tr>
              <td>ui-schema</td>
              <td><div>{this.state.uischema}</div></td>
            </tr>
          </table>
        </>
    );
  }
}

export default FormBuilderApp;
