import React from 'react';
import { motion } from 'framer-motion';

const GroundStep = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md text-center"
    >
      <h2 className="text-2xl font-bold text-white mb-2">Come back to the present.</h2>
      <div className="text-left bg-black/20 p-6 rounded-lg my-8">
        <p className="text-emerald-200 mb-4">A simple grounding exercise:</p>
        <ul className="space-y-4 text-white">
          <li>5 things you can see</li>
          <li>4 things you can touch</li>
          <li>3 things you can hear</li>
          <li>2 things you can smell</li>
          <li>1 thing you can appreciate</li>
        </ul>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="bg-white text-emerald-800 font-semibold rounded-full px-8 py-3 shadow-md"
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

export default GroundStep;
