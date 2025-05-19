
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home,
  Plane,
  Target,
  Users,
  Wallet
} from "lucide-react";

const BottomNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900/80 backdrop-blur-lg z-20">
      <div className="container mx-auto h-full">
        <div className="grid grid-cols-5 h-full">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center ${
              isActive("/") 
                ? "text-purple-400" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link
            to="/planets"
            className={`flex flex-col items-center justify-center ${
              isActive("/planets") 
                ? "text-purple-400" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Plane size={20} />
            <span className="text-xs mt-1">Planets</span>
          </Link>
          
          <Link
            to="/missions"
            className={`flex flex-col items-center justify-center ${
              isActive("/missions") 
                ? "text-purple-400" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Target size={20} />
            <span className="text-xs mt-1">Missions</span>
          </Link>
          
          <Link
            to="/friends"
            className={`flex flex-col items-center justify-center ${
              isActive("/friends") 
                ? "text-purple-400" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Users size={20} />
            <span className="text-xs mt-1">Friends</span>
          </Link>
          
          <Link
            to="/wallet"
            className={`flex flex-col items-center justify-center ${
              isActive("/wallet") 
                ? "text-purple-400" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Wallet size={20} />
            <span className="text-xs mt-1">Wallet</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
