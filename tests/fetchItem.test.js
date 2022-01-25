const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  it('test if fetchItem is a function', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('verifies if fetch is called when running the function fetchItem("MLB1615760527")', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('verifies if fetch uses specific endpoint when running the function fetchItem("MLB1615760527")', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  });

  it('verifies if the return of the function fetchItem("MLB1615760527") type is equal to item type', async () => {
    const test = await fetchItem("MLB1615760527")
    return expect(test).toEqual(item);
  });

  it('verifies if fetchItem when passed with no arguments return an error: "You must provide an url"', async () => {
    const results = await fetchItem();
    expect(results).toEqual(new Error('You must provide an url'))
  });

});
