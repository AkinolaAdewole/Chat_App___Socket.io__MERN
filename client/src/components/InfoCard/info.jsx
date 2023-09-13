import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests";
import { logout } from "../../actions/AuthActions";

const InfoCard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  // Controlled input state variables
  const [relationship, setRelationship] = useState("");
  const [livesIn, setLivesIn] = useState("");
  const [worksAt, setWorksAt] = useState("");

  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleUpdateProfile = async () => {
    // Create an object with the updated user information
    const updatedUser = {
      relationship,
      livesIn,
      worksAt,
    };

    // Send the updated user information to the server
    const updatedProfileUser = await UserApi.updateUser(profileUserId, updatedUser);

    // Update the profileUser state with the updated data
    setProfileUser(updatedProfileUser);
    
    // Close the edit modal
    setModalOpened(false);
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user, profileUserId]);

  return (
    <div className="InfoCard shadow">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
              handleUpdateProfile={handleUpdateProfile} // Pass the update function
              // Bind the state variables to the input fields
              relationship={relationship}
              livesIn={livesIn}
              worksAt={worksAt}
              setRelationship={setRelationship}
              setLivesIn={setLivesIn}
              setWorksAt={setWorksAt}
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
        {/* Bind the input value to the corresponding state variable */}
        <input
          type="text"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
        />
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <input
          type="text"
          value={livesIn}
          onChange={(e) => setLivesIn(e.target.value)}
        />
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <input
          type="text"
          value={worksAt}
          onChange={(e) => setWorksAt(e.target.value)}
        />
      </div>

      <button className="button logout-button" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default InfoCard;
