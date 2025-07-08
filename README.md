# JSON Form Builder

A Drag and Drop Form Builder built on top of [RJSF](https://rjsf-team.github.io/react-jsonschema-form)

[Demo](https://cedar-pine-consulting.github.io/json-form-builder/)

## Why

[RJSF](https://rjsf-team.github.io/react-jsonschema-form) is a great standard for defining forms in terms of [JSON Schemas](https://json-schema.org). This demo shows how easy it is to build a featureful visual form builder tool on top of RJSF.

## Features

- Drag and drop form builder interface
- JSON Schema based form generation
- Material-UI components
- Customizable field types

## Installation

```bash
npm install json-form-builder
```

## Usage

### Basic Usage

```jsx
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { FormBuilderApp, formBuilderSlice } from 'json-form-builder';

const store = configureStore({
  reducer: {
    formBuilder: formBuilderSlice,
  },
});

function App() {
  return (
    <Provider store={store}>
      <FormBuilderApp />
    </Provider>
  );
}

export default App;
```

### Individual Components

```jsx
import { 
  FormBuilderComponent,
  FormBuilderCanvas,
  ToolBoxComponent,
  CustomTextFieldComponent
} from 'json-form-builder';
```

## Available Field Types

- Text Field
- Number Field
- Text Area
- Password Field
- Date Picker
- Time Picker
- Radio Buttons
- Select Dropdown
- Multi-Select
- Header/Divider

## Development

### Demo Application

To run the demo application:

```bash
npm install
npm run demo
```

### Building the Package

```bash
npm run build:lib
```

### Development Mode

```bash
npm run dev
```

## License

MIT
