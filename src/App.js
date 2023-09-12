import React from "react";
import { Toaster } from 'react-hot-toast';
import FormBuilderApp from './components/FormBuilderApp';

function App() {
  return (
    <div className="App">
      <Toaster/>
        <FormBuilderApp />
    </div>
  );
}

export default App;
