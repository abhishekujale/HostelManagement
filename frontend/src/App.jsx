import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import LandingPage from "../src/Pages/Landing";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Layout from "./Pages/Layout";
import Home from "../src/Pages/Home";
import Hostel from "./Pages/Hostel";
import Mess from "./Pages/Mess"
import MyHostel from "../src/Pages/MyHostel";
import { userAtom } from "./Store/userAtom";
import { TbTruckLoading } from "react-icons/tb";
import UplodeHostel from "./Pages/UplodeHostel";
import UpdateHostel from "./Pages/UpdateHostel";
import UplodeMess from "./Pages/UplodeMess";

function AppContent() {
  const setUser = useSetRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token); // Log the token
    if (token) {
      axios.get('http://localhost:3000/api/v1/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log("Full response from /user/me:", response.data);
        if (!response.data._id) {
          console.error("userId is missing from the response");
          throw new Error("Invalid response from server");
        }
        setUser({ 
          userId: response.data._id, 
          role: response.data.role || 'User', 
          gender: response.data.gender 
        });
        console.log("User state set:", { 
          userId: response.data.userId, 
          role: response.data.role || 'User', 
          gender: response.data.gender 
        });
      })
      .catch(error => {
        console.error('Error verifying token:', error.response ? error.response.data : error.message);
        setUser({ userId: null, role: '', gender: '' }); // Reset user state on error
      })
      .finally(() => {
        setIsLoading(false);
      });
    } else {
      console.log("No token found in localStorage");
      setIsLoading(false);
    }
  }, [setUser]);
  

  if (isLoading) {
    return (
      <div className="bg-gray-600 overflow-hidden">
        <div className="flex justify-center">
          <h1 className="text-black text-5xl font-bold">OFFLINE</h1>
        </div>
        <TbTruckLoading className="flex w-screen h-screen -mt-10" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/hostel" element={<Layout><Hostel /></Layout>} />
        <Route path="/mess" element={<Layout><Mess /></Layout>} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/myhostel" element={<Layout><MyHostel /></Layout>} />
        <Route path="/uplodehostel" element={<Layout><UplodeHostel /></Layout>} />
        <Route path="/updatehostel" element={<Layout><UpdateHostel /></Layout>} />
        <Route path="/uplodemess" element={<Layout><UplodeMess /></Layout>} />
        <Route path="/home" element={<Layout><Home/></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <RecoilRoot>
      <AppContent />
      <ToastContainer />
    </RecoilRoot>
  );
}

export default App;
