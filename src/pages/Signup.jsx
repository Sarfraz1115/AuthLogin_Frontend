import { axiosInsta } from '../lib/axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern'; // Assuming you have this component for the right side image and text
import { Loader2, MessageSquare, User, Mail, Lock, Eye, EyeOff } from 'lucide-react'; // Assuming you have lucide-react installed for the loader icon

const Signup = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showpassword, setshowpassword] = useState(false);
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    setIsSigningUp(true)
    e.preventDefault();

    try {
      const res = await axiosInsta.post('/auth/signup', formdata);
      if (res.status === 200 || res.status === 201) {
        toast.success('Signup successful! Please log in.');
        setformdata({ username: '', email: '', password: '' });
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        toast.error('Signup failed in trycatch. Please try again.');
        console.log(res.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'signup failed. Please try again.');
        console.error('Signup error:', error);
    }
    finally{
      setIsSigningUp(false);
    }
  }

  return (


    <div className='min-h-screen grid lg:grid-cols-2'>
            {/* left side */}
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-6'>
                    {/* Logo */}
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <MessageSquare className='size-6 text-primary' />
                            </div>
                            <h1 className='text-2xl font-bold '>Create Account</h1>
                            <p className='text-base-content/60'>Get Started with your free account</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='space-y-6'>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className=" absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <User className="size-5 text-primary" />
                                </div>
                                <input
                                    type="text"
                                    className="input input-bordered w-full pl-10"
                                    placeholder="John Doe"
                                    value={formdata.username}
                                    onChange={(e) => setformdata({ ...formdata, username: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <Mail className="size-5 text-primary" />
                                </div>
                                <input
                                    type="email"
                                    className="input input-bordered w-full pl-10"
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
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showpassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="••••••••"
                                    value={formdata.password}
                                    onChange={(e) => setformdata({ ...formdata, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setshowpassword(!showpassword)}
                                >
                                    {showpassword ? (
                                        <EyeOff className="size-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="size-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>


                        <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                            {isSigningUp ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>




            {/* right side */}
            <AuthImagePattern
                title={"Welcome to Our Platform"}
                subtitle={"Join us to explore amazing features and connect with others."}
            />
        </div>



  )
}

export default Signup