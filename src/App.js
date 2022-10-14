
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginBootstarp from './components/LoginBootstarp';
import RegisterReactBootstrap from './components/RegisterReactBootstrap';
import Main from './layout/Main';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <RegisterReactBootstrap></RegisterReactBootstrap>,
      },
      {
        path: "/register",
        element: <RegisterReactBootstrap></RegisterReactBootstrap>,
      },
      {
        path: "/login", element: <LoginBootstarp></LoginBootstarp>
      }
    ],
  },
]);

function App() {

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
