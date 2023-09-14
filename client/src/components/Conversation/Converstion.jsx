import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/UserRequests"; // Importing a function for getting user data

const Conversation = ({ data, currentUser, online }) => {
  // Define local state to store user data
  const [userData, setUserData] = useState(null);

  // Redux dispatch hook for dispatching actions
  const dispatch = useDispatch();

  console.log(getUser);

  useEffect(() => {
    // Extracting the user ID from the conversation data
    const userId = data.members.find((id) => id !== currentUser);
    console.log(userId);

    // Function to fetch user data
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId); // Making an API request to get user data
        setUserData(data); // Updating local state with received user data
        console.log(data);
        dispatch({ type: "SAVE_USER", data: data }); // Dispatching a Redux action to save user data
      } catch (error) {
        console.log(error); // Handle errors, e.g., log them or show a notification
      }
    };

    getUserData(); // Call the function to fetch user data
  }, []); // Empty dependency array indicates that this effect runs once on component mount

  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>} {/* Render an online dot if the user is online */}
          <img
            src={
              userData?.profilePicture
                ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.jpg"
            }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>{userData?.firstname} {userData?.lastname}</span> {/* Render user's first and last name */}
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"} {/* Display user's online status */}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
