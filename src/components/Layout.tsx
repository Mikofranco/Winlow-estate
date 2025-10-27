// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import UserInfo from './UserInfo';

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 px-4">
        <UserInfo />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;