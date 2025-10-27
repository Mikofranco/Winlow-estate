// src/pages/Residents.tsx
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import residents from '@/data/residents';

const Residents: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Residents</h1>
        <Button onClick={handleLogout} variant="outline">Logout</Button>
      </div>
      <Table aria-label="Resident information table">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>House Number</TableHead>
            <TableHead>Access Type</TableHead>
            <TableHead>Last Visit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {residents.residents.map((resident) => (
            <TableRow key={resident.id}>
              <TableCell>{resident.id}</TableCell>
              <TableCell>{resident.name}</TableCell>
              <TableCell>{resident.houseNumber}</TableCell>
              <TableCell>{resident.accessType}</TableCell>
              <TableCell>{new Date(resident.lastVisit).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Residents;