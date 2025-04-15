
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Rocket, Users, Wallet, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      name: 'Mine',
      path: '/',
      icon: <Home size={24} />,
    },
    {
      name: 'Planets',
      path: '/planets',
      icon: <Rocket size={24} />,
    },
    {
      name: 'Missions',
      path: '/missions',
      icon: <Target size={24} />,
    },
    {
      name: 'Friends',
      path: '/friends',
      icon: <Users size={24} />,
    },
    {
      name: 'Wallet',
      path: '/wallet',
      icon: <Wallet size={24} />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-t border-white/10">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              "text-xs transition-colors duration-200",
              currentPath === item.path
                ? "text-purple-500 font-semibold"
                : "text-gray-400 hover:text-white"
            )}
          >
            {React.cloneElement(item.icon, { 
              className: cn(
                "mb-1",
                currentPath === item.path ? "text-purple-500" : "text-gray-400"
              )
            })}
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
