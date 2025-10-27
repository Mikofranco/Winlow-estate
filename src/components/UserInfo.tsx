// src/components/UserInfo.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

// Utility function to generate a color based on initials
const getAvatarColor = (initials: string): string => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-pink-500',
  ];
  // Use a simple hash of initials to pick a color
  const charCodeSum = initials
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[charCodeSum % colors.length];
};

// Utility function to get user initials
const getInitials = (name: string): string => {
  const nameParts = name.trim().split(' ');
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  }
  return (
    nameParts[0].charAt(0).toUpperCase() +
    (nameParts[1] ? nameParts[1].charAt(0).toUpperCase() : '')
  );
};

const UserInfo: React.FC = () => {
  //@ts-ignore
  const { user } = useAuth() as { user: { name: string } | null };
  const userName = user?.name || 'Guest User';
  const initials = getInitials(userName);

  // State for current date and time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format date and time for WAT
  const formattedDateTime = currentTime.toLocaleString('en-US', {
    timeZone: 'Africa/Lagos',
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }) + ' WAT';

  return (
    <div className="p-2 border-b flex justify-end items-center space-x-4">
      {/* Avatar with initials */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-semibold ${getAvatarColor(
          initials
        )}`}
      >
        {initials}
      </div>
      {/* User info */}
      <div>
        <h2 className="text-lg font-semibold">{userName}</h2>
        <p className="text-sm text-gray-600">{formattedDateTime}</p>
      </div>
    </div>
  );
};

export default UserInfo;