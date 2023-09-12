// Import API functions for making user-related requests
import * as UserApi from "../api/UserRequests";

// Action creator to update a user's information
export const updateUser = (id, formData) => async (dispatch) => {
  // Dispatch an action to indicate the start of the updating process
  dispatch({ type: "UPDATING_START" });

  try {
    // Make an API request to update the user's information
    const { data } = await UserApi.updateUser(id, formData);
    
    // Log the received data (optional)
    console.log("Action ko receive hoa hy ye : ", data);

    // Dispatch an action to indicate the successful update and pass the updated data
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    // Dispatch an action to indicate the update failed
    dispatch({ type: "UPDATING_FAIL" });
  }
};

// Action creator to follow another user
export const followUser = (id, data) => async (dispatch) => {
  // Dispatch an action to indicate that the user is following another user
  dispatch({ type: "FOLLOW_USER", data: id });

  // Make an API request to follow the specified user (via UserApi)
  UserApi.followUser(id, data);
};

// Action creator to unfollow another user
export const unfollowUser = (id, data) => async (dispatch) => {
  // Dispatch an action to indicate that the user is unfollowing another user
  dispatch({ type: "UNFOLLOW_USER", data: id });

  // Make an API request to unfollow the specified user (via UserApi)
  UserApi.unfollowUser(id, data);
};
