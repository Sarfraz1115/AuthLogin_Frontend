import { useState } from 'react';
import { axiosInsta } from '../lib/axios';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern'; // Assuming you have this component for the right side image and text
import { Loader2, MessageSquare, Mail, Lock, Eye, EyeOff } from 'lucide-react'; // Assuming you have lucide-react installed for the icons
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const navigate = useNavigate();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formdata, setformdata] = useState({
        email: '',
        password: ''
    });


    const handleSubmit = async (e) => {
        setIsLoggingIn(true);
        e.preventDefault();
        try {
            const res = await axiosInsta.post('/auth/login', formdata);
            if (res.status === 200 && res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', res.data.username); // Store user data in localStorage
                toast.success("Login Succesfull!");
                setformdata({ email: '', password: '' });
                navigate('/'); // Redirect to homepage after successful login
                window.location.reload(); // Reload the page to reflect the new state
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed. Please try again.');
            console.error('Login error:', error);
        } finally {
            setIsLoggingIn(false);
        }
    }

    return (

        <div className=" grid lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex flex-col justify-center items-center sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="text-center">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
                            >
                                <MessageSquare className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
                            <p className="text-base-content/60">Sign in to your account</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <Mail className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type="email"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="you@example.com"
                                    value={formdata.email}
                                    onChange={(e) => setformdata({ ...formdata, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <Lock className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="••••••••"
                                    value={formdata.password}
                                    onChange={(e) => setformdata({ ...formdata, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-base-content/60">
                            Don&apos;t have an account?{" "}
                            <Link to="/signup" className="link link-primary">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Image/Pattern */}
            <AuthImagePattern
                title={"Welcome back!"}
                subtitle={"Sign in to continue your conversations and catch up with your messages."}
            />
        </div>



    )
}

export default Login