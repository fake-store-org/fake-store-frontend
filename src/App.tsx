import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import MyPage from "./pages/MyPage.tsx";
import Header from "./components/Header.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import SuccessPage from "./pages/SuccessPage.tsx";

export const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "my", element: <MyPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:id", element: <ProductDetailsPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "success", element: <SuccessPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
