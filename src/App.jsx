import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./shared/Layout";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/Auth";
import AdminDashboard from "./AdminPages/Dashboard";
import AdminLayout from "./shared/AdminLayout";
import Unauthorized from "./pages/Unauthorized";
import ProductDetail from "./pages/ProductDetails";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Products from "./AdminPages/Products";
import Customers from "./AdminPages/Customers";
import Categories from "./AdminPages/Categories";
import CategoriesPage from "./pages/Categories";
import { MessageBoxProvider } from "./context/MessageBox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CardProvider } from "./context/CartContext";
import DashLayout from "./shared/DashLayout";
import PrivateRoute from "./component/PrivateRoute";

function App() {
  return (
    <>
      <ToastContainer />
      <CardProvider>
        <MessageBoxProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route path="/" element={<DashLayout />}>
                <Route index element={<Dashboard />} />
              </Route>

              <Route element={<PrivateRoute allowedRoles={["user"]} />}>
                <Route path="/" element={<Layout />}>
                  <Route
                    path="/login"
                    element={<AuthPage activeTab="login" />}
                  />
                  <Route
                    path="/register"
                    element={<AuthPage activeTab="register" />}
                  />
                  <Route path="product/:id" element={<ProductDetail />} />
                  <Route
                    path="categories/:subCate"
                    element={<CategoriesPage />}
                  />
                </Route>
              </Route>

              <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                <Route
                  path="/admin/"
                  element={
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/login"
                  element={<AuthPage activeTab="admin/login" />}
                />
                <Route
                  path="/admin/customers"
                  element={
                    <AdminLayout>
                      <Customers />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/categories"
                  element={
                    <AdminLayout>
                      <Categories />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <AdminLayout>
                      <Products />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <AdminLayout>
                      <Products />
                    </AdminLayout>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </MessageBoxProvider>
      </CardProvider>
    </>
  );
}

export default App;
