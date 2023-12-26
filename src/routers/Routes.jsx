import { createBrowserRouter } from "react-router-dom";
import Error from "../components/Error/Error";
import Root from "../layouts/Root/Root";
import Home from "../pages/Home/Home";
import ProductSection from "../components/ProductSection/ProductSection";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Details from "../components/Details/Details";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/product",
                element: <ProtectedRoute><ProductSection></ProductSection></ProtectedRoute>,
            },
            {
                path: "/details/:id",
                loader: ({ params }) => fetch(`https://dummyjson.com/products/${params.id}`),
                element: <ProtectedRoute><Details></Details></ProtectedRoute>,
            }
        ],
    },
]);
export default router;