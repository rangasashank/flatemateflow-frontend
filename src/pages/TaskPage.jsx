import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    group: "",
    dueDate: "",
  });
  const [recurringTask, setRecurringTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    group: "",
    dueDate: "",
    recurrenceInterval: 7,
  });
  const [groupMembers, setGroupMembers] = useState([]);
  const loading = useSelector((state) => state.user.loading);
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  const group = userInfo?.group;

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get(
        import.meta.env.VITE_API_URL + `/api/tasks/${group}`,
        { headers }
      );

      setTasks(response.data);

      const membersResponse = await axios.get(
        import.meta.env.VITE_API_URL + `/api/groups/${group}`,
        { headers }
      );
      setGroupMembers(membersResponse.data);
    } catch (error) {
      console.error(
        "Error fetching tasks:",
        error.response?.data || error.message
      );
    }
  };

  const handleAddTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post(import.meta.env.VITE_API_URL + "/api/tasks/", newTask, {
        headers,
      });
      setNewTask({
        title: "",
        description: "",
        assignedTo: "",
        group: group,
        dueDate: "",
      });
      fetchTasks();
    } catch (error) {
      console.error(
        "Error creating task:",
        error.response?.data || error.message
      );
    }
  };

  const handleAddRecurringTask = async () => {
    setRecurringTask({...recurringTask, group: group})
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/tasks/recurring-task",
         recurringTask, {headers,});
      setRecurringTask({
        title: "",
        description: "",
        assignedTo: "",
        group: group,
        dueDate: "",
        recurrenceInterval: 7,
      });
      fetchTasks();
    } catch (error) {
      console.error(
        "Error creating recurring task:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!userInfo) {
        navigate("/signin");
      } else if (!userInfo.group) {
        navigate("/creategroup");
      } else {
        fetchTasks();
      }
    }
  }, [userInfo, loading, navigate]);

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div className="flex min-h-screen lg:flex bg-[#EAF6FF]">
      <SideNav />
      <motion.div
        className="flex-1 justify-center p-6 pt-16 lg:ml-[25%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl flex justify-center font-bold pt-5 mb-4">
          Tasks
        </h1>

        {/* Normal Task Form */}
        <div className="flex flex-col justify-center">
          <div className="flex justify-center flex-col space-y-2">
            <input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value, group })
              }
              placeholder="Task Title"
              className="border p-2 rounded"
            />
            <input
              type="text"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              placeholder="Task Description"
              className="border p-2 rounded"
            />
            <select
              value={newTask.assignedTo?._id || ""}
              onChange={(e) => {
                const selectedMember = groupMembers.find(
                  (member) => member._id === e.target.value
                );
                setNewTask({ ...newTask, assignedTo: selectedMember });
              }}
              className="border p-2 rounded"
            >
              <option value="">
                {newTask.assignedTo?.name || "Assign To"}
              </option>
              {groupMembers.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              className="border p-2 rounded"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Recurring Task Form */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Add Recurring Task</h2>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              value={recurringTask.title}
              onChange={(e) =>
                setRecurringTask({ ...recurringTask, title: e.target.value })}
              
              placeholder="Recurring Task Title"
              className="border p-2 rounded"
            />
            <input
              type="text"
              value={recurringTask.description}
              onChange={(e) =>
                setRecurringTask({
                  ...recurringTask,
                  description: e.target.value,
                })
              }
              placeholder="Description"
              className="border p-2 rounded"
            />
            <select
              value={recurringTask.assignedTo}
              onChange={(e) =>
                setRecurringTask({
                  ...recurringTask,
                  assignedTo: e.target.value,
                })
              }
              className="border p-2 rounded"
            >
              <option value="">Assign To</option>
              {groupMembers.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>
            <select
              value={newTask.recurrenceInterval || ""}
              onChange={(e) =>
                setNewTask({ ...newTask, recurrenceInterval: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="1">Daily</option>
              <option value="7">Weekly</option>
              <option value="30">Monthly</option>
            </select>
            <input
              type="date"
              value={recurringTask.dueDate}
              onChange={(e) =>
                setRecurringTask({ ...recurringTask, dueDate: e.target.value })
              }
              className="border p-2 rounded"
            />
            <button
              onClick={handleAddRecurringTask}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
            >
              Add Recurring Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {tasks.map((task) => (
            <motion.li
              key={task._id}
              className="p-4 bg-white shadow rounded flex flex-col"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {task.isRecurring && (
                <span className="text-xs text-blue-500">(Recurring)</span>
              )}
              <span className="font-bold">Title: {task.title}</span>
              <span>Description: {task.description}</span>
              <span>Assigned To: {task.assignedTo?.name || "Unassigned"}</span>
              <span>Due: {task.dueDate?.split("T")[0]}</span>
              <span>{task.completed ? <>Completed</> : <>Not Complete</>}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default TasksPage;
