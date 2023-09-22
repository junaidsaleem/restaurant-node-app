const customerFormatter = (customer) => {
  const { _id, name, email, phone } = customer;

  return {
    id: _id.toString(),
    name,
    email,
    phone,
  };
};

module.exports = customerFormatter;
