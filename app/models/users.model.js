module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            email: String,
            pass: String,
            namaDepan: String,
            namaBelakang: String,
            asal: String,
            status: String,
        },
        {timestamps: true}
    );

    const Users = mongoose.model("users", schema)
    return Users
};