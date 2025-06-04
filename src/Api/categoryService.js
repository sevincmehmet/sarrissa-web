import axios from "axios";

const createMainCategory = (categoryName) => {
    const token = localStorage.getItem("token");

    return axios.post(
        'http://localhost:5000/api/categories/add-main-category',
        { name: categoryName },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

const addSubCategory = (name, mainCategoryId, parentCategoryId) => {
    const token = localStorage.getItem("token");

    return axios.post(
        "http://localhost:5000/api/categories/add-sub-category",
        {
            name,
            main_category_id: mainCategoryId,
            parent_category_id: parentCategoryId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};


const getSubCategories = (categoryId) => {
    const token = localStorage.getItem("token");

    return axios.get(`http://localhost:5000/api/categories/get-sub-categories/${categoryId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getMainCategories = () => {
    const token = localStorage.getItem("token");

    return axios.get("http://localhost:5000/api/categories/get-main-categories", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const addCategory = (name, mainCategoryId) => {
    const token = localStorage.getItem("token");

    return axios.post(
        "http://localhost:5000/api/categories/add-category",
        {
            name,
            main_category_id: mainCategoryId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

const getCategoriesByMainId = (mainCategoryId) => {
    const token = localStorage.getItem("token");

    return axios.get(
        `http://localhost:5000/api/categories/get-categories/${mainCategoryId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

const getCategoryTree = () => {
    const token = localStorage.getItem("token");

    return axios.get("http://localhost:5000/api/categories/tree", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


export { createMainCategory, getMainCategories, getCategoriesByMainId, addCategory, addSubCategory, getSubCategories, getCategoryTree };
