const requestsContainer = document.getElementById("requests-grid-container");
const bloodRequests = JSON.parse(localStorage.getItem("bloodRequests")) || [];

function displayRequests(){
    const normalRequests = bloodRequests.filter(function(request){
        return request.requestType === "normal";
    });
    
    requestsContainer.innerHTML = "";
    if(normalRequests.length === 0){
        requestsContainer.innerHTML = `
        <div class="no-request">
        <h3>No Active Normal Blood Requests</h3>
        <p>There are currently no Blood Requests</p>
        </div>
        `;
        return;
    }

    normalRequests.forEach(function(request){
        const requestCard = document.createElement('div');
        requestCard.classList.add("request-card");

        requestCard.innerHTML = `
            <h3>${request.bloodGroup} Blood Required</h3>
            <p><strong>Patient Name:</strong> ${request.patientName}</p>
            <p><strong>Blood Units:</strong> ${request.bloodUnits}</p>
            <p><strong>Blood Required Date:</strong> ${request.date}</p>
            <p><strong>City:</strong> ${request.city}</p>
            <p><strong>Area:</strong> ${request.area}</p>
            <p><strong>Hospital:</strong> ${request.hospital}</p>
            <p><strong>Contact:</strong> ${request.contact}</p>
        `;
        requestsContainer.appendChild(requestCard);
    });
}
displayRequests();