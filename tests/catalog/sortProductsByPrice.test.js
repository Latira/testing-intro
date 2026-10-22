const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const result = sortProductsByPrice(products, 'asc').map(item => item.id);
    expect(result).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    const result = sortProductsByPrice(products).map(item => item.id);
    expect(result).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const result = sortProductsByPrice(products.filter(item => [1, 3, 4].includes(item.id))).map(item => item.id);
    expect(result).toEqual([3, 4, 1]);
  });
  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    const result = sortProductsByPrice(products, 'desc').map(item => item.id);
    expect(result).toEqual([1, 2, 4, 5, 6, 3]);
  });
  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const result = sortProductsByPrice(products.filter(item => [3, 1, 4].includes(item.id)), 'desc').map(item => item.id);
    expect(result).toEqual([1, 4, 3]);
  });
  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const result = sortProductsByPrice(products.filter(item => [5, 2, 6].includes(item.id)), 'desc').map(item => item.id);
    expect(result).toEqual([2, 5, 6]);
  });
  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const inputProducts = products.filter(item => [1, 3, 4].includes(item.id));
    const result = sortProductsByPrice(inputProducts, 'asc');
    expect(inputProducts.map(item => item.id)).toEqual([1, 3, 4]);
  });
  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const inputProducts = products.filter(item => [1, 3, 4].includes(item.id));
    const result = sortProductsByPrice(inputProducts, 'desc');
    expect(inputProducts.map(item => item.id)).toEqual([1, 3, 4]);
  });
  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const result = sortProductsByPrice(products);
    expect(products.map(item => item.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
