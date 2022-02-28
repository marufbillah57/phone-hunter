const loadPhone = () => {
    const searchText = document.getElementById('search-input').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showPhoneDetails(data.data));
};

const showPhoneDetails = phones => {
    // console.log(phones);
    for(const phone of phones){
        console.log(phone);
        const containerShowPhone = document.getElementById('show-phone-details');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card p-3 p-md-4 rounded-3 border-success">
                <img  src="${phone.image}" class="card-img-top w-50 m-auto" alt="...">
               <div class="card-body mt-2 mt-md-4 text-center">
                    <h5 class="card-title">Name: ${phone.phone_name}</h5>
                    <p class="card-text">Brand: ${phone.brand}</p>
                    <a href="#" class="btn btn-primary">Details</a>
                </div>
            </div>
        `;
        containerShowPhone.appendChild(div);
    }
}