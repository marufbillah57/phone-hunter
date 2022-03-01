// clear data
const clearData = phoneId => {
    document.getElementById(phoneId).textContent = '';
}
// get Search Input value
const searchInputValue = searchInput => {
  return   document.getElementById(searchInput);
}

// load phone data
const loadPhone = () => {
    // document.getElementById('error-msg-1').textContent = '';
    // document.getElementById('phone-details').textContent = '';
    clearData('error-msg-1');
    clearData('show-phone');
    clearData('phone-details');
    const searchInput = searchInputValue('search-input');
    const searchValue = searchInput.value;
    // clear input value
    searchInput.value = '';

    // const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => displayShowPhone(data.data));

    // error message
    let errorMessage = document.getElementById('error-msg-1');
    if(searchValue == '' || !isNaN(searchValue)) {
        errorMessage.innerText = 'Please enter a phone name';
        searchInput.value = '';
        
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayShowPhone(data.data));
    }
        
};

let searchInput = document.getElementById('search-input').value;
// Phone show in display
const displayShowPhone = phones => {
    const first20Phone = phones.slice(0, 20);
    const containerShowPhone = document.getElementById('show-phone');
    // clear data
    containerShowPhone.textContent = '';

   const errorMessage1 = document.getElementById('error-msg-1');
   const errorMessage2 = document.getElementById('error-msg-2');
   if(isNaN(phones)){
       errorMessage1.innerText = 'Please enter a phone name';
   }
    first20Phone.forEach(phone => {
        document.getElementById('error-msg-1').style.display = 'none';
        document.getElementById('error-msg-2').style.display = 'none';
        const div = document.createElement('div');
        div.className = ('col-sm-8 col-md-4');
        div.innerHTML = `
            <div class="card p-3 p-md-4 rounded-3 border-success mb-3 mb-md-5">
                <img  src="${phone.image}" class="card-img-top w-50 m-auto" alt="...">
               <div class="card-body mt-2 mt-md-4 text-center">
                    <h5 class="card-title">Name: ${phone.phone_name}</h5>
                    <p class="card-text">Brand: ${phone.brand}</p>
                    <button id="phone-details" onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary">Details</button>
                </div>
            </div>
        `;
        containerShowPhone.appendChild(div);
        // console.log(phone);
    });
};

// Phone details  load
const loadPhoneDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showPhoneDetails(data.data));
};

// Display show phone details
const showPhoneDetails = phone => {
    clearData('show-phone');
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.className = 'col-sm-8 col-md-6';
    div.innerHTML = `
        <div class="card p-3 rounded-3 border-success mb-5 mb-md-5">
            <img  src="${phone.image}" class=" img-fluid m-auto" alt="...">
        <div class="card-body mt-2 mt-md-4 text-center">
                <h5 class="card-title">Name: ${phone.name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                <p class="card-text">Release: ${phone.releaseDate ? phone.releaseDate : "Comming Up"}</p>
                <p class="card-text">Chip: ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No found'}</p>
                <p class="card-text">Memory: ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No found'}</p>
                <p class="card-text">Bluetooth: ${phone.others?.Bluetooth ?  phone.others?.Bluetooth : 'No found'}</p>
                <p class="card-text">GPS: ${phone.others?.GPS ?  phone.others?.GPS : 'No found'}</p>
                <p class="card-text">WLAN: ${phone.others?.WLAN ?  phone.others?.WLAN : 'No found'}</p>
                <p id="sensors" class="card-text">Sensors: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors : 'No found'}</p>
            </div>
        </div>
    `;
    phoneDetails.appendChild(div);
    console.log(phone)
}





