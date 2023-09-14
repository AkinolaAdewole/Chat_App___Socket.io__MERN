import React from "react";
import PostSide from "../components/PostSide/PostSide";
import ProfileSide from "../components/profileSide/ProfileSide";
import RightSide from "../components/RightSide/RightSide";
import "./Home.css";
import { getAllUser } from "../api/UserRequests";
const Home = () => {
  // console.log(getAllUser);
  return (
    <div className="Home">
      <ProfileSide/>
      <PostSide />
      <RightSide />
    </div>
  );
};

export default Home;
