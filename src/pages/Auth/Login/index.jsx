import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Index = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        loginUser(email, password);
    };

    const loginUser = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: email,
                password: password
            });
            // alert("giriş başarılı");
            // navigate('/');
            if (jwtDecode(response.data.token).role == "admin") {
                navigate('/admin');
            } else if (jwtDecode(response.data.token).role == "user") {
                navigate('/');
            }
            localStorage.setItem('token', response.data.token || null);
            localStorage.setItem('role', jwtDecode(response.data.token).role)
            console.log('Login başarılı:', response.data);
            console.log({ decode: jwtDecode(response.data.token) });

            // Burada response.data ile gelen yanıtı işleyebilirsin
        } catch (error) {
            console.error('Login hatası:', error.response ? error.response.data : error.message);
            // Hata durumunu burada yakalayabilirsin
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center !px-4">
            <div className="bg-white !p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 !mb-6">Giriş Yap</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block !mb-1 text-gray-600">Email</label>
                        <input
                            type="email"
                            className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="ornek@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block !mb-1 text-gray-600">Şifre</label>
                        <input
                            type="password"
                            className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white !py-2 rounded-lg hover:bg-indigo-700 transition duration-200 !mt-4"
                    >
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Index;
