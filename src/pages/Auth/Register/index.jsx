import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            setSuccessMsg(res.data.message);
            alert("kayıt başarılı")
            navigate('/');
            console.log(res.data.user);
        } catch (err) {
            setErrorMsg(err.response?.data?.error || 'Kayıt başarısız');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white !p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 !mb-6">Kayıt Ol</h2>

                {successMsg && <div className="text-green-600 text-center !mb-4">{successMsg}</div>}
                {errorMsg && <div className="text-red-600 text-center !mb-4">{errorMsg}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block !mb-1 text-gray-600">Ad Soyad</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block !mb-1 text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block !mb-1 text-gray-600">Şifre</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block !mb-1 text-gray-600">Rol</label>
                        <select
                            name="role"
                            className="w-full !px-4 !py-2 border border-gray-300 rounded-lg"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="user">Kullanıcı</option>
                            <option value="admin">Yönetici</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white !py-2 rounded-lg hover:bg-blue-700 transition !mt-4"
                    >
                        Kayıt Ol
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Index;

