document.addEventListener('DOMContentLoaded', function() {
    const basketIcon = document.getElementById('basket-icon');
    const basketCount = document.getElementById('basket-count');
    const basketItems = document.getElementById('basket-items');
    const basketTotal = document.getElementById('basket-total');
    let basket = JSON.parse(localStorage.getItem('basket')) || [];

    document.querySelectorAll('.add-to-basket').forEach(button => {
        button.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const price = parseFloat(this.getAttribute('data-price'));
            basket.push({ title, price, quantity: 1 });
            updateBasket();
            saveBasket();
        });
    });

    function updateBasket() {
        if (basketCount) {
            basketCount.textContent = basket.length;
        }
        if (basketItems) {
            basketItems.innerHTML = '';
            let total = 0;
            basket.forEach(item => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = `${item.title} - £${item.price}`;
                basketItems.appendChild(li);
                total += item.price;
            });
            if (basketTotal) {
                basketTotal.textContent = total.toFixed(2);
            }
        }
    }

    function saveBasket() {
        localStorage.setItem('basket', JSON.stringify(basket));
    }

    // Load the basket when the page loads
    updateBasket();

    // For basket.html
    const basketTableBody = document.querySelector('tbody');
    const basketTotalElement = document.querySelector('.total p strong');

    if (basketTableBody) {
        basketTableBody.innerHTML = '';
        let total = 0;
        basket.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.title}</td>
                <td>${item.quantity}</td>
                <td>£${item.price.toFixed(2)}</td>
                <td>£${(item.price * item.quantity).toFixed(2)}</td>
            `;
            basketTableBody.appendChild(row);
            total += item.price * item.quantity;
        });
        if (basketTotalElement) {
            basketTotalElement.textContent = `Total: £${total.toFixed(2)}`;
        }
    }

    // For checkout.html
    const basketSummary = document.getElementById('basket-summary');
    if (basketSummary) {
        basketSummary.innerHTML = '';
        let total = 0;
        basket.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between lh-condensed';
            li.innerHTML = `
                <div>
                    <h6 class="my-0">${item.title}</h6>
                    <small class="text-muted">Quantity: ${item.quantity}</small>
                </div>
                <span class="text-muted">£${(item.price * item.quantity).toFixed(2)}</span>
            `;
            basketSummary.appendChild(li);
            total += item.price * item.quantity;
        });
        const totalLi = document.createElement('li');
        totalLi.className = 'list-group-item d-flex justify-content-between';
        totalLi.innerHTML = `
            <span>Total (GBP)</span>
            <strong>£${total.toFixed(2)}</strong>
        `;
        basketSummary.appendChild(totalLi);
    }

    // Clear the basket manually
    const clearBasketButton = document.getElementById('clear-basket');
    if (clearBasketButton) {
        clearBasketButton.addEventListener('click', function() {
            basket = [];
            saveBasket();
            updateBasket();
            if (basketTableBody) {
                basketTableBody.innerHTML = '';
                if (basketTotalElement) {
                    basketTotalElement.textContent = 'Total: £0.00';
                }
            }
        });
    }
});