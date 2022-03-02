// error message
const errorMessages = displayStyle => {
    document.getElementById('error-msg').style.display = displayStyle;
}

// Phone data load
const searchButton = () => {
    
    const searchField = document.getElementById('input-search');
    let searchValue = searchField.value;
    
    const errorMessage = document.getElementById('error-msg');
    if(searchValue == '' ||  !isNaN(searchValue) || searchValue.toLowerCase() != 'oppo' & searchValue.toLowerCase() != 'iphone' & searchValue.toLowerCase() != 'samsung'){
        errorMessage.innerText = 'Please give phone number';
        searchField.value;
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayShowPhone(data.data));
        errorMessages('none');
    }
    searchField.value = '';
}


// Phone show in display
const displayShowPhone = phones => {
    const first20Phone = phones.slice(0, 20);
    const containerShowPhone = document.getElementById('show-phone');
    // clear data
    containerShowPhone.textContent = '';

    first20Phone.forEach(phone => {
        const div = document.createElement('div');
        div.className = ('col-sm-6 col-md-4');
        div.innerHTML = `
            <div class="card p-3 rounded-3 border-success mb-3 mb-md-5 w-75 m-auto">
                <img  src="${phone.image}" class="card-img-top w-50 m-auto" alt="...">
               <div class="card-body mt-2 mt-md-4 text-center">
                    <h5 class="card-title">Name: ${phone.phone_name}</h5>
                    <h6 class="card-text"><span class="font-size">Brand:</span> ${phone.brand}</h6>
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
    
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.className = 'col-sm-6 col-md-5';
    div.innerHTML = `
        <div class="card p-3 rounded-3 border-success mb-5 mb-md-5">
            <img  src="${phone.image}" class=" img-fluid m-auto" alt="...">
        <div class="card-body mt-2 mt-md-4">
                <h5 class="card-title"><span class="font-size">Name:</span> ${phone.name}</h5>
                <h6 class="card-text"><span class="font-size">Brand:</span> ${phone.brand}</h6>
                <p class="card-text"><span class="font-size">Release:</span> ${phone.releaseDate ? phone.releaseDate : "Comming Up"}</p>
                <p class="card-text"><span class="font-size">Chip:</span> ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No found'}</p>
                <p class="card-text"><span class="font-size">Memory:</span> ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No found'}</p>
                <p class="card-text"><span class="font-size">Bluetooth:</span> ${phone.others?.Bluetooth ?  phone.others?.Bluetooth : 'No found'}</p>
                <p class="card-text"><span class="font-size">GPS:</span> ${phone.others?.GPS ?  phone.others?.GPS : 'No found'}</p>
                <p class="card-text"><span class="font-size">WLAN: </span>${phone.others?.WLAN ?  phone.others?.WLAN : 'No found'}</p>
                <p id="sensors" class="card-text"><span class="font-size">Sensors:</span> ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors : 'No found'}</p>
            </div>
        </div>
    `;
    phoneDetails.appendChild(div);
    console.log(phone)
}

