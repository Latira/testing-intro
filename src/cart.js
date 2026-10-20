function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) { 
  if (quantity <= 0 || quantity > product.stock) {
    throw new RangeError('Неверное количество');
  }
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    if (existingItem.quantity + quantity > product.stock) {
      throw new RangeError('Превышен остаток');
    }
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  return cart; }
  
function changeQuantity(cart, productID, newQuantity) { 
  if (newQuantity <= 0) {
    throw new RangeError('Количество меньше нуля');
  }
  const item = cart.find(item => item.id === productID);
  if (item) {
    if (newQuantity > item.stock) {
      throw new RangeError('Количество больше, чем есть на складе');
    } else {
      item.quantity = newQuantity;
    }
  }
  return cart; }
  
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
