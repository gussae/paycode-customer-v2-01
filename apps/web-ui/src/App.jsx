import './App.css';
import Home from './Home';
import { Authenticator } from '@aws-amplify/ui-react';

function App() {
  return (
    <Authenticator>
      <Home />
    </Authenticator>
  );
}

export default App;
