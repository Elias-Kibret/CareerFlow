import { FaHome, FaInfoCircle, FaEnvelope, FaEllipsisH } from "react-icons/fa";
import { IoLogIn, IoPersonAdd } from "react-icons/io5";

// Define navigation items for the header
export const NAV_ITEMS = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "About", path: "/about", icon: <FaInfoCircle /> },
  { name: "Contact", path: "/contact", icon: <FaEnvelope /> },
  { name: "More", path: "/more", icon: <FaEllipsisH /> },
];

// Define authentication related buttons
export const AUTH_ITEMS = [
  { name: "Login", path: "/login", icon: <IoLogIn /> },
  { name: "Sign Up", path: "/signup", icon: <IoPersonAdd /> },
];
