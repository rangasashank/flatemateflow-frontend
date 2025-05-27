import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// Remove the demoVideo import if you're not using it as a direct video file
// import demoVideo from "../assets/demo.mp4"; // This line can be removed

const LandingPage = () => {
  // The YouTube embed URL for a demo video (replace with your actual video's embed URL)
  const youtubeEmbedUrl = "https://www.youtube.com/embed/Akk-OYIpY-I?si=eCP6rcUfEX4pVUrx"; // Added autoplay, mute, and loop for a background-like effect

  return (
    <div className="relative z-0 flex flex-col items-center justify-center min-h-screen bg-[#EAF6FF] overflow-hidden">
      {/* Background Animated Circles */}
      {/* Animated Background Blobs */}
      <div className="absolute w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* Circle 1 */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float1" />
        {/* Circle 2 */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float2" />
        {/* Circle 3 */}
        <div className="absolute bottom-20 left-1/3 w-60 h-60 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float3" />
        {/* Circle 4 */}
        <div className="absolute top-1/3 right-10 w-52 h-52 bg-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float4" />
        {/* Circle 5 */}
        <div className="absolute bottom-10 right-1/2 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float5" />
      </div>


      {/* Top Navigation */}
      <div className="absolute top-4 right-4">
        <Link to="/signin">
          <motion.button
            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </Link>
        <Link to="/register">
          <motion.button
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </Link>
      </div>

      {/* Main Content */}
      <motion.div
        className="text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="mb-4 text-5xl font-extrabold text-gray-800 animate-fade-in">
          Welcome to <span className="text-blue-500">FlatmateFlow</span>
        </h1>
        <p className="mb-6 text-lg text-gray-600">
          Simplify your roommate experience by managing tasks, expenses, and
          communication all in one place.
        </p>
      </motion.div>

      {/* Demo Video - Using YouTube Embed */}
      <div className="mt-12 w-full max-w-4xl px-4 aspect-video"> {/* Added aspect-video for responsive 16:9 */}
        <iframe
          width="100%"
          height="100%"
          src={youtubeEmbedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default LandingPage;