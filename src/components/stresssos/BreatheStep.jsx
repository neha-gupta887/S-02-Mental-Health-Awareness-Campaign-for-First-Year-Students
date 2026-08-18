import React from 'react';
import { motion } from 'framer-motion';

const BreatheStep = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md text-center"
    >
      <h2 className="text-2xl font-bold text-white mb-2">Let's slow things down.</h2>
      <p className="text-emerald-200 mb-8">Follow the rhythm for a few gentle breaths.</p>
      <div className="flex justify-center items-center h-64">
        <p className="text-white text-lg">Breathing animation would go here.</p>
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

export default BreatheStep;
