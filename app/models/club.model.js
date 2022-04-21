module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            logo: String,
            name: String,
        },
        {timestamps: true}
    );

    const Club = mongoose.model("club", schema)
    return Club
};