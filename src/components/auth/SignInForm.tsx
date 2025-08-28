import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useAuth } from "../../context/AuthContext";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [userType, setUserType] = useState<'admin' | 'client' | 'lawyer'>('client');
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const loginData = userType === 'admin' || userType === 'client' 
        ? { username: credentials.username, password: credentials.password }
        : { email: credentials.email, password: credentials.password };
      
      await login(loginData, userType);
      
      // Redirect based on user type
      switch (userType) {
        case 'admin':
          navigate('/');
          break;
        case 'client':
          navigate('/client');
          break;
        case 'lawyer':
          navigate('/lawyer');
          break;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Welcome Back
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            sign in to your account
            </p>
          </div>
          <div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* User Type Selection */}
                <div>
                  <Label>Login As <span className="text-error-500">*</span></Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="userType"
                        value="client"
                        checked={userType === 'client'}
                        onChange={(e) => setUserType(e.target.value as 'admin' | 'client' | 'lawyer')}
                        className="mr-2"
                      />
                      Client
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="userType"
                        value="lawyer"
                        checked={userType === 'lawyer'}
                        onChange={(e) => setUserType(e.target.value as 'admin' | 'client' | 'lawyer')}
                        className="mr-2"
                      />
                      Lawyer
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="userType"
                        value="admin"
                        checked={userType === 'admin'}
                        onChange={(e) => setUserType(e.target.value as 'admin' | 'client' | 'lawyer')}
                        className="mr-2"
                      />
                      Admin
                    </label>
                  </div>
                </div>

                {/* Email/Username Field */}
                <div>
                  <Label>
                    {userType === 'lawyer' ? 'Email' : 'Username'} <span className="text-error-500">*</span>
                  </Label>
                  <Input 
                    name={userType === 'lawyer' ? 'email' : 'username'}
                    placeholder={userType === 'lawyer' ? 'Enter Email' : 'Enter Username'}
                    value={userType === 'lawyer' ? credentials.email : credentials.username}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={handleInputChange}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md dark:bg-red-900/20 dark:text-red-400">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm" disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Log In'}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
              </p>
              <div className="flex flex-wrap gap-2 mt-2 text-sm">
                <Link
                  to="/signup/client"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up as Client
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  to="/signup/lawyer"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up as Lawyer
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  to="/signup/admin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up as Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
