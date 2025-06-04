import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "+90",
    password: "",
    role: "user",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 Şifre görünürlük durumu

  const formatPhoneNumber = (value) => {
    // Sadece rakamları al
    const digits = value.replace(/\D/g, "");

    // +90 sabit başlangıç
    let formatted = "+90 ";

    console.log({ digits, length: digits.length });

    if (digits.length > 2) {
      formatted += `(${digits.substring(2, 5)}`;
    }
    if (digits.length >= 6) {
      formatted += `) ${digits.substring(5, 8)}`;
    }
    if (digits.length >= 8) {
      formatted += ` ${digits.substring(8, 10)}`;
    }
    if (digits.length >= 10) {
      formatted += ` ${digits.substring(10, 12)}`;
    }

    return formatted.trim();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      setSuccessMsg(res.data.message);
      alert("Kayıt başarılı");
      navigate("/");
      console.log(res.data.user);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Kayıt başarısız");
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        {successMsg && (
          <div className="text-rose-600 text-center mb-4">{successMsg}</div>
        )}
        {errorMsg && (
          <div className="text-red-600 text-center mb-4">{errorMsg}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-600">Ad Soyad</label>
            <input
              type="text"
              name="name"
              placeholder="Adınızı ve Soyadınızı girin"
              className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="ornek@mail.com"
              className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Telefon</label>
            <input
              type="tel"
              name="tel"
              placeholder="+90 (5__) ___ __ __"
              className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.tel}
              onChange={(e) => {
                const { name, value } = e.target;

                if (name === "tel") {
                  const formatted = formatPhoneNumber(value);
                  setFormData((prev) => ({ ...prev, [name]: formatted }));
                } else {
                  setFormData((prev) => ({ ...prev, [name]: value }));
                }
              }}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Şifre</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // 👈 Şifre görünürlüğü değişiyor
                name="password"
                placeholder="••••••••"
                minLength={6}
                className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={formData.password}
                onChange={handleChange}
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
            className="w-full mt-4 bg-rose-500 text-white font-medium px-4 py-2 rounded-lg border border-rose-200 hover:bg-rose-600 duration-300"
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
