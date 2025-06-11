import { IconEye, IconEyeOff } from "@tabler/icons-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 Şifre görünürlüğü

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        "http://192.168.48.43:8000/auth/login",
        {
          email,
          password,
          userType: "dealer",
        }
      );

      const decoded = jwtDecode(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", decoded.role);

      if (decoded.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      console.log("Giriş başarılı:", decoded);
    } catch (error) {
      console.error("Giriş hatası:", error.response?.data || error.message);
      alert("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              placeholder="ornek@mail.com"
              className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Şifre</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-rose-500/40 hover:text-rose-400 cursor-pointer hover:bg-slate-50 p-1 rounded-full"
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-rose-500 text-white font-medium px-4 py-2 rounded-lg border border-rose-200 hover:bg-rose-600 duration-300 cursor-pointer"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
