import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <RoutesApp />
      </Provider>
      <ToastContainer
        autoClose={5000}
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;