import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import WelcomeHeader from '../../components/Dashboard/WelcomeHeader';
import WellnessStats from '../../components/Dashboard/WellnessStats';
import QuickActions from '../../components/Dashboard/QuickActions';
import UpcomingSessions from '../../components/Dashboard/UpcomingSessions';
import ResourceCarousel from '../../components/Dashboard/ResourceCarousel';
import MoodHistory from '../../components/Dashboard/MoodHistory';
import HowItWorks from '../../components/Dashboard/HowItWorks';
import { getDashboardStats } from '../../services/dashboardService';
import { FaUserFriends } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    moodsTracked: 0,
    journals: 0,
    breathingSessions: 0
  });

  useEffect(() => {
    // This is a placeholder for where you might fetch real data
    // For now, it uses mock data.
    const fetchStats = async () => {
      // const userStats = await getDashboardStats();
      // setStats(userStats);
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-gray-950 sm:p-6 lg:p-8">
      <main className="mx-auto max-w-7xl">
        <WelcomeHeader />
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <WellnessStats stats={stats} />
              <QuickActions />
              <UpcomingSessions />
              <ResourceCarousel />
            </div>
          </div>
          <div className="space-y-8">
            <MoodHistory />
            <HowItWorks />
          </div>
        </motion.section>

        {/* Senior Buddy Spotlight Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white shadow-lg shadow-emerald-500/30">
            <h2 className="text-3xl font-bold">You're not alone in this.</h2>
            <p className="mt-2 max-w-2xl text-lg text-emerald-100">
              Connect with a senior who understands university life.
            </p>
            <div className="mt-6">
              <Link to="/support" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-emerald-700 shadow-md transition-transform hover:scale-105">
                <FaUserFriends /> Find a Senior Buddy
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Dashboard;