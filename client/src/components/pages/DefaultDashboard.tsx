import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bell, Calendar, FileText, Settings, Star, Users } from "lucide-react";
import Layout from "@/components/layout";
import { useAuth } from "@/context/AuthContext";

const WelcomeDashboard = () => {
  const { user } = useAuth();
  const notifications = [
    { id: 1, title: "Your last report was submitted", time: "2 hours ago" },
    { id: 2, title: "Team meeting scheduled", time: "1 day ago" },
    { id: 3, title: "Project milestone achieved", time: "2 days ago" },
  ];

  const quickActions = [
    { icon: FileText, label: "New Report" },
    { icon: Calendar, label: "Schedule" },
    { icon: Users, label: "Team Chat" },
    { icon: Star, label: "Favorites" },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto bg-gray-50">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user.username}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your projects.
            </p>
          </div>
          <Button
            variant="outline"
            className="gap-2 bg-white hover:bg-gray-100 text-gray-900"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="cursor-pointer bg-white hover:bg-gray-100 transition-colors border-gray-200"
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <action.icon className="h-8 w-8 text-gray-900 mb-2" />
                <p className="font-medium text-gray-800">{action.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                Current Project Progress
              </CardTitle>
              <CardDescription className="text-gray-600">
                Your active project status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-800">
                      Project Alpha
                    </span>
                    <span className="text-gray-600">75%</span>
                  </div>
                  <Progress
                    value={75}
                    className="h-2 bg-gray-200"
                    indicatorClassName="bg-gray-900"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-800">
                      Project Beta
                    </span>
                    <span className="text-gray-600">45%</span>
                  </div>
                  <Progress
                    value={45}
                    className="h-2 bg-gray-200"
                    indicatorClassName="bg-gray-900"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Card */}
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-gray-900">
                Recent Notifications
              </CardTitle>
              <Bell className="h-5 w-5 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0"
                  >
                    <p className="font-medium text-gray-800">
                      {notification.title}
                    </p>
                    <span className="text-sm text-gray-600">
                      {notification.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default WelcomeDashboard;
