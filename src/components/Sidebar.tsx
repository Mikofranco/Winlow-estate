// src/components/Sidebar.tsx
import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Settings, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isOpen));
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogoutConfirm = () => {
    logout();
    setIsModalOpen(false);
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <motion.nav
      initial={{ width: isOpen ? 256 : 64 }}
      animate={{ width: isOpen ? 256 : 64 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col h-screen',
        isOpen ? 'w-64' : 'w-16'
      )}
      aria-label="Main navigation"
    >
      {/* Header with Logo and Toggle */}
      <div className="flex items-center justify-between p-4">
        {isOpen && (
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold"
          >
            Winlow Estate
          </motion.h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Navigation Items */}
      <ul className="flex-1 space-y-2 p-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200',
                  isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'
                )
              }
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              <item.icon className="h-5 w-5" />
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout Button with Modal */}
      <div className="p-4">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className={cn(
                'w-full flex items-center space-x-2 text-white hover:bg-red-700 transition-colors',
                !isOpen && 'justify-center'
              )}
              aria-label="Log out"
            >
              <LogOut className="h-5 w-5" />
              {isOpen && <span>Logout</span>}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogDescription>
                Are you sure you want to log out? You will need to log in again to access the dashboard.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                aria-label="Cancel logout"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogoutConfirm}
                aria-label="Confirm logout"
              >
                Yes, Log Out
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </motion.nav>
  );
};

export default Sidebar;