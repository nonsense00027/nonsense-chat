import { useAuthUser } from "@react-query-firebase/auth";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { auth } from "~/configs/firebase/firebase";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Conversation from "../pages/Home/Conversation/Conversation";

import ProtectedRoute from "./ProtectedRoute";
import useCurrentUser from "~/shared/hooks/useCurrentUser";

function Routes() {
  const { data, isFetching } = useCurrentUser();

  if (isFetching) {
    return <div></div>;
  }

  const isAuthenticated = data !== null;

  const router = createBrowserRouter([
    {
      element: (
        <ProtectedRoute authenticated={isAuthenticated} redirectPath="/login" />
      ),
      children: [
        {
          path: "/",
          element: <Home />,
          children: [
            {
              path: "conversations/:conversationId",
              element: <Conversation />,
            },
          ],
        },
      ],
    },
    {
      element: (
        <ProtectedRoute authenticated={!isAuthenticated} redirectPath="/" />
      ),
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Routes;
