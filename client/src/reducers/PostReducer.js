const postReducer = (
    state = { posts: null, loading: false, error: false, uploading: false },
    action
  ) => {
    switch (action.type) {
      // Action types related to post uploading (e.g., in PostShare.jsx)
      case "UPLOAD_START":
        // When the post upload process starts, set uploading to true and clear the error state
        return { ...state, error: false, uploading: true };
  
      case "UPLOAD_SUCCESS":
        // When a post upload is successful, add the new post to the posts array, clear uploading and error states
        return {
          ...state,
          posts: [action.data, ...state.posts], // Add the new post to the beginning of the posts array
          uploading: false,
          error: false,
        };
  
      case "UPLOAD_FAIL":
        // When a post upload fails, set uploading to false and set error to true
        return { ...state, uploading: false, error: true };
  
      // Action types related to retrieving posts (e.g., in Posts.jsx)
      case "RETREIVING_START":
        // When the process of retrieving posts starts, set loading to true and clear the error state
        return { ...state, loading: true, error: false };
  
      case "RETREIVING_SUCCESS":
        // When retrieving posts is successful, update the posts array with the received data, clear loading and error states
        return {
          ...state,
          posts: action.data, // Replace the current posts with the received posts
          loading: false,
          error: false,
        };
  
      case "RETREIVING_FAIL":
        // When retrieving posts fails, set loading to false and set error to true
        return { ...state, loading: false, error: true };
  
      default:
        return state;
    }
  };
  
  export default postReducer;
  