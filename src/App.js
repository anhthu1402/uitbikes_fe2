import './App.css';
import MainLayout from "./layout/MainLayout";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home/Home";
import About from "./pages/About";
import Cart from './pages//Cart/Cart';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register';
import Signin from './pages/Signin';
import ProductDetail from './pages/ProductDetail/ProductDetail';

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
    <RouterProvider router={router} />
  );
}

export default App;
