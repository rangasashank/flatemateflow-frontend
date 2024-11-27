import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import SideNav from '../components/SideNav';

const SettingsPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const headers = { Authorization: `Bearer ${token}` };

  // Leave Group
  const handleLeaveGroup = async () => {
    try {
      await axios.post(
        'https://flatemateflow-1buecqef.b4a.run/api/groups/leave',
        {}, // Assuming your API expects no body for leaving
        { headers }
      );
      dispatch(setUser({ ...userInfo, group: null })); // Clear the group in Redux
      navigate('/creategroup'); // Redirect to Create Group
    } catch (error) {
      console.error('Error leaving group:', error.response?.data || error.message);
      alert(error.response.data.message);
    }
  };

  // Add Member
  const handleAddMember = async () => {
    try {
      await axios.post(
        'https://flatemateflow-1buecqef.b4a.run/api/groups/addmember',
        { email: memberEmail },
        { headers }
      );
      alert('Member added successfully!');
      setMemberEmail('');
    } catch (error) {
      console.error('Error adding member:', error.response?.data || error.message);
      alert(error.response.data.message);
    }
  };

  // Remove Member
  const handleRemoveMember = async () => {
    try {
      await axios.post(
        'https://flatemateflow-1buecqef.b4a.run/api/groups/removemember',
        { groupId: userInfo.group, userEmail: email, admin_email: userInfo.email },
        { headers }
      );
      alert('Member removed successfully!');
      setEmail('');
    } catch (error) {
      console.error('Error removing member:', error.response?.data || error.message);
      alert(error.response.data.message);
    }
  };

  // Delete Group
  const handleDeleteGroup = async () => {
    try {
      await axios.post(
        'https://flatemateflow-1buecqef.b4a.run/api/groups/deletegroup',
        { groupId: userInfo.group, groupPassword: password, admin_email: userInfo.email },
        { headers }
      );
      dispatch(setUser({ ...userInfo, group: null })); // Clear the group in Redux
      navigate('/creategroup'); // Redirect to Create Group
    } catch (error) {
      console.error('Error deleting group:', error.response?.data || error.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex min-h-screen lg:flex lg:min-h-screen bg-[#EAF6FF]">
      <SideNav />
      <div className="flex-1 p-6 pt-16 lg:ml-[25%]">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>

        {/* Leave Group */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2">Leave Group</h2>
          <button
            onClick={handleLeaveGroup}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Leave Group
          </button>
        </section>

        {/* Add Member */}
        {(
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2">Add Member</h2>
            <div className="flex items-center gap-4">
              <input
                type="email"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                placeholder="Enter member's email"
                className="border p-2 rounded flex-1"
              />
              <button
                onClick={handleAddMember}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add Member
              </button>
            </div>
          </section>
        )}

        {/* Remove Member */}
        {(
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2">Remove Member</h2>
            <div className="flex items-center gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter member's email"
                className="border p-2 rounded flex-1"
              />
              <button
                onClick={handleRemoveMember}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Remove Member
              </button>
            </div>
          </section>
        )}

        {/* Delete Group */}
        {(
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2">Delete Group</h2>
            <div className="flex items-center gap-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter group password"
                className="border p-2 rounded flex-1"
              />
              <button
                onClick={handleDeleteGroup}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete Group
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
