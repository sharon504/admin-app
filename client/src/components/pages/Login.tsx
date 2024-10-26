import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/FormField";
import { Link } from "react-router-dom";
import Layout from "@/components/layout";
import { useAuth } from "@/context/AuthContext";
import { AxiosError } from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface APIError {
  field: string;
  message: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});
  const { login } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formWatch = useWatch({
    control: form.control,
  });

  useEffect(() => {
    setApiErrors({});
  }, [formWatch]);

  async function onSubmit(values: FormValues) {
    setApiErrors({});
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data) {
        const errorData = err.response.data;

        if (Array.isArray(errorData.errors)) {
          const newErrors: Record<string, string> = {};
          errorData.errors.forEach((error: APIError) => {
            newErrors[error.field] = error.message;
          });
          setApiErrors(newErrors);

          Object.keys(newErrors).forEach((field) => {
            form.setError(field as keyof FormValues, {
              type: "manual",
              message: newErrors[field],
            });
          });
        } else if (errorData.field && errorData.message) {
          setApiErrors({ [errorData.field]: errorData.message });
          form.setError(errorData.field as keyof FormValues, {
            type: "manual",
            message: errorData.message,
          });
        } else {
          const errorMessage = errorData.message || "An error occurred";
          setApiErrors({ general: errorMessage });
        }
      } else {
        setApiErrors({ general: "An unexpected error occurred" });
      }
    }
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome back
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  label="Email address"
                />
                <FormField
                  control={form.control}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  label="Password"
                />
                {apiErrors.general && (
                  <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                    {apiErrors.general}
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
