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
import SearchPage from './pages/Search/SearchPage';
import Review from './pages/Review/Review';
import ReviewInvoice from './pages/Review-Invoice/ReviewInvoice';
import EditProfile from './pages/Profile/EditProfile';
import ChargeRequest from './pages/Charge Request/ChargeRequest';
import ChangePassword from './pages/Change Password/ChangePassword';
import BalanceManagement from './pages/BalanceManagement/BalanceManagement';
import EInvoice from './pages/EInvoice/EInvoice';
import EditReview from './pages/EditReview/EditReview';

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
        children: [
          {
            index: true,
            element: <EditProfile />
          },
          {
            path: "charge-request",
            element: <ChargeRequest />
          },
          {
            path: 'change-password',
            element: <ChangePassword />
          },
          {
            path: 'balance',
            element: <BalanceManagement />
          },
          {
            path: 'invoice',
            element: <EInvoice />
          },
          {
            path: 'my-review',
            element: <Review />
          }
        ]
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
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'my-review',
        element: <Review />
      },
      {
        path: 'review-invoice/*',
        element: <ReviewInvoice />
      },
      {
        path: 'edit-review/*',
        element: <EditReview />
      }
    ]
  }
])

function App() {
  return (
    <div className='body'>
      <Provider store={store} >
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
