const authReducer = (
    state = {
      authData: null, // User authentication data
      loading: false, // Loading state
      error: false, // Error state
      updateLoading: false, // State for tracking profile update loading
    },
    action
  ) => {
    switch (action.type) {
      case "AUTH_START":
        // When the authentication process starts, set loading to true and clear error state
        return { ...state, loading: true, error: false };
  
      case "AUTH_SUCCESS":
        // When authentication is successful, save the user's data to local storage and update state
        localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
        return { ...state, authData: action.data, loading: false, error: false };
  
      case "AUTH_FAIL":
        // When authentication fails, set loading to false and error to true
        return { ...state, loading: false, error: true };
  
      case "UPDATING_START":
        // When a profile update starts, set updateLoading to true and clear error state
        return { ...state, updateLoading: true, error: false };
  
      case "UPDATING_SUCCESS":
        // When a profile update is successful, save the updated user data to local storage and update state
        localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
        return { ...state, authData: action.data, updateLoading: false, error: false };
  
      case "UPDATING_FAIL":
        // When a profile update fails, set updateLoading to false and error to true
        return { ...state, updateLoading: false, error: true };
  
      case "LOG_OUT":
        // When the user logs out, clear local storage and reset state
        localStorage.clear();
        return {
          ...state,
          authData: null,
          loading: false,
          error: false,
          updateLoading: false,
        };
  
      case "FOLLOW_USER":
        // When the user follows another user, update the following list in user data
        return {
          ...state,
          authData: {
            ...state.authData,
            user: {
              ...state.authData.user,
              following: [...state.authData.user.following, action.data],
            },
          },
        };
  
      case "UNFOLLOW_USER":
        // When the user unfollows another user, update the following list in user data
        return {
          ...state,
          authData: {
            ...state.authData,
            user: {
              ...state.authData.user,
              following: [
                ...state.authData.user.following.filter(
                  (personId) => personId !== action.data
                ),
              ],
            },
          },
        };
  
      default:
        return state;
    }
  };
  
  export default authReducer;
  