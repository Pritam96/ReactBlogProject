import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Pages/Home/Home.jsx";
import Protected from "./components/Protected/Protected.jsx";
import LoginPage from "./components/Pages/LoginPage/LoginPage.jsx";
import SignupPage from "./components/Pages/SignupPage/SignupPage.jsx";
import AddPost from "./components/Pages/AddPost/AddPost.jsx";
import AllPosts from "./components/Pages/AllPosts/AllPosts.jsx";
import EditPost from "./components/Pages/EditPost/EditPost.jsx";
import Post from "./components/Pages/Post/Post.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <LoginPage />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <SignupPage />
          </Protected>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication>
            {""}
            <AllPosts />
          </Protected>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            {""}
            <AddPost />
          </Protected>
        ),
      },
      {
        path: "/edit-post/:postId",
        element: (
          <Protected authentication>
            {""}
            <EditPost />
          </Protected>
        ),
      },
      {
        path: "/post/:postId",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
