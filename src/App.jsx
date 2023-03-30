import Header from "./components/Header"
import {createBrowserRouter,Outlet,RouterProvider,} from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { CartContextProvider } from "./CartContext";
import Payment from "./pages/Payment";
import Navigation from "./components/Navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Account from "./pages/Account";

const promise = loadStripe("pk_test_51Mr1JKSEcQyqmSdkpV8NGJygkO21Md20nribMqVroFrnJqsUwTcyjpPkOyCIRmSxTnQqXgr5I0owJJ4LccaDaXOw00msG6fCcz")

const Layout = () => {
  return (
      <CartContextProvider>
          <Header />
          <Outlet />
          <Navigation />
      </CartContextProvider>
)}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/payment",
        element: <Elements stripe={promise}><Payment /></Elements>,
      },
      {
        path: "/account",
        element: <Account />
      }
    ]},
    {
      path: "/login",
      element: <Login />,
    },
]);

function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
