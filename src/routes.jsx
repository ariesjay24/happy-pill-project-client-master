import React from "react";
import Home from "./views/Home/Home";
import Gallery from "./views/Gallery/Gallery";
import Services from "./views/Services/Services";
import Bookings from "./views/Bookings/Bookings";
import Contact from "./views/Contact/Contact";
import Login from "./views/Login/Login";
import Signup from "./views/Signup/Signup";
import Faq from "./views/Faq/Faq";
import AdminDashboard from "./views/AdminDashboard/AdminDashboard";
import AdminServices from "./views/AdminServices/AdminServices"; // Import the AdminServices component
import PaymentSuccess from "./views/PaymentSuccess/PaymentSuccess";
import PaymentFailed from "./views/PaymentFailed/PaymentFailed";
import Chat from "./views/Chat/Chat"; // Import the Chat component

const routes = [
  {
    path: "/faq",
    element: <Faq />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/bookings",
    element: <Bookings />,
    protected: true,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup isAdmin={false} />,
  },
  {
    path: "/register-admin",
    element: <Signup isAdmin={true} />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    protected: true,
  },
  {
    path: "/admin/services",
    element: <AdminServices />,
    protected: true,
  },
  {
    path: "/payment/success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment/failed",
    element: <PaymentFailed />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "*",
    element: <Home />,
  },
];

export default routes;
