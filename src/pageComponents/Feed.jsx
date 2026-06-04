import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from "../components/UserCard";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 my-10">
        <h1 className="text-center text-2xl font-bold mb-4">
          No More Profiles to Show
        </h1>
        <p className="text-gray-500">
          Check back later for more profiles to connect with!
        </p>
      </div>
    );
  }
  return (
    <div className="flex justify-center my-10">
      {<UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
