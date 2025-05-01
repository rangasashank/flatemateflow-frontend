import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const loading = useSelector((state) => state.user.loading);
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const [groupMembers, setGroupMembers] = useState([]); // To store group members

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get(
        import.meta.env.VITE_API_URL +`/api/notes/${userInfo.group}`,
        { headers }
      );
      setNotes(response.data);

      // Fetch group members
      const membersResponse = await axios.get(
        import.meta.env.VITE_API_URL+`/api/groups/${userInfo.group}`,
        { headers }
      );
      setGroupMembers(membersResponse.data); // Assume API returns an array of member objects with `name` and `_id`
    } catch (error) {
      console.error("Error fetching notes:", error.response?.data || error.message);
    }
  };

  const handleAddNote = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post(
        import.meta.env.VITE_API_URL +"/api/notes/",
        { content: newNote, group: userInfo.group },
        { headers }
      );
      setNewNote("");
      fetchNotes(); // Refresh notes
    } catch (error) {
      console.error("Error creating note:", error.response?.data || error.message);
    }
  };

  const handlePinNote = async (noteId, isPinned) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      if (!isPinned) {
        await axios.post(
          import.meta.env.VITE_API_URL +`/api/notes/pin/${noteId}`,
          {},
          { headers }
        );
      }
      else {
        await axios.post(
          import.meta.env.VITE_API_URL +`/api/notes/unpin/${noteId}`,
          {},
          { headers }
        );
      }
      
      fetchNotes(); // Refresh notes after pinning
    } catch (error) {
      console.error("Error pinning note:", error.response?.data || error.message);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.delete(
        import.meta.env.VITE_API_URL+`/api/notes/${noteId}`,
        { headers }
      );
      fetchNotes(); // Refresh notes after deletion
    } catch (error) {
      console.error("Error deleting note:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!userInfo) {
        navigate("/signin");
      } else if (!userInfo.group) {
        navigate("/creategroup");
      } else {
        fetchNotes();
      }
    }
  }, [userInfo, loading, navigate]);

  if (loading) return <div>Loading notes...</div>;

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
      <SideNav />

      <motion.div
        className="flex-1 justify-center p-6 pt-16 lg:ml-[25%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl flex justify-center font-bold pt-5 mb-4">Notes</h1>
        <div className="flex flex-col space-y-4">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new note"
            className="border p-2 rounded"
            rows="4"
          />
          <button
            onClick={handleAddNote}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Note
          </button>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {notes.map((note) => (
            <motion.li
              key={note._id}
              className="p-4 bg-white shadow rounded flex flex-col relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="pt-2">{note.content}</p>
              <span className="text-sm text-gray-500">
                Created: {new Date(note.createdAt).toLocaleDateString()}
              </span>
              <span className="text-sm text-gray-500">
                Created By: {findName(note.createdBy)}
              </span>

              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => {
                    const isPinned = note.pinned
                    handlePinNote(note._id, isPinned)
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {note.pinned ? "Pinned" : "Pin"}
                </button>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default NotesPage;
