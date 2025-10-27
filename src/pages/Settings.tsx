import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, Bell, Shield, Building2, Save } from "lucide-react";
import AppButton from "@/components/AppButton";
import { useNavigate } from "react-router-dom";


const Settings = () => {
  const navigate = useNavigate();
  const [communityName, setCommunityName] = useState("Sunset Valley Estates");
  const [communityAddress, setCommunityAddress] = useState(
    "123 Main Street, Springfield, IL 62701"
  );
  const [adminEmail, setAdminEmail] = useState("admin@sunsetvalley.com");
  const [adminName, setAdminName] = useState("Admin User");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [maxVisitorDays, setMaxVisitorDays] = useState("30");
  const [requireApproval, setRequireApproval] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const onBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your community and system preferences
          </p>
        </div>
        <Button onClick={onBack} variant="outline">
          Back to Dashboard
        </Button>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
          Settings saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Community Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 size={20} />
              Community Settings
            </CardTitle>
            <CardDescription>
              Configure your community information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Community Name
              </label>
              <Input
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="Enter community name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Community Address
              </label>
              <Input
                value={communityAddress}
                onChange={(e) => setCommunityAddress(e.target.value)}
                placeholder="Enter community address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Max Visitor Days
              </label>
              <Input
                type="number"
                value={maxVisitorDays}
                onChange={(e) => setMaxVisitorDays(e.target.value)}
                placeholder="Number of days"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Maximum days a visitor can stay
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Admin Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} />
              Admin Account
            </CardTitle>
            <CardDescription>Manage your admin profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Admin Name
              </label>
              <Input
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock size={20} />
              Security
            </CardTitle>
            <CardDescription>
              Update your password and security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                New Password
              </label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
              />
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
              <input
                type="checkbox"
                id="requireApproval"
                checked={requireApproval}
                onChange={(e) => setRequireApproval(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <label
                htmlFor="requireApproval"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Require approval for new visitors
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
              <input
                type="checkbox"
                id="notifications"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <label
                htmlFor="notifications"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Enable notifications
              </label>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
              <input
                type="checkbox"
                id="emailAlerts"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <label
                htmlFor="emailAlerts"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Email alerts for new visitors
              </label>
            </div>
            <p className="text-xs text-muted-foreground">
              Receive notifications when new visitors or staff members are added
              to the system
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button onClick={onBack} variant="outline">
          Cancel
        </Button>
        <AppButton onClick={handleSave} text="Save Settings" Icon={Save} />
      </div>
    </div>
  );
};
export default Settings;
