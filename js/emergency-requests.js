const emergencyContainer = document.getElementById("emergency-grid-container");
const notificationBox = document.getElementById("notification-box");

function displayEmergencyRequests() {
    const bloodRequests =JSON.parse(localStorage.getItem("bloodRequests")) || [];
    const emergencyRequests = bloodRequests.filter(function (request) {
        return request.requestType === "emergency";
    });
    emergencyContainer.innerHTML = "";
    if (emergencyRequests.length === 0) {
        emergencyContainer.innerHTML = `
            <div class="no-requests">
                <h3>No Emergency Requests</h3>
                <p>There are currently no emergency blood requests.</p>
            </div>
        `;
        return;
    }
    emergencyRequests.forEach(function (request) {
        const emergencyCard = document.createElement("div");
        emergencyCard.classList.add("emergency-card");
        emergencyCard.innerHTML = `
            <h3>🚨 ${request.bloodGroup} Blood Required</h3>
            <p><strong>Patient / Contact:</strong>${request.patientName}</p>
            <p><strong>Blood Units:</strong>${request.bloodUnits}</p>
            <p><strong>City:</strong>${request.city}</p>
            <p><strong>Area:</strong>${request.area}</p>
            <p><strong>Hospital:</strong>${request.hospital}</p>
            <p><strong>Contact:</strong>${request.contact}/p>
        `;
        emergencyContainer.appendChild(emergencyCard);
    });

    const latestRequest =
        emergencyRequests[emergencyRequests.length - 1];
    showEmergencyNotification(latestRequest);
}

function showEmergencyNotification(request) {
    notificationBox.innerHTML = `
        <div class="emergency-notification">
            <button
                class="close-notification"
                onclick="closeNotification()">
                ×
            </button>
            <h3>🚨 Emergency Blood Request</h3>
            <p><strong>${request.bloodGroup}</strong> blood is urgently required.</p>
            <p>📍 ${request.city}, ${request.area}</p>
            <p> ${request.hospital}</p>
            <button
                class="view-request-btn"
                onclick="closeNotification()">
                View Request
            </button>
        </div>
    `;
}
function closeNotification() {
    notificationBox.innerHTML = "";

}
displayEmergencyRequests();