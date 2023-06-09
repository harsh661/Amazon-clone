import Header from "./components/Header"
import {createBrowserRouter,Outlet,RouterProvider,} from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Category from "./pages/Category";
import { CartContextProvider } from "./CartContext";
import Payment from "./pages/Payment";
import Navigation from "./components/Navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Account from "./pages/Account";
import Item from "./pages/Item";
import Orders from "./pages/Orders";
import OrderCompletion from "./pages/OrderCompletion";

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
        path: "/category/:category",
        element: <Category />,
      },
      {
        path: "/payment",
        element: <Elements stripe={promise}><Payment /></Elements>,
      },
      {
        path: "/account",
        element: <Account />
      },
      {
        path: "/product/:id",
        element: <Item />
      },
      {
        path: "/orders",
        element: <Orders />
      },
      {
        path: "/success",
        element: <OrderCompletion />
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
