import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import ContactUs from "views/ContactUs/ContactUs.jsx";
import SheltersRescues from "views/SheltersRescues/SheltersRescues.jsx";
import SearchPage from "views/SearchPage/SearchPage.jsx";
import SheltersRegister from "views/RegisterPage/SheltersRegister.jsx";

var indexRoutes = [
  { path: "/shelters-register", name: "SheltersRegister", component: SheltersRegister },
  { path: "/search", name: "SearchPage", component: SearchPage },
  { path: "/shelters-rescues", name: "SheltersRescues", component: SheltersRescues },
  { path: "/contact-us", name: "ContactUs", component: ContactUs },
  { path: "/landing-page", name: "LandingPage", component: LandingPage },
  { path: "/profile-page", name: "ProfilePage", component: ProfilePage },
  { path: "/login-page", name: "LoginPage", component: LoginPage },
  { path: "/", name: "Components", component: Components }
];

export default indexRoutes;
