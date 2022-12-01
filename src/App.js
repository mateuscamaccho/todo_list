import RoutesApp from "./routes";

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={1000} />
      <RoutesApp />
    </div>
  );
}

export default App;
