require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Test se fetchProducts é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });
  it('Test se o parametro passado é o corrreto.', async () => {
    expect.assertions(1);// expect 1 assertion
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Test se o endpoint esta correto', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  });
  //using mock docs to compare
  it('Test se o objeto retornado esta correto', async () => {
    expect.assertions(1);
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
  it('Test se nenhum parametro passado retorna um erro', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('É necessario uma URL'));
    };    
});
});