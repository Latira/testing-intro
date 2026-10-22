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

function removeFromCart(cart, productID) { 
  return cart.filter(item => item.id !== productID); }

function calculateCartSubtotal(cart) { 
  let cartSubtotal = 0; 
  for (const item of cart) {
    cartSubtotal += item.price*item.quantity;
  }
  return cartSubtotal; }

function calculateOrderTotal(cart, promocode) { 
  let orderTotal = {};
  orderTotal.subtotal = calculateCartSubtotal(cart);
  orderTotal.discount = 0;
  orderTotal.delivery = 30000;
  if (promocode === 'SAVE10' && orderTotal.subtotal >= 20000) {
    orderTotal.discount = Math.round(orderTotal.subtotal*0.1);
  }
  if (orderTotal.subtotal >= 50000) {
    orderTotal.delivery = 0;
  }
  orderTotal.total = orderTotal.subtotal - orderTotal.discount + orderTotal.delivery;
  return orderTotal; }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
