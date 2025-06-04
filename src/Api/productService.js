import axios from "axios";

const getXlmProduct = (page, limit) => {
    const token = localStorage.getItem("token");

    return axios.get(
        `http://localhost:5000/api/get-products?page=${page}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
const getFilteredXmlProduct = (mainCategory_id, category_id, subCategory_id) => {
    const token = localStorage.getItem("token");

    return axios.get(
        `http://localhost:5000/api/get-products-by-category?mainCategory_id=${mainCategory_id}&category_id=${category_id}&subCategory_id=${subCategory_id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

const getXmlProductById = (id) => {
    const token = localStorage.getItem("token");

    return axios.get(`http://localhost:5000/api/get-product-by-id/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export { getXlmProduct, getFilteredXmlProduct, getXmlProductById };