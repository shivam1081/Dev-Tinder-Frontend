import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRequestData } from "../utils/requestSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log("Received Requests: ", res.data.data);
      dispatch(addRequestData(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
    console.log("Requests" + requests);
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 my-10">
        <h1 className="text-center text-2xl font-bold mb-4">
          No Requests Received Yet
        </h1>
        <p className="text-gray-500">
          Explore profiles and send requests to connect!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-center text-2xl font-bold mb-4 flex justify-center my-10">
          Requests Received {`(${requests?.length})`}
        </h1>
        <div className="flex flex-col items-center gap-6 ">
          {requests?.length > 0 &&
            requests.map((request) => (
              <div
                key={request?.fromUserId?._id}
                className="card card-dash bg-base-100 w-full max-w-4xl mx-auto my-4 flex-row items-center gap-6 p-4 shadow-xl"
              >
                <img
                  className="rounded-full w-32 h-32 object-cover"
                  alt="photo"
                  src={request?.fromUserId?.photoUrl}
                />
                <div className="card-body p-0 flex-1">
                  <h2 className="card-title">
                    {request?.fromUserId?.firstName}{" "}
                    {request?.fromUserId?.lastName}
                  </h2>
                  <p>{`${request?.fromUserId?.age} years old | Gender: ${request?.fromUserId?.gender} `}</p>
                  <p>{request?.fromUserId?.about}</p>
                </div>
                <div className="flex flex-col items-center my-10 gap-5 ">
                  <button className="btn btn-primary w-40 h-10 ">Reject</button>
                  <button className="btn btn-secondary w-40 h-10 ">
                    Accept
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Requests;
