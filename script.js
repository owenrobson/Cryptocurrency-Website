/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// cookies pop-up
window.addEventListener("load", function () {
    var cookiesPopup = document.getElementById("cookies-popup");
    var acceptCookiesBtn = document.getElementById("accept-cookies");

    // Check if the user has accepted cookies
    var cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
        // Display the pop-up after 3 seconds
        setTimeout(function () {
            cookiesPopup.style.display = "block";
        }, 3000);
    }

    // Set cookiesAccepted to true when the user clicks the accept button
    acceptCookiesBtn.addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", true);
        cookiesPopup.style.display = "none";
    });
});


// MARKET

// The apiUrl variable holds the URL of the API endpoint to fetch data from.
const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
// The fetch method is used to send a request to the API endpoint, and the response is returned as a Promise. Once the response is received, the data is converted from JSON format to a JavaScript object using the json() method.
fetch(apiUrl)
    .then((response) => response.json())

    // The data variable holds the array of coin data returned by the API. A forEach loop is used to iterate over each coin in the array.
    .then((data) => {
        const coinTable = document.querySelector('#coin-table tbody');

        // For each coin, a new table row (<tr>) is created using the createElement() method. Then, a new table cell (<td>) is created for each piece of information to be displayed (nickname, name, price, market cap, and 24-hour price change percentage).
        data.forEach((coin) => {
            const row = document.createElement('tr');

            // The textContent property is used to set the text content of each cell to the corresponding coin data. The toUpperCase() method is used to convert the symbol to uppercase.
            const nicknameCell = document.createElement('td');
            nicknameCell.textContent = coin.symbol.toUpperCase();

            const nameCell = document.createElement('td');
            nameCell.textContent = coin.name;

            // The classList property is used to add a CSS class to the priceCell and changeCell elements, depending on whether the 24-hour price change percentage is positive or negative.
            const priceCell = document.createElement('td');
            priceCell.classList.add('price');
            priceCell.textContent = `$${coin.current_price.toFixed(2)}`;

            const marketCapCell = document.createElement('td');
            marketCapCell.textContent = `$${coin.market_cap.toLocaleString()}`;

            const changeCell = document.createElement('td');
            if (coin.price_change_percentage_24h > 0) {
                changeCell.classList.add('positive');
            } else if (coin.price_change_percentage_24h < 0) {
                changeCell.classList.add('negative');
            }
            changeCell.textContent = `${coin.price_change_percentage_24h.toFixed(2)}%`;

            // the new row is appended to the table (coinTable) using the appendChild() method.
            row.appendChild(nicknameCell);
            row.appendChild(nameCell);
            row.appendChild(priceCell);
            row.appendChild(changeCell);
            row.appendChild(marketCapCell);


            coinTable.appendChild(row);
        });
    });

// checkbox and form validation
const checkbox = document.querySelector('input[type="checkbox"]');
const emailInput = document.querySelector('.email');
const submitButton = document.querySelector('.submit-button');
const newsletterContainer = document.querySelector('.newsletter-container');

submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    if (checkbox.checked) {
        const email = emailInput.value;
        const emailRegex = /^[^\s@!?]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)) {
            newsletterContainer.innerHTML = '<p class="success-message">Thank you for subscribing!</p>';
            newsletterContainer.querySelector('.success-message').style.fontSize = '36px';
        } else {
            alert('Invalid email, please try again.');
        }
    } else {
        alert('Please confirm that you agree to the terms and conditions');
    }
});


