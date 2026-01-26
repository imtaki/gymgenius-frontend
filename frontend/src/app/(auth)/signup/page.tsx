"use client";

import { useState } from "react";
import { Dumbbell, Eye, EyeOff, Mail, Lock, User, X } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { Input } from "../../../components/ui/input";
import { useRouter } from "next/navigation";
import api from "../../api/axios";
import EmailVerificationModal from "../../../components/sections/EmailVerificationModal";
import { signUpSchema } from "../../../lib/authSchemas";
import { register, registerUser } from "../../api/authService";

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignUpFormData, string>>
  >({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof SignUpFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
    setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError("");
    setErrors({});

    try {
      const validatedData = signUpSchema.parse(formData);

      const response = await registerUser(
        validatedData.userName,
        validatedData.email,
        validatedData.password
      );

      if (response.status === 201 || response.status === 200) {
        setShowVerificationModal(true);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof SignUpFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof SignUpFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else if (error.response) {
        setApiError(
          error.response.data?.message ||
            "Registration failed. Please try again."
        );
      } else {
        setApiError(
          "Network error. Please check your connection and try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Dumbbell className="h-10 w-10" />
            <span className="text-3xl font-bold ">FitTracker</span>
          </div>
          <p className="text-slate-300">
            Create your account and start your fitness journey
          </p>
        </div>

        <div className="backdrop-blur-sm rounded-2xl border border-slate-700 p-8 shadow-2xl">
          {apiError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-400">{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.userName ? "border-red-500" : "border-slate-600"
                  }`}
                  placeholder="john_doe"
                />
              </div>
              {errors.userName && (
                <p className="mt-1 text-sm text-red-400">{errors.userName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : "border-slate-600"
                  }`}
                  placeholder="john.doe@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-slate-700/50 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? "border-red-500" : "border-slate-600"
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-slate-700/50 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-slate-600"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3">
              <Input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-blue-600 bg-slate-700 border-slate-600 rounded"
              />
              <div className="flex-1">
                <label
                  htmlFor="termsAccepted"
                  className="text-sm text-slate-300"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Privacy Policy
                  </Link>
                </label>
                {errors.termsAccepted && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.termsAccepted}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold py-3 rounded-lg flex justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Email Verification Modal */}
      {showVerificationModal && (
        <EmailVerificationModal 
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        email={formData.email}
        onSuccess={() => router.push("/login?verified=true")}
      />
      )}
    </div>
  );
}
