import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const [tasks, setTasks] = useState([]);
  const [pinnedNote, setPinnedNote] = useState('');
  const [latestNote, setLatestNote] = useState('');
  const [recurringTasks, setRecurringTasks] = useState([]);
  const [unsettledExpenses, setUnsettledExpenses] = useState([]);
  const userInfo = useSelector((state) => state.user.userInfo);
  const group = userInfo.group

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Assume token is stored here
      const headers = { Authorization: `Bearer ${token}` };

      try {
        // Fetch tasks assigned to the user
        const taskResponse = await axios.get('https://flatemateflow-1buecqef.b4a.run/api/tasks/assigned', { headers });
        setTasks(taskResponse.data);

        // Fetch notes (latest and pinned)
        const noteResponse = await axios.get(`https://flatemateflow-1buecqef.b4a.run/api/notes/${group}`, { headers });
        const { pinned } = noteResponse.data;
        setPinnedNote(pinned);
        setLatestNote(latest);

        // Fetch recurring tasks due
        const recurringResponse = await axios.get('https://flatemateflow-1buecqef.b4a.run/api/tasks/recurring', { headers });
        setRecurringTasks(recurringResponse.data);

        // Fetch unsettled expenses
        const expenseResponse = await axios.get('https://flatemateflow-1buecqef.b4a.run/api/expenses/unsettled', { headers });
        setUnsettledExpenses(expenseResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#EAF6FF]">
      {/* Side Navigation */}
      <motion.nav
        className="w-1/5 bg-white shadow-lg p-4"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-6 text-xl font-bold text-gray-700">Flatmate Flow</h1>
        <ul>
          <li className="mb-4">
            <Link to="/tasks" className="text-blue-500 hover:underline">
              Tasks
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/expenses" className="text-blue-500 hover:underline">
              Expenses
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/notes" className="text-blue-500 hover:underline">
              Notes
            </Link>
          </li>
          <li>
            <Link to="/settings" className="text-blue-500 hover:underline">
              Settings
            </Link>
          </li>
        </ul>
      </motion.nav>

      {/* Main Content */}
      <motion.div
        className="flex-1 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        {/* Tasks Assigned */}
        <section className="mt-6">
          <h2 className="text-lg font-bold text-gray-700">Tasks Assigned to You</h2>
          <ul className="mt-2 space-y-2">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <li
                  key={task._id}
                  className="p-3 bg-white rounded shadow hover:bg-gray-100"
                >
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No tasks assigned.</p>
            )}
          </ul>
        </section>

        {/* Notes */}
        <section className="mt-6">
          <h2 className="text-lg font-bold text-gray-700">Notes</h2>
          <div className="mt-2">
            <div className="p-4 mb-4 bg-white rounded shadow">
              <h3 className="font-bold text-gray-600">Pinned Note</h3>
              <p>{pinnedNote || 'No pinned notes.'}</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-bold text-gray-600">Latest Note</h3>
              <p>{latestNote || 'No latest notes.'}</p>
            </div>
          </div>
        </section>

        {/* Recurring Tasks */}
        <section className="mt-6">
          <h2 className="text-lg font-bold text-gray-700">Recurring Tasks Due</h2>
          <ul className="mt-2 space-y-2">
            {recurringTasks.length > 0 ? (
              recurringTasks.map((task) => (
                <li
                  key={task._id}
                  className="p-3 bg-white rounded shadow hover:bg-gray-100"
                >
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recurring tasks due.</p>
            )}
          </ul>
        </section>

        {/* Unsettled Expenses */}
        <section className="mt-6">
          <h2 className="text-lg font-bold text-gray-700">Unsettled Expenses</h2>
          <ul className="mt-2 space-y-2">
            {unsettledExpenses.length > 0 ? (
              unsettledExpenses.map((expense) => (
                <li
                  key={expense._id}
                  className="p-3 bg-white rounded shadow hover:bg-gray-100"
                >
                  <p className="font-medium">{expense.description}</p>
                  <p className="text-sm text-gray-500">Amount: ${expense.amount}</p>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No unsettled expenses.</p>
            )}
          </ul>
        </section>
      </motion.div>
    </div>
  );
};

export default MainPage;
