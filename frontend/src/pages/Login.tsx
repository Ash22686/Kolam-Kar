import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import kolamIcon from "@/assets/kolam-icon.png";

// A simple, reusable Alert component for displaying errors
const AlertDestructive = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive border border-destructive/20 mb-4">
      <AlertCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleFormType = () => {
    setIsLogin(!isLogin);
    setError(""); // Clear errors when switching forms
    setFormData({ name: "", email: "", password: "", confirmPassword: "" }); // Reset form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const API_URL = "http://localhost:5000/api/auth";

    try {
      if (isLogin) {
        const { email, password } = formData;
        const res = await axios.post(`${API_URL}/login`, { email, password });
        localStorage.setItem("token", res.data.token);
        navigate("/"); // Redirect to the homepage
      } else {
        const { name, email, password, confirmPassword } = formData;
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }
        const res = await axios.post(`${API_URL}/register`, { name, email, password });
        localStorage.setItem("token", res.data.token);
        navigate("/"); // Redirect to the homepage
      }
    } catch (err) {
      setError(err.response?.data?.msg || `An error occurred. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Back to Home */}
      <div className="absolute top-6 left-6 z-10">
        <Link to="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to KolamKar
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full p-2 gradient-lotus shadow-lotus">
                <img src={"/logo.png"} alt="KolamKar" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold text-primary">KolamKar</span>
            </div>
            <Badge variant="secondary" className="gradient-hero text-white border-0">
              <User className="h-4 w-4 mr-2" />
              {isLogin ? "Welcome Back" : "Join Our Community"}
            </Badge>
          </div>

          {/* Login/Signup Card */}
          <Card className="shadow-elegant border-0 backdrop-blur-sm bg-card/80">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{isLogin ? "Sign In" : "Create Account"}</CardTitle>
              <p className="text-muted-foreground text-sm">
                {isLogin ? "Enter your credentials to access your account" : "Join KolamKar to create and share beautiful Kolam designs"}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <AlertDestructive message={error} />
                
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${!isLogin ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {!isLogin && (
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="name" name="name" type="text" placeholder="Enter your full name" value={formData.name} onChange={handleInputChange} className="pl-10" required />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password} onChange={handleInputChange} className="pl-10 pr-10" required />
                    <Button type="button" variant="ghost" size="sm" className="absolute right-1 top-1 h-8 w-8 p-0" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${!isLogin ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {!isLogin && (
                    <div className="space-y-2 pt-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleInputChange} className="pl-10" required />
                      </div>
                    </div>
                  )}
                </div>

                {isLogin && (
                  <div className="text-right">
                    <Button variant="link" size="sm" className="text-primary p-0 h-auto text-xs">Forgot password?</Button>
                  </div>
                )}

                <Button type="submit" className="w-full gradient-lotus text-white border-0 shadow-lotus" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>

                <Separator />

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                  </p>
                  <Button type="button" variant="link" className="text-primary p-0 h-auto font-semibold" onClick={toggleFormType}>
                    {isLogin ? "Create account" : "Sign in"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;