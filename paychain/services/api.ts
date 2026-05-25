export const CONFIG = {
    BASE_URL: "",
    API_KEY: process.env.MONGO_DB,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.MONGO_DB}`
    },
};


