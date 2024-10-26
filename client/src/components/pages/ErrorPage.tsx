import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Home, RefreshCcw, HelpCircle } from "lucide-react";

const ErrorPage = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50/50">
      <Card className="max-w-md w-full mx-4">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Error Icon */}
            <div className="rounded-full bg-red-100 p-4">
              <AlertCircle className="h-12 w-12 text-red-600" />
            </div>

            {/* Title and Description */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter">
                Something Went Wrong
              </h1>
              <p className="text-muted-foreground">
                {error?.message || "An unexpected error has occurred."}
              </p>
            </div>

            {/* Technical Details (collapsible) */}
            <div className="w-full">
              <details className="text-sm text-left">
                <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                  Technical Details
                </summary>
                <pre className="mt-2 p-4 bg-gray-100 rounded-lg overflow-auto text-xs">
                  {error?.stack || "No error details available"}
                </pre>
              </details>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full pt-4">
              <Button
                variant="default"
                className="w-full"
                onClick={() => resetErrorBoundary?.()}
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/")}
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>

            {/* Support Section */}
            <div className="pt-6 border-t w-full space-y-4">
              <p className="text-sm text-muted-foreground">
                If the problem persists, please contact our support team.
              </p>
              <Button variant="link" onClick={() => navigate("/support")}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorPage;
