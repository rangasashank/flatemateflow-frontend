import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideNav from "../components/SideNav";
import { useSelector } from "react-redux";

const MainPage = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [pinnedNote, setPinnedNote] = useState([]);
  const [recurringTasks, setRecurringTasks] = useState([]);
  const [unsettledExpenses, setUnsettledExpenses] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]); // To store group members

  const navigate = useNavigate();
  const loading = useSelector((state) => state.user.loading);
  const userInfo = useSelector((state) => state.user.userInfo);

  // Fetch data
  const fetchData = async () => {
    const token = localStorage.getItem("token"); // Retrieve token
    const headers = { Authorization: `Bearer ${token}` };
    const group = userInfo.group;

    try {
      setIsFetching(true); // Start fetching data

      const taskResponse = await axios.get(
        import.meta.env.VITE_API_URL+`/api/tasks/${group}`,
        { headers }
      );
      const userTasks = taskResponse.data.filter((t) => t.assignedTo.name === userInfo.name)
      const incomplete = userTasks.filter((task) => !task.completed);
      const complete = userTasks.filter((task) => task.completed);
      setTasks(incomplete);
      setCompletedTasks(complete);

      // Fetch notes (latest and pinned)
      const noteResponse = await axios.get(
        import.meta.env.VITE_API_URL+`/api/notes/${group}`,
        { headers }
      );
      const pinned = noteResponse.data.filter((note) => note.pinned);
      setPinnedNote(pinned);

      // Fetch group members
      const membersResponse = await axios.get(
        import.meta.env.VITE_API_URL+`/api/groups/${group}`,
        { headers }
      );
      setGroupMembers(membersResponse.data); // Assume API returns an array of member objects with `name` and `_id`

      setIsFetching(false); // Data fetching complete
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response?.data || error.message
      );
      setIsFetching(false);
    }
  };

  const handleMarkComplete = async (taskId) => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.put(import.meta.env.VITE_API_URL +`/api/tasks/${taskId}/complete`, {}, { headers });
      fetchData(); // Refresh tasks after marking as complete
    } catch (error) {
      console.error('Error marking task as complete:', error.response?.data || error.message);
    }
  };

  // Handle redirection and data fetching logic
  useEffect(() => {
    if (loading) return; // Wait for loading state to complete

    if (!userInfo) {
      navigate("/signin"); // Redirect to sign-in if userInfo is not loaded
    } else if (!userInfo.group) {
      navigate("/creategroup"); // Redirect to create-group if the user is not in a group
    } else {
      fetchData(); // Fetch data if user is authenticated and part of a group
    }
  }, [userInfo, loading, navigate]);

  // Show loading spinner if still fetching
  if (loading || isFetching) {
    return <div>Loading...</div>;
  }

  const findName = (createdBy) => {
    for (let index = 0; index < groupMembers.length; index++) {
      const member = groupMembers[index];
      if (member._id === createdBy) {
        return member.name
      }
      
    }
  }


 
  

  return (
    <div className="flex min-h-screen lg:flex lg:min-h-screen bg-[#EAF6FF]">
      {/* Side Navigation */}
      <SideNav />
      {/* Main Content */}
      <motion.div
        className="flex-1 p-6 pt-16 lg:ml-[25%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl font-bold flex justify-center text-gray-800 pt-5 mb-4">
          Welcome back {userInfo.name}
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Tasks Assigned */}
          <section className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold text-gray-700">
              Tasks Assigned to You
            </h2>
            <ul className="mt-2 space-y-2">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <li
                    key={task._id}
                    className="p-3 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    <p className="font-medium">Description: {task.description}</p>
                    <p className="text-sm text-gray-500">
                      Due: {task.dueDate.split("T")[0]}
                    </p>
                    <button
                    onClick={() => handleMarkComplete(task._id)}
                    className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Mark Complete
                  </button>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500">No tasks assigned.</p>
              )}
            </ul>
          </section>

          <section className="mt-6">
          <h2 className="text-lg font-bold text-gray-700">Completed Tasks</h2>
          <ul className="mt-2 space-y-2">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <li
                  key={task._id}
                  className="p-3 bg-gray-100 rounded shadow"
                >
                  <p className="font-medium">{task.description}</p>
                  <p className="text-sm text-gray-500">Completed</p>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No completed tasks.</p>
            )}
          </ul>
        </section>

          {/* Notes */}
          <section className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold text-gray-700">Notes</h2>
            <div className="mt-2">
              <div className="p-4 mb-4 bg-gray-100 rounded shadow">
                <h3 className="font-bold text-gray-600">Pinned Notes</h3>
                <ul className="mt-2 space-y-2">
                  {pinnedNote.length > 0 ? (
                    pinnedNote.map((note) => (
                      <li
                        key={note._id}
                        className="p-3 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        <p className="font-medium">{note.content}</p>
                        <p className="font-medium">Date: {new Date(note.createdAt).toLocaleDateString()}</p>
                        <p className="font-medium">Created By: {findName(note.createdBy)}</p>
                      </li>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No pinned notes.</p>
                  )}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default MainPage;
