import './App.css';
import MainLayout from "./layout/MainLayout";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home/Home";
import About from "./pages/About";
import Cart from './pages//Cart/Cart';
import Profile from './pages/Profile/Profile';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Notification from './pages/Notification/Notification';
import Signin from './pages/Signin/Signin';
import Register from "./pages/Register/Register"
import { Provider } from 'react-redux';
import store from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'notification',
        element: <Notification />,
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'signin',
        element: <Signin />
      },
      {
        path: 'product-detail/*',
        element: <ProductDetail />
      },
    ]
  }
])

function App() {
  return (
    <div className='body'>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
