import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from '@/hooks/ToastContext';
import BackButton from "../button/BackButton";

const JoinComponent = () => {
  const [step, setStep] = useState(1);
  const [roomName, setRoomName] = useState("");
  const [joinUser, setJoinUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));

  return (
    <div style={{ width: "430px" }} className="h-full overflow-hidden rounded-[36px] relative flex flex-col items-center justify-center bg-gray-100 bg-opacity-50 p-4">
      <BackButton display={"absolute"} from={"join"} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        {step === 1 && (
          <StepOne
            roomName={roomName}
            setRoomName={setRoomName}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <StepTwo
            joinUser={joinUser}
            setJoinUser={setJoinUser}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}
        {step === 3 && (
          <StepThree
            password={password}
            setPassword={setPassword}
            prevStep={prevStep}
            onSubmit={() => {
              setIsLoading(true);
              joinHandle(joinUser, password, roomName, router, showToast)
                .finally(() => setIsLoading(false));
            }}
            isLoading={isLoading}
          />
        )}
      </motion.div>
    </div>
  );
};

const StepOne = ({ roomName, setRoomName, nextStep }) => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="text-yellow-400"
  >
    <h2 className="text-xl font-semibold mb-4 "> Enter Room Name</h2>
    <input
      type="text"
      value={roomName}
      onChange={(e) => setRoomName(e.target.value)}
      placeholder="Room Name"
      className="w-full p-2 border border-gray-300 rounded mb-4 text-green-400 font-bold"
    />
    <button
      onClick={nextStep}
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
    >
      Next
    </button>
  </motion.div>
);

const StepTwo = ({ joinUser, setJoinUser, prevStep, nextStep }) => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="text-yellow-400"
  >
    <h2 className="text-xl font-semibold mb-4">Enter User Name</h2>
    <input
      type="text"
      value={joinUser}
      onChange={(e) => setJoinUser(e.target.value)}
      placeholder="User Name"
      className="w-full p-2 border border-gray-300 rounded mb-4 text-blue-400 font-semibold"
    />
    <div className="flex justify-between">
      <button
        onClick={prevStep}
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
      >
        Back
      </button>
      <button
        onClick={nextStep}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Next
      </button>
    </div>
  </motion.div>
);

const StepThree = ({ password, setPassword, prevStep, onSubmit, isLoading }) => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-pink-600"
  >
    <h2 className="text-xl font-semibold mb-4"> Enter Password</h2>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      className="w-full p-2 border border-gray-300 rounded mb-4 text-red-400 font-semibold"
    />
    <div className="flex justify-between">
      <button
        onClick={prevStep}
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
      >
        Back
      </button>
      <button
        onClick={onSubmit}
        className={`py-2 px-4 rounded transition ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white`}
        disabled={isLoading}
      >
        {isLoading ? 'Joining...' : 'Join Room'}
      </button>
    </div>
  </motion.div>
);

const joinHandle = async (joinUser, password, roomName, router, showToast) => {
  try {
    if (!roomName || !joinUser || !password) {
      showToast("Write All Credentials", "error");
      return;
    }
    const myRoom = localStorage.getItem("myRoom");
    if (myRoom == roomName) {
      showToast("You are already in this room.", "info");
      return router.push("/chat");
    }
    const response = await axios.post(`${process.env.NEXT_PUBLIC_DEPLOYBACKEND}/checkChat`,
      {
        roomName,
        joinUser,
        password
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    const savedObject = {
      joinUser,
      roomName,
    }
    localStorage.setItem("joinedRoom", JSON.stringify(savedObject));

    router.push("/chat");
    console.log(savedObject);

    console.log(response.data);

  } catch (error) {
    const status = error.response.status;
    if (status === 401) {
      console.error("Unauthorized access attempt.");
      showToast("You are not authorized", "error");
    }
    else if (status == 404) {
      showToast(`${roomName} does not exist.`, "error");
      console.log("not found error");
    }
    else {
      showToast(`ERROR`, "error");
    }
    console.log(error);
  }
};

export default JoinComponent;