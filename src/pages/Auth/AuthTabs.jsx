const AuthTabs = ({ currentTab, onChange }) => {
    return (
      <div className="flex bg-slate-100 rounded-lg p-1">
        <button
          onClick={() => onChange("login")}
          className={`flex-1 text-center py-2 text-sm font-medium rounded-md transition-all duration-300 ${
            currentTab === "login"
              ? "bg-white shadow text-rose-400"
              : "text-gray-500 hover:text-gray-700 cursor-pointer"
          }`}
        >
          Giriş Yap
        </button>
        <button
          onClick={() => onChange("register")}
          className={`flex-1 text-center py-2 text-sm font-medium rounded-md transition-all duration-300 ${
            currentTab === "register"
              ? "bg-white shadow text-rose-400"
              : "text-gray-500 hover:text-gray-700 cursor-pointer"
          }`}
        >
          Üye Ol
        </button>
      </div>
    );
  };
  
  export default AuthTabs;
  