import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StressSOSCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-emerald-900 to-teal-800 rounded-2xl p-6 shadow-lg text-white text-center"
    >
      <div className="flex flex-col items-center">
        <span className="text-4xl mb-2">🫶</span>
        <h3 className="font-bold text-lg">Feeling overwhelmed?</h3>
        <p className="text-sm text-emerald-200 mb-4">Take a few minutes for yourself.</p>
        <Link to="/stress-sos">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-emerald-800 font-semibold rounded-full px-6 py-2 shadow-md"
          >
            Start Stress SOS
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default StressSOSCard;
