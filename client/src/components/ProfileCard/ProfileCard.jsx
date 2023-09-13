import React from "react";
import "./ProfileCard.css"; // Import your CSS file for styling
import Cover from "../../img/cover.jpg"; // Import images (assuming these are fallback images)
import Profile from "../../img/profileImg.jpg"; // Import images (assuming these are fallback images)
import { Link } from "react-router-dom"; // Import Link from React Router
import { useSelector } from "react-redux"; // Import useSelector from Redux to access state

const ProfileCard = ({ location }) => {
  //! Get user and posts data from Redux store
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);

  // Define the server's public folder (used for image URLs)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="container">
        <div className="ProfileCard shadow"> {/* Main container div */}
              <div className="ProfileImages">
                {/* Display user's cover picture or a default image */}
                <img
                  src={
                    user.coverPicture
                      ? serverPublic + user.coverPicture
                      : serverPublic + "defaultCover.jpg"
                  }
                  alt="CoverImage"
                />
                {/* Display user's profile picture or a default image */}
                <img
                  src={
                    user.profilePicture
                      ? serverPublic + user.profilePicture
                      : serverPublic + "defaultProfile.jpg"
                  }
                  alt="ProfileImage"
                />
              </div>

              <div className="ProfileName">
                {/* Display user's name and workplace (if available) */}
                <span>
                  {user.firstname} {user.lastname}
                </span>
                <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
              </div>

              <div className="followStatus">
                <hr />
                <div>
                  <div className="follow">
                    {/* Display the number of followers */}
                    <span>{user.followers.length}</span>
                    <span>Followers</span>
                  </div>
                  <div className="vl"></div> {/* Vertical separator */}
                  <div className="follow">
                    {/* Display the number of users being followed */}
                    <span>{user.following.length}</span>
                    <span>Following</span>
                  </div>
                  {/* Display the number of posts (only for profile page) */}
                  {location === "profilePage" && (
                    <>
                      <div className="vl"></div> {/* Vertical separator */}
                      <div className="follow">
                        <span>
                          {
                            posts.filter((post) => post.userId === user._id).length
                          }
                        </span>
                        <span>Posts</span>
                      </div>{" "}
                    </>
                  )}
                </div>
                <hr />
              </div>

              {/* Display a link to the user's profile (if not on the profile page) */}
              {location === "profilePage" ? (
                ""
              ) : (
                <span>
                  <Link
                    to={`/profile/${user._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    My Profile
                  </Link>
                </span>
              )}
        </div>
    </div>
  );
};

export default ProfileCard;
