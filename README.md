# PLNet Form Builder

A standalone React form builder component extracted from the PLNet-Link CRM application. This component provides a drag-and-drop interface for creating dynamic forms with JSON Schema support.

## Features

- 🎯 Drag and drop form builder interface
- 📝 JSON Schema based form generation
- 🎨 Material-UI components
- 🔧 Customizable field types
- 📱 Responsive design
- 🎭 React JSON Schema Form (RJSF) integration

## Installation

```bash
npm install plnet-form-builder
```

## Usage

### Basic Usage

```jsx
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { FormBuilderApp, formBuilderSlice } from 'plnet-form-builder';

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
} from 'plnet-form-builder';
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

## Dependencies

This package requires the following peer dependencies:

- React ^18.2.0
- React DOM ^18.2.0

## License

MIT

## Contributing

This component was extracted from the PLNet-Link CRM application developed by Cedar Pine Consulting for Para Los Ninos.