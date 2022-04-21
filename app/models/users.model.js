module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      email: String,
      username: String,
      address: String,
      phone_number : String,
      password: String,
    },
    { timestamps: true }
  );

  const Users = mongoose.model('users', schema);
  return Users;
};
