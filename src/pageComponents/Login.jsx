import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res?.data));
      navigate("/");
      return res;
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.log(err);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          emailId,
          password,
          firstName,
          lastName,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
      return res;
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isLoginForm) {
      handleLogin();
    }
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="card card-border bg-base-300 w-96 shadow-xlßß">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Signup"}
          </h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input"
              />
            </fieldset>
          </div>

          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="input"
              />
            </fieldset>
          </div>

          {!isLoginForm && (
            <div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Firstname</legend>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onKeyDown={handleKeyDown}
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
            </div>
          )}

          <p className="text-error">{error}</p>
          <div className="flex flex-col card-actions items-center">
            <button
              onClick={isLoginForm ? handleLogin : handleSignup}
              className="btn btn-primary my-2 w-2/3"
            >
              {isLoginForm ? "Login" : "Signup"}
            </button>
            <p className="link" onClick={() => setIsLoginForm(!isLoginForm)}>
              {isLoginForm
                ? "Don't have an account? Signup Here"
                : "Already have an account? Login Here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
