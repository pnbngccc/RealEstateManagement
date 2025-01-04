import Homepage from "./components/HomePage/Homepage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Suspense } from "react";
import Properties from "./pages/Properties/Properties";
import PropertiesSingle1 from "./pages/PropertiesSingle/PropertiesSingle";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About/About";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Admin from "./pages/HomepageAdmin/Admin";
import Users from "./pages/HomepageUser/User";
import UserList from "./pages/UserList/UserList";
import ProfileUpdate from "./pages/ProfileUpdatePage/ProfileUpdate";
import PropertyList from "./pages/PropertyList/Property";
import RentList from "./pages/Rent_BuyList/Rent_List";
import BuyList from "./pages/Rent_BuyList/Buy_List";
import NewsList from "./pages/NewsList/News";
import ContactList from "./pages/Contact/Contact";
import Project from "./pages/Project/Project";
import AboutSingle from "./pages/AboutSingle/AboutSingle";
import ProjectList from "./pages/ProjectList/Project";
import RentUserList from "./pages/Buy_Rent_User/RentUserList";
import BuyUserList from "./pages/Buy_Rent_User/BuyUserList";
import FavoriteList from "./pages/Favorite/Favorite";
import SearchResults from "./components/Search/Search";
import PostArticle from "./pages/Post/Post";
import ReportAdminList from "./pages/ReportAdmin/ReportAdminList";
import ProjectPageList from "./pages/ProjectSingle/ProjectSingle";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/properties" element={<Properties />}></Route>
            <Route
              path="/properties/:id"
              element={<PropertiesSingle1 />}
            ></Route>
            <Route path="/project" element={<Project />}></Route>
            <Route path="/projects/:id" element={<ProjectPageList />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/about/:id" element={<AboutSingle />}></Route>
            <Route path="/contact" element={<ContactList />}></Route>
            <Route path="/rent-properties" element={<RentUserList />}></Route>
            <Route path="/buy-properties" element={<BuyUserList />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/user" element={<Users />}></Route>
            <Route path="/list-users" element={<UserList />}></Route>
            <Route path="/list-property" element={<PropertyList />}></Route>
            <Route path="/profile/update" element={<ProfileUpdate />}></Route>
            <Route path="/rent" element={<RentList />}></Route>
            <Route path="/buy" element={<BuyList />}></Route>
            <Route path="/about-list" element={<NewsList />}></Route>
            <Route path="/project-list" element={<ProjectList />}></Route>
            <Route path="/favorite" element={<FavoriteList />}></Route>
            <Route path="/search-result" element={<SearchResults />}></Route>
            <Route path="/post-article" element={<PostArticle />}></Route>
            <Route path="/report" element={<ReportAdminList />}></Route>
            {/* {routers.map((item, index) => {
              return (
                <Route
                  path={item.path}
                  element={<item.component />}
                  key={index}
                />
              );
            })} */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
