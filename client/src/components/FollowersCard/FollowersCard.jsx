import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { useSelector } from "react-redux";

const FollowersCard = ({ location }) => {
  // Define state variables to manage the visibility of the followers modal and the list of persons to display
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  
  // Get the user data from the Redux store using the useSelector hook
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    // Fetch a list of persons (users) using an API request
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    // Call the fetchPersons function when the component mounts
    fetchPersons();
  }, []);

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>

      {persons.map((person, id) => {
        // Render a User component for each person (user) in the list, excluding the current user
        if (person._id !== user._id) return <User person={person} key={id} />;
      })}
      {/* Render a "Show more" link if the location prop is not provided */}
      {!location ? (
        <span onClick={() => setModalOpened(true)}>Show more</span>
      ) : (
        ""
      )}

      {/* FollowersModal component for displaying more followers */}
      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
};

export default FollowersCard;
