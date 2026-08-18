import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BreatheStep from '../components/stresssos/BreatheStep';
import GroundStep from '../components/stresssos/GroundStep';
import ReflectStep from '../components/stresssos/ReflectStep';
import CompletionStep from '../components/stresssos/CompletionStep';
import AuthenticatedLayout from '../components/layout/AuthenticatedLayout';

const StressSOS = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prev => prev + 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BreatheStep onComplete={nextStep} />;
      case 2:
        return <GroundStep onComplete={nextStep} />;
      case 3:
        return <ReflectStep onComplete={nextStep} />;
      case 4:
        return <CompletionStep />;
      default:
        return <BreatheStep onComplete={nextStep} />;
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="flex items-center justify-center min-h-screen bg-emerald-900/50">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </AuthenticatedLayout>
  );
};

export default StressSOS;
