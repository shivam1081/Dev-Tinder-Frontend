import { MALE_DEFAULT_PHOTO, FEMALE_DEFAULT_PHOTO } from "../utils/constants";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeParticularFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();

  const getDefaultPhoto = () => {
    if (photoUrl) return photoUrl;
    return gender?.toLowerCase() === "male"
      ? MALE_DEFAULT_PHOTO
      : FEMALE_DEFAULT_PHOTO;
  };

  const sendConnectionRequest = async (userAction) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${userAction}/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );
      console.log(res);
      dispatch(removeParticularFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-full">
      <div className="card bg-base-300 w-96 shadow-sm h-full">
        <figure>
          <img src={getDefaultPhoto()} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p>{`${age} years old | Gender: ${gender} `}</p>
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button
              className="btn w-full bg-purple-500 hover:bg-purple-600 border-purple-500"
              onClick={() => sendConnectionRequest("ignored")}
            >
              Ignore
            </button>
            <button
              className="btn w-full bg-green-700 hover:bg-green-800 border-green-700"
              onClick={() => sendConnectionRequest("interested")}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
