

function fetchData(url) {
   return fetch(url)
       .then(response => {
           if (!response.ok) {
               throw new Error('Failed to fetch data');
           }
           return response.json();
       });
}

function populateCurrency() {
   const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

   fetchData(url)
       .then(data => {
           if (!data) return;

           let currencySelector = document.getElementById('currencySelector');
           currencySelector.innerHTML += '';

           data.forEach(item => {
               let option = document.createElement('option');
               option.value = item.cc;
               option.textContent = item.cc;
               currencySelector.appendChild(option);
           });

           let uahOption = document.createElement('option');
           uahOption.value = 'UAH';
           uahOption.textContent = 'UAH';
           currencySelector.appendChild(uahOption);

           currencySelector.addEventListener('change', function () {
               let selectedCurrency = currencySelector.value;
               convertToSelectedCurrency(selectedCurrency);
           });
       })
       .catch(error => console.error('An error occurred while fetching data:', error));
}

function convertToSelectedCurrency(selectedCurrency) {
   const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

   fetchData(url)
       .then(data => {
           let badges = document.querySelectorAll('.badge');

           badges.forEach(badge => {
               let currencyText = badge.textContent.trim();
               let currencyCode = currencyText.split(' ')[0];
               let price = parseFloat(currencyText.split(' ')[1]);

               let rateToUAH = 1;
               let rateFromUAH = 1;
               rateToUAH = data.find(item => item.cc === currencyCode).rate;

               if (selectedCurrency !== 'UAH') {
                   rateFromUAH = data.find(item => item.cc === selectedCurrency).rate;
               }

               let convertedPrice = (price * rateToUAH / rateFromUAH).toFixed(2);

               badge.textContent = `${selectedCurrency} ${convertedPrice}`;
           });
       })
       .catch(error => console.error('An error occurred while converting currency:', error));
}

populateCurrency();










