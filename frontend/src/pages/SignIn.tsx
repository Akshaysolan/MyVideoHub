import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import type { AuthFormData } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispath } from '../reducers/store';
import { selectLoding, signInuser } from '../reducers/auth/authReducer';
import { AiOutlineLoading } from 'react-icons/ai';

const Signup: React.FC = () => {

    const [formData, setFormData] = useState<AuthFormData>({
        email: "",
        password: "",
    });


    const loading = useSelector(selectLoding);


    const dispatch = useDispatch<AppDispath>();

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("FormData", FormData);
        const { email, password } = formData;
        dispatch(signInuser({ email, password, navigate }));
    }

    return (
        <Layout>
            <div className='flex items-center justify-center p-4 w-full'>
                <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-6 '>
                    <h1 className='text-3xl font-bold text-center text-gray-800 mb-5'>Wel-Come Back</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-green-500'
                            />
                            <label className='block text-sm font-medium text-gray-700'>Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-green-500'
                            />
                        </div>
                        <div className='mt-4 text-blue-600'>
                            <Link to="" >Forget your Password</Link>
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="mt-6 w-full py-3 px-6 bg-orange-400 text-white rounded-md font-semibold hover:bg-pink-700 transition-colors flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <AiOutlineLoading className="animate-spin" size={20} />
                                    Verifying...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                    <p className="text-sm mt-4 text-center">
                        Do not have an account?{" "}
                        <Link
                            to="/sign-up"
                            className="text-indigo-600 hover:text-indigo-500 font-medium transition-all duration-300"
                        >
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Signup;
