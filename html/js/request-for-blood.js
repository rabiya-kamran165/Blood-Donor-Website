const bloodRequestForm = document.getElementById("blood-request-form");
bloodRequestForm.addEventListener("submit", function(event){
    event.preventDefault();

    const patientName = document.getElementById("patient-name").value.trim();
    const bloodGroup = document.getElementById("blood-group").value.trim();
    const bloodUnits = document.getElementById("blood-units").value.trim();
    const city = document.getElementById("city").value.trim();
    const area = document.getElementById("area").value.trim();
    const hospital = document.getElementById("hospital").value.trim();
    const date = document.getElementById("date").value.trim();
    const contact = document.getElementById("contact").value.trim();
    if (!/^03\d{9}$/.test(contact)) {
        alert("Please enter a valid 11-digit mobile number.");return;
    }
    const requestType = document.getElementById("request-type").value.trim();

    let bloodRequests = JSON.parse(localStorage.getItem("bloodRequests")) || [];
    const contactExists = bloodRequests.some(function(request){
        return request.contact === contact;
    });
    if (contactExists) {
        alert("This number is already registered.Please enter a valid contact number.");
        return;
    }

    const request = {
        patientName: patientName,
        bloodGroup: bloodGroup,
        bloodUnits: bloodUnits,
        date: date,
        city: city,
        area: area,
        hospital: hospital,
        contact: contact,
        requestType: requestType,
    }
    bloodRequests.push(request);
    localStorage.setItem("bloodRequests", JSON.stringify(bloodRequests));
    
    if(requestType === "emergency"){
        alert("Emergency Blood Request Submitted Successfully!")
    }else{
        alert("Blood Request Submitted Successfully!")
    }
    bloodRequestForm.reset();
});