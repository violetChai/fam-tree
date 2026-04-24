import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api"
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const addParent = (parentId, childId) => {
    return api.post("/relationships/parent", { parentId, childId });
};

export const addChild = (parentId, childId) => {
    return api.post("/relationships/child", { parentId, childId });
};

export const addSpouse = (personId, spouseId) => {
    return api.post("/relationships/spouse", { personId, spouseId });
};

export const removeRelationship = (personId, relatedPersonId, type) => {
    return api.delete("/relationships", {
        data: { personId, relatedPersonId, type }
    });
};


export default api;