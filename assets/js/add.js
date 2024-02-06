
const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

async function convertToSelectedCurrency(selectedCurrency) {
    try {
        let data = await fetch(url);
        data = await data.json();

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
    } catch (error) {
    }
}

async function populateCurrency() {
   async function fetchData(url) {
      let response = await fetch(url);
      return await response.json();
  }
  
  async function populateCurrency() {
   const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
   let data = await fetchData(url).catch(error => console.error('An error occurred while fetching data:', error));

   if (data) {
       let currencySelector = document.getElementById('currencySelector');

       data.forEach(item => {
           let option = document.createElement('option');
           option.value = item.cc;
           option.textContent = item.cc;
           currencySelector.appendChild(option);
       });
   }
}
  
  populateCurrency();
}

  populateCurrency();

  let selection = document.getElementById('currencySelector');

  selection.addEventListener('change', function () {
      let selectedCurrency = selection.value;
      convertToSelectedCurrency(selectedCurrency);
});








