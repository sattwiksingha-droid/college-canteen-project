document.getElementById('checkout').addEventListener('click', () => {
  if(cart.size === 0){
    showToast('Cart is empty.', 'warn');
    return;
  }
  const cartArray = Array.from(cart.values()); // Convert Map to array
  saveOrder(cartArray); // Save to Firebase
});
function saveOrder(cartItems) {
  db.collection('orders').add({
    items: cartItems,
    time: new Date()
  }).then(() => {
    alert('Order saved to Firebase!');
  }).catch(err => {
    alert('Error saving order: ' + err.message);
  });
}
const analytics = firebase.analytics();
document.getElementById('checkout').addEventListener('click', () => {
  if(cart.size === 0){
    alert('Cart is empty!');
    return;
  }
  const cartArray = Array.from(cart.values());
  saveOrder(cartArray);

  // Log event in Analytics
  analytics.logEvent('checkout_clicked', {
    item_count: cartArray.length,
    total_price: cartArray.reduce((sum, item) => sum + item.price, 0)
  });
});
