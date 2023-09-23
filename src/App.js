import './App.css';
import MainLayout from "./layout/MainLayout";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";

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
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
