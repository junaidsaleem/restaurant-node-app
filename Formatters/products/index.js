


const productFormatter = (product) => {
    const { _id, name, category, price } = product;
  
    return {
      id: _id.toString(),
      name,
      category,
      price,
    };
  };
  
  module.exports = productFormatter;