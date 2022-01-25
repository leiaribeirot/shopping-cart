const fetchProducts = async (mouse) => {
    const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${mouse}`;
    
    const result = await fetch(API_URL)
     .then((response) => response.json())
     .then((data) => data)

    .catch((error) => error); 

    return result;
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}