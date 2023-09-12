// Import necessary dependencies and components
import React, { useEffect } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";

// Define the Posts component
const Posts = () => {
  // Get route parameters and initialize dispatch
  const params = useParams()
  const dispatch = useDispatch();
  
  // Select user data and posts from Redux store
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  
  // Fetch timeline posts on component mount
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  
  // Filter posts based on route parameters if id is provided
  if(!posts) return 'No Posts';
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  
  // Render the Posts component
  return (
    <div className="Posts">
      {loading
        ? "Fetching posts...."
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  );
};

// Export the Posts component
export default Posts;
