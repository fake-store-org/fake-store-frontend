import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import MyPage from "./pages/MyPage.tsx";
import Header from "./components/Header.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.tsx";

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
      {path:"products/:id",element:<ProductDetailsPage/>}
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
