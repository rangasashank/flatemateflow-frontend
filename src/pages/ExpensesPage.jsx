import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";

const ExpensesPage = () => {

  const [groupMembers, setGroupMembers] = useState([]); // To store group members
  const loading = useSelector((state) => state.user.loading);
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();


  useEffect(() => {
    if (!loading) {
      if (!userInfo) {
        navigate("/signin"); // Redirect to sign-in if user is not authenticated
      } else if (!userInfo.group) {
        navigate("/creategroup"); // Redirect to create-group if user is not in a group
      } else {

      }
    }
  }, [userInfo, loading, navigate]);

  if (loading) return <div>Loading tasks...</div>;
  const group = userInfo.group;


  return (
    <div className="flex min-h-screen bg-[#EAF6FF]">

    <SideNav></SideNav>
    <div className="flex justify-center items-center">
      <h1>Coming soon...</h1>
    </div>
    </div>
  );
};

export default ExpensesPage;
