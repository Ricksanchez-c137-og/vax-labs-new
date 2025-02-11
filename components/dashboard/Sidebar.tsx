"use client";

import { FaTachometerAlt, FaBook, FaTrophy, FaCrosshairs, FaGraduationCap, FaRoute, FaUser, FaComment, FaFire } from "react-icons/fa";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#171717] flex flex-col mt-20 py-6 border-r border-gray-800">
      <div className="flex flex-col px-4">
        <Link href="/students/dashboard" 
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#2A2A2A] transition-colors">
          <FaTachometerAlt className="text-xl text-gray-400" />
          <span className="text-gray-300">Dashboard</span>
        </Link>
        
        {/* Other menu items */}
        <Link href="/assignments" 
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#2A2A2A] transition-colors mt-2">
          <FaBook className="text-xl text-gray-400" />
          <span className="text-gray-300">My Assignments</span>
        </Link>
        
        <Link href="/leaderboard" 
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#2A2A2A] transition-colors mt-2">
          <FaTrophy className="text-xl text-gray-400" />
          <span className="text-gray-300">Leaderboard</span>
        </Link>
        
        <Link href="/challenges" 
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#2A2A2A] transition-colors mt-2">
          <FaCrosshairs className="text-xl text-gray-400" />
          <span className="text-gray-300">Challenges</span>
        </Link>
        
        <Link href="/courses" 
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#2A2A2A] transition-colors mt-2">
          <FaGraduationCap className="text-xl text-gray-400" />
          <span className="text-gray-300">Courses</span>
        </Link>
        
        <Link href="/learning-path" 
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#2A2A2A] transition-colors mt-2">
          <FaRoute className="text-xl text-gray-400" />
          <span className="text-gray-300">Learning Path</span>
        </Link>

        <div className="mt-auto space-y-4 pt-8">
          <div className="flex items-center justify-center p-3 bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer">
            <FaFire className="text-xl text-white mr-2" />
            <span className="text-white font-medium">Streak</span>
          </div>
          <div className="flex items-center justify-center p-3 bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer">
            <span className="text-white font-bold">Points #</span>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8">
          <Link href="/profile" 
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#2A2A2A] transition-colors">
            <FaUser className="text-xl text-gray-400" />
            <span className="text-gray-300">My Profile</span>
          </Link>
          
          <Link href="/feedback" 
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#2A2A2A] transition-colors mt-2">
            <FaComment className="text-xl text-gray-400" />
            <span className="text-gray-300">Report Feedback</span>
          </Link>
        </div>
      </div>
    </aside>
  );
} 