import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react";

// 404 Page
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50/50">
      <Card className="max-w-md w-full mx-4">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* 404 Icon */}
            <div className="rounded-full bg-gray-100 p-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>

            {/* Title and Description */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter">
                Page Not Found
              </h1>
              <p className="text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full pt-4">
              <Button
                variant="default"
                className="w-full"
                onClick={() => navigate("/")}
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>

            {/* Help Link */}
            <div className="pt-6 border-t w-full text-center">
              <Button variant="link" onClick={() => navigate("/help")}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Visit our Help Center
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
