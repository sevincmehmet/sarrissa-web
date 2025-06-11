import { useEffect, useState } from "react";
import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Register/RegisterForm";
import AuthTabs from "./AuthTabs";
import { useNavigate } from "react-router-dom";
import Footer from "../../component/Footer";
import { motion } from "framer-motion";
import AppLogo from "../../assets/AppLogo2.png";
const Index = ({ activeTab }) => {
  const navigate = useNavigate();

  const isAdmin = activeTab === "admin/login";

  useEffect(() => {
    navigate(`/${activeTab}`);
  }, []);

  return (
    <>
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className={` flex ${
            isAdmin ? "items-center fixed top-0 left-0 right-0 bottom-0" : "items-start"
          } mt-8 justify-center  px-4`}
        >
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg shadow-slate-100 border border-slate-200 ">
            {isAdmin ? (
              <div className="flex items-center justify-center">
                <img className="h-[8rem]" src={AppLogo} alt="" />
              </div>
            ) : (
              <AuthTabs
                currentTab={activeTab}
                onChange={(e) => navigate(`/${e}`)}
              />
            )}
            <div className="mt-6">
              {activeTab === "login" || isAdmin ? (
                <LoginForm isAdmin={isAdmin} />
              ) : (
                <RegisterForm />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Index;
