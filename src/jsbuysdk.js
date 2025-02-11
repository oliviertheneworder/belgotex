const client = ShopifyBuy.buildClient({
  domain: 'belgotex.myshopify.com',
  storefrontAccessToken: '70183538aae9e241ad5035415de0a843',
});

const checkoutButton = document.querySelector('#checkoutButton');

if (checkoutButton && !checkoutButton.disabled) {
  checkoutButton.addEventListener('click', async (event) => {
    checkoutButton.disabled = true;
    checkoutButton.textContent = 'Processing...';

    try {
      const checkout_window = window.open('', '_blank');
      checkout_window.document.write('Loading checkout...');

      const checkout = await client.checkout.create();

      const nodes = document.querySelectorAll('.samples-detail-sdk');
      if (!nodes.length) {
        throw new Error('No samples selected');
      }

      let variantString = '';
      let totalPrice = 0;

      nodes.forEach((el) => {
        const range = el.querySelector('.sample-range')?.textContent || 'Unknown Range';
        const colour = el.querySelector('.sample-colour')?.textContent || 'Unknown Colour';
        // const price = parseFloat(el.querySelector('.price-selector')?.textContent.replace(/[^0-9.]/g, '') || '0');
        const price = 150; 
        // totalPrice += price;
        totalPrice = price;

        variantString += variantString.length ? ` / ${range} - ${colour}` : `${range} - ${colour}`;
      });

      const body = { variantString, price: totalPrice.toString() };
      const requestURL = 'https://yudu-server.herokuapp.com/belgotex-sample-rug-api';

      const response = await fetch(requestURL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'Application/JSON' },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch variant ID: ${response.statusText}`);
      }

      const data = await response.json();
      const lineItemsToAdd = [{ variantId: data.id, quantity: 1 }];

      const updatedCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
      checkout_window.location.href = updatedCheckout.webUrl;
    } catch (error) {
      console.error('Error during checkout process:', error.message);
      alert('An error occurred while processing your checkout. Please try again later.');
    } finally {
      checkoutButton.disabled = false;
      checkoutButton.textContent = 'Checkout';
    }
  });
}