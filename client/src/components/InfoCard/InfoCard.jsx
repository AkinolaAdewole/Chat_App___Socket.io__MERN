import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons"; // Icon component for editing
import ProfileModal from "../ProfileModal/ProfileModal"; // Modal for editing user profile
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import { useParams } from "react-router-dom"; // React Router hook for accessing URL parameters
import * as UserApi from "../../api/UserRequests.js"; // API functions for user-related requests
import { logout } from "../../actions/AuthActions"; // Redux action for user logout

const InfoCard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false); // State for controlling the profile edit modal
  const profileUserId = params.id; // Extract the user ID from the URL parameter
  const [profileUser, setProfileUser] = useState({}); // State to store the profile user's data
  const { user } = useSelector((state) => state.authReducer.authData); // Get the authenticated user's data from Redux

  // Function to handle user logout
  const handleLogOut = () => {
    dispatch(logout());
  };

  // useEffect to fetch the profile user's data when the component mounts
  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        // If the profile being viewed is the authenticated user's own profile
        setProfileUser(user);
      } else {
        // If viewing another user's profile, fetch their data from the API
        console.log("fetching");
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser);
      }
    };
    fetchProfileUser();
  }, [user, profileUserId]); // useEffect depends on 'user' and 'profileUserId'

  return (
    <div className="InfoCard shadow">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          // Display an edit icon and a profile edit modal for the authenticated user's own profile
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user} // Pass user data to the profile edit modal
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesIn}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default InfoCard;
