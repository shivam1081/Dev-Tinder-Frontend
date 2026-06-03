import { MALE_DEFAULT_PHOTO, FEMALE_DEFAULT_PHOTO } from "../utils/constants";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;

  const getDefaultPhoto = () => {
    if (photoUrl) return photoUrl;
    return gender?.toLowerCase() === "male"
      ? MALE_DEFAULT_PHOTO
      : FEMALE_DEFAULT_PHOTO;
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
            <button className="btn w-full bg-purple-500 hover:bg-purple-600 border-purple-500">
              Ignore
            </button>
            <button className="btn w-full bg-green-700 hover:bg-green-800 border-green-700">
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
