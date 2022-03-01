

const loadPhone = () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    // clear input value
    searchInput.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayShowPhone(data.data));
};

// Phone show in display
const displayShowPhone = phones => {
    const first20Phone = phones.slice(0, 20);
    console.log(first20Phone)
    const containerShowPhone = document.getElementById('show-phone');
    // clear data
    containerShowPhone.textContent = '';

    // error message
    const errorMessage = document.getElementById('error');
    if(phones == '' || isNaN(phones) || !phones){
        errorMessage.style.display = 'block';
    }
    first20Phone.forEach(phone => {
        errorMessage.style.display = 'none';
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card p-3 p-md-4 rounded-3 border-success">
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

// Phone details load
const loadPhoneDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showPhoneDetails(data.data));
};

// Display show phone details
const showPhoneDetails = phone => {

    toggleDisplayPhone('none');
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.className = 'col-sm-8 col-md-4';
    div.innerHTML = `
        <div class="card p-3 p-md-4 rounded-3 border-success mb-5 mb-md-5">
            <img height="150px" width="150px"  src="${phone.image}" class=" img-fluid m-auto" alt="...">
        <div class="card-body mt-2 mt-md-4 text-center">
                <h5 class="card-title">Name: ${phone.name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                <p class="card-text">Release: ${phone.releaseDate ? phone.releaseDate : "Comming Up"}</p>
                <p class="card-text">Chip: ${phone.mainFeatures.chipSet}</p>
                <p class="card-text">Memory: ${phone.mainFeatures.memory}</p>
                <p id="sensors" class="card-text">Sensors: ${phone.mainFeatures.sensors}</p>
            </div>
        </div>
    `;
    phoneDetails.appendChild(div);
}

// display single phone details
const toggleDisplayPhone = displayStyle => {
    document.getElementById('show-phone').style.display = displayStyle;
}

// display data clear
const toggleDisplayPhoneDetails = displayStyle => {
    document.getElementById('phone-details').style.display = displayStyle;
}
