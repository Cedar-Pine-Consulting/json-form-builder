// import logo from './logo.svg';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Form from './components/Form';
// import FormBuilderApp from './components/FormBuilder';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Toaster/>
      <Form />
      {/* <FormBuilderApp /> */}
    </div>
  );
}

export default App;
