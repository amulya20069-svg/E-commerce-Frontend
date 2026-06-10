import { createBrowserRouter } from "react-router-dom";
import Cart from "./Cart";
import Home from "./Home";
import Orders from "./Orders";
import Login from "./Login";
import Products from "./Products";
import Register from "./Register";
import RootLayout from "./RootLayout";
import Order from "./Order";
import AdminLayout from "./AdminLayout";
import Users from "./Users";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "cart", element: <Cart /> },
            { path: "order", element: <Order /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            {
                path: "admin",
                element: <AdminLayout />,
                children: [
                    { index: true, element: <Users /> },
                    { path: "products", element: <Products /> },
                    { path: "orders", element: <Orders /> },
                ],
            },
        ],
    },
]);