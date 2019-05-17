module.exports = {
    port: process.env.PORT || 3000,
    session: {
        key: "leland",
        maxAge: "86400000"
    },
    mongodb: "mongodb://localhost:27017/blog"
};
