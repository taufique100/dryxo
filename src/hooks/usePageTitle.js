import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PAGE_TITLES = {
  "/home":                      "Dryxo | Smart Hygiene Solutions for Every Home",
  "/products":                  "Dryxo | Product – Shop Now",
  "/products/Parchase-Details": "Dryxo | Product Details – Premium Hygiene Care",
  "/media":                     "Dryxo | Media & Gallery – See Us in Action",
  "/blog":                      "Dryxo | Blog – Hygiene Tips, Health & Wellness",
  "/blog/blog-details":         "Dryxo | Blog Details – Read Our Latest Articles",
  "/pad_atm":                   "Dryxo | Pad ATM – Sanitary Pad Vending Machine",
  "/about":                     "Dryxo | About Us – Our Mission for Better Hygiene",
  "/chanel_partner":            "Dryxo | Channel Partner – Grow With Us",
  "/contact":                   "Dryxo | Contact Us – We're Here to Help",
  "/my-order":                  "Dryxo | My Orders – Track Your Purchases",
  "/orders":                    "Dryxo | Orders – Your Order History",
  "/profile":                   "Dryxo | My Profile – Manage Your Account",
  "/change-password":           "Dryxo | Change Password – Keep Your Account Secure",
  "/login":                     "Dryxo | Login – Access Your Account",
  "/signup":                    "Dryxo | Sign Up – Join the Dryxo Community",
  "/forget-password":           "Dryxo | Forgot Password – Reset Your Access",
};

const DEFAULT_TITLE = "Dryxo | Smart Hygiene Solutions";

export default function usePageTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = PAGE_TITLES[pathname] ?? DEFAULT_TITLE;
  }, [pathname]);
}
