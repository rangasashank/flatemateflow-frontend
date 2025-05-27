import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState([]); // New state for balances
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    paidBy: "",
    group: "",
    splitAmong: [],
  });
  const [groupMembers, setGroupMembers] = useState([]);
  const loading = useSelector((state) => state.user.loading);
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  const group = userInfo?.group;

  const fetchExpensesAndBalances = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch expenses
      const expensesResponse = await axios.get(
        import.meta.env.VITE_API_URL + `/api/expenses/${group}`,
        { headers }
      );
      setExpenses(expensesResponse.data);

      // Fetch group members (needed for expense creation and balance display)
      const membersResponse = await axios.get(
        import.meta.env.VITE_API_URL + `/api/groups/${group}`,
        { headers }
      );
      setGroupMembers(membersResponse.data);
      console.log("Group Members:", groupMembers);


      // Fetch balances
      const balancesResponse = await axios.get(
        import.meta.env.VITE_API_URL + `/api/expenses/balances/${group}`,
        { headers }
      );
      setBalances(balancesResponse.data);
    } catch (error) {
      console.error(
        "Error fetching expenses or balances:",
        error.response?.data || error.message
      );
    }
  };

  const handleAddExpense = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // Ensure paidBy is the user's _id
      const expenseToCreate = {
        ...newExpense,
        group: group,
        paidBy: newExpense.paidBy, // Send  _id
        splitAmong: newExpense.splitAmong, // Send array of _ids
      };


      await axios.post(
        import.meta.env.VITE_API_URL + "/api/expenses/",
        expenseToCreate,
        {
          headers,
        }
      );
      setNewExpense({
        description: "",
        amount: "",
        paidBy: "",
        group: group,
        splitAmong: [],
      });
      fetchExpensesAndBalances(); // Re-fetch all data after adding expense
    } catch (error) {
      console.error(
        "Error creating expense:",
        error.response?.data || error.message
      );
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.delete(
        import.meta.env.VITE_API_URL + `/api/expenses/${expenseId}`,
        { headers }
      );
      fetchExpensesAndBalances(); // Re-fetch all data after deleting expense
    } catch (error) {
      console.error(
        "Error deleting expense:",
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
        fetchExpensesAndBalances();
      }
    }
  }, [userInfo, loading, navigate]);

  if (loading) return <div>Loading expenses...</div>;

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
          Expenses
        </h1>

        {/* Add Expense Form */}
        <div className="flex flex-col justify-center">
          <div className="flex justify-center flex-col space-y-2">
            <input
              type="text"
              value={newExpense.description}
              onChange={(e) =>
                setNewExpense({ ...newExpense, description: e.target.value })
              }
              placeholder="Expense Description"
              className="border p-2 rounded"
            />
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) =>
                setNewExpense({ ...newExpense, amount: e.target.value })
              }
              placeholder="Amount"
              className="border p-2 rounded"
            />
            <select
              value={newExpense.paidBy}
              onChange={(e) => {
                setNewExpense({ ...newExpense, paidBy: e.target.value });
              }}
              className="border p-2 rounded"
            >
              <option value="">
                {newExpense.paidBy ? groupMembers.find(member => member._id === newExpense.paidBy)?.name || "Paid By" : "Paid By"}
              </option>
              {groupMembers.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>
            <label className="text-sm text-gray-600">Split Among:</label>
            <div className="flex flex-wrap gap-2">
              {groupMembers.map((member) => (
                <label key={member._id} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={member._id}
                    checked={newExpense.splitAmong.includes(member._id)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;

                      if (isChecked) {
                        setNewExpense({
                          ...newExpense,
                          splitAmong: [
                            ...newExpense.splitAmong,
                            e.target.value,
                          ],
                        });
                      } else {
                        setNewExpense({
                          ...newExpense,
                          splitAmong: newExpense.splitAmong.filter(
                            (id) => id !== e.target.value
                          ),
                        });
                      }
                    }}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{member.name}</span>
                </label>
              ))}
            </div>

            <button
              onClick={handleAddExpense}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Expense
            </button>
          </div>
        </div>

        {/* Group Balances Section */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Group Balances</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {balances.map((balance) => (
              <motion.li
                key={balance.userId}
                className={`p-4 bg-white shadow rounded ${
                  balance.balance < 0
                    ? "border-l-4 border-red-500"
                    : "border-l-4 border-green-500"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-bold">{balance.name}: </span>
                {balance.balance < 0 ? (
                  <span className="text-red-600">
                    Owes ${Math.abs(balance.balance).toFixed(2)}
                  </span>
                ) : (
                  <span className="text-green-600">
                    Is owed ${balance.balance.toFixed(2)}
                  </span>
                )}
              </motion.li>
            ))}
          </ul>
        </div>


        {/* Expense List */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Recent Expenses</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expenses.map((expense) => (
              <motion.li
                key={expense._id}
                className="p-4 bg-white shadow rounded flex flex-col"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-bold">
                  Description: {expense.description}
                </span>
                <span>Amount: ${expense.amount.toFixed(2)}</span>
                <span>Paid By: {expense.paidBy?.name || "Unknown"}</span>
                <span>
                  Split Among:{" "}
                  {expense.splitAmong && expense.splitAmong.length > 0
                    ? expense.splitAmong.map((s) => groupMembers.find(member => member._id === s)?.name).join(", ")
                    : "All Group Members"}
                </span>
                <span className="text-sm text-gray-500">
                  Date: {new Date(expense.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleDeleteExpense(expense._id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm self-end"
                >
                  Delete
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default ExpensesPage;