import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomeLanding = () => {

    return (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}>
      <div className="absolute top-10 left-5">
        <Link to="/">
          <motion.button
            className="px-4 py-2 mr-2 w-200 text-white bg-green-600 rounded hover:bg-green-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.button>
        </Link>
        
      </div>
</motion.div>
    )
}
export default HomeLanding;
