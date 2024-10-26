import { FormField } from "@/components/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Link } from "react-router-dom";
import Layout from "@/components/layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const formSchema = z
  .object({
    username: z.string().min(6, {
      message: "Username must be at least 6 characters.",
    }),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

interface APIError {
  field: string;
  message: string;
}

export default function SignupForm() {
  const navigate = useNavigate();
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const formWatch = useWatch({
    control: form.control,
  });

  useEffect(() => {
    setApiErrors({});
  }, [formWatch]);

  async function onSubmit(values: FormValues) {
    try {
      setApiErrors({});
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/",
        values,
      );
      if (response.status === 201) {
        navigate("/");
      }
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
      console.error(err);
    }
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create an account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  label="Username"
                  placeholder="Enter your username"
                />
                <FormField
                  control={form.control}
                  name="email"
                  label="Email address"
                  placeholder="name@example.com"
                  type="email"
                />
                <FormField
                  control={form.control}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                />
                {apiErrors.general && (
                  <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                    {apiErrors.general}
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full mt-6"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Creating account..."
                    : "Create account"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
