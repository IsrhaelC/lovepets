import LandingPage from "views/LandingPage/LandingPage.jsx";
import AdoptersPage from "views/AdoptersPage/AdoptersPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import ContactUs from "views/ContactUs/ContactUs.jsx";
import SheltersRescues from "views/SheltersRescues/SheltersRescues.jsx";
import SearchPage from "views/SearchPage/SearchPage.jsx";
import SheltersRegister from "views/RegisterPage/SheltersRegister.jsx";
import AdoptersRegister from "views/RegisterPage/AdoptersRegister.jsx";
import FeedPage from "views/FeedPage/FeedPage.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Dashboard from "views/Dashboard/Dashboard.jsx";
import MyPets from "views/Dashboard/Sections/MyPets.jsx";
import NewCollaborator from "views/Dashboard/Sections/NewCollaborator.jsx";
import NewExpense from "views/Dashboard/Sections/NewExpense.jsx";
import NewIncome from "views/Dashboard/Sections/NewIncome.jsx";

var indexRoutes = [
  { path: "/new-income", name: "NewIncome", component: NewIncome },
  { path: "/new-expense", name: "NewExpense", component: NewExpense },
  { path: "/new-collaborator", name: "NewCollaborator", component: NewCollaborator },
  { path: "/my-pets", name: "MyPets", component: MyPets },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/user-profile", name: "UserProfile", component: UserProfile },
  { path: "/feed-page", name: "FeedPage", component: FeedPage },
  { path: "/adopters-page", name: "AdoptersPage", component: AdoptersPage },
  { path: "/login-page", name: "LoginPage", component: LoginPage },
  { path: "/adopters-register", name: "AdoptersRegister", component: AdoptersRegister },
  { path: "/shelters-register", name: "SheltersRegister", component: SheltersRegister },
  { path: "/search", name: "SearchPage", component: SearchPage },
  { path: "/shelters-rescues", name: "SheltersRescues", component: SheltersRescues },
  { path: "/contact-us", name: "ContactUs", component: ContactUs },
  { path: "/", name: "LandingPage", component: LandingPage }
];

export default indexRoutes; 
