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
    // console.log(phones);
    const containerShowPhone = document.getElementById('show-phone');
    // clear data
    containerShowPhone.textContent = '';
    for(const phone of phones){
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
    }
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
    console.log(phone)
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.className = 'col-6';
    div.innerHTML = `
        <div class="card p-3 p-md-4 rounded-3 border-success mb-2 mb-md-4">
            <img height="150px" width="150px"  src="${phone.image}" class=" img-fluid m-auto" alt="...">
        <div class="card-body mt-2 mt-md-4 text-center">
                <h5 class="card-title">Name: ${phone.name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                <p class="card-text">Release: ${phone.releaseDate}</p>
            </div>
        </div>
    `;
    phoneDetails.appendChild(div);
}
