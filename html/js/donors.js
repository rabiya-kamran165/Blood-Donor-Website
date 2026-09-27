const donorsContainer = document.getElementById("donors-grid-container");
const searchInput = document.getElementById("donor-search-input");
const searchButton = document.getElementById("search-submit-btn");

let donors = JSON.parse(localStorage.getItem("donors")) || [];

function displayDonors(donorsList) {
    donorsContainer.innerHTML = "";
    if (donorsList.length === 0) {
        donorsContainer.innerHTML = '<p class="no-donors-message">No donors found.</p>';
        return;
    }
    donorsList.forEach(function(donor){
        donorsContainer.innerHTML += `
            <div class="donor-card">
                <h3>${donor.name}</h3>
                <p><strong>Blood Group:</strong> ${donor.bloodGroup}</p>
                <p><strong>City:</strong> ${donor.city}</p>
                <p><strong>Area:</strong> ${donor.area}</p>
                <p><strong>Contact:</strong> ${donor.contact}</p>
                <p><strong>Status:</strong> <span class="${donor.status === "Verified" ? "verified" : "unverified"}">${donor.status}</span></p>
            </div>
        `;
    })
}
displayDonors(donors);

function searchDonors(){
    const searchvalue = searchInput.value.trim().toLowerCase();
    if(searchvalue === ""){
        displayDonors(donors);
        return;
    }
    const filteredDonors = donors.filter(function(donor){
        return (
            donor.name.toLowerCase().includes(searchvalue) ||
            donor.bloodGroup.toLowerCase().includes(searchvalue) ||
            donor.city.toLowerCase().includes(searchvalue) ||
            donor.area.toLowerCase().includes(searchvalue)
        );
    });
    displayDonors(filteredDonors);
}
searchButton.addEventListener("click", searchDonors);
searchInput.addEventListener("input", searchDonors);