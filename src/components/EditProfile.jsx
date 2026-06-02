import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import {
  DEFAULT_PROFILE_PIC,
  BASE_URL,
  MALE_DEFAULT_PHOTO,
  FEMALE_DEFAULT_PHOTO,
} from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import AlertToast from "./AlertToast";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender || "");
  const [age, setAge] = useState(user.age || "");
  const [photoUrl, setPhotoUrl] = useState(
    user?.photoUrl || DEFAULT_PROFILE_PIC,
  );
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(
    Array.isArray(user.skills) ? user.skills.join(", ") : user.skills || "",
  );
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    const isValidUrl = (str) => {
      try {
        const u = new URL(str);
        return u.protocol === "http:" || u.protocol === "https:";
      } catch (e) {
        console.log("Invalid URL: " + e);
        return false;
      }
    };

    const getPhotoToSend = () => {
      if (isValidUrl(photoUrl)) return photoUrl;
      const g = (gender || "").toLowerCase();
      if (g === "male") return MALE_DEFAULT_PHOTO;
      if (g === "female") return FEMALE_DEFAULT_PHOTO;
      return DEFAULT_PROFILE_PIC;
    };
    try {
      // Convert comma-separated skills string to array and remove whitespaces
      const skillsArray = Array.isArray(skills)
        ? skills
        : skills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "");

      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl: getPhotoToSend(),
          age,
          gender,
          about,
          skills: skillsArray,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
      console.log("ERROR OCCURED: " + err.response.data);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveProfile();
    }
  };

  return (
    <>
      {showToast && <AlertToast toastMessage="Profile saved successfully!" />}
      <div className="flex justify-center my-10 gap-10">
        <div>
          <div className="flex justify-center mx-8 ">
            <div className="card card-border bg-base-300 w-96 shadow-xlßß ">
              <div className="card-body my-0">
                <h2 className="card-title justify-center">Edit Profile</h2>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Firstname</legend>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="input"
                    />
                  </fieldset>
                </div>

                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Lastname</legend>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="input"
                    />
                  </fieldset>
                </div>

                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Age</legend>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="input"
                    />
                  </fieldset>
                </div>

                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Gender</legend>
                    <select
                      className="select select-bordered"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </fieldset>
                </div>

                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">About</legend>

                    <textarea
                      type="text"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="textarea"
                      placeholder="Tell us about yourself..."
                    ></textarea>
                  </fieldset>
                </div>

                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Profile Photo</legend>
                    <input
                      type="text"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="input"
                    />
                  </fieldset>
                </div>

                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Skills</legend>
                    <input
                      type="text"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="input"
                    />
                  </fieldset>
                </div>

                <p className="text-error">{error}</p>
                <div className="card-actions justify-center">
                  <button
                    onClick={saveProfile}
                    className="btn btn-primary my-2"
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl, skills }}
        />
      </div>
    </>
  );
};

export default EditProfile;
