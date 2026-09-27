const form = document.getElementById("donor-registration-form");
form.addEventListener("submit", function(event){
    event.preventDefault();

    const name = document.getElementById("donor-name").value.trim();
    const bloodGroup = document.getElementById("donor-blood").value.trim();
    const city = document.getElementById("donor-city").value.trim();
    const area = document.getElementById("donor-area").value.trim();
    const contact = document.getElementById("donor-contact").value.trim();
    if (!/^03\d{9}$/.test(contact)) {
        alert("Please enter a valid 11-digit mobile number.");return;
    }

    const age = document.querySelector('input[name="q-age"]:checked').value;
    const hepatitis = document.querySelector('input[name="q-hepatitis"]:checked').value;
    const infectious = document.querySelector('input[name="q-infectious"]:checked').value;
    const medicine = document.querySelector('input[name="q-medicine"]:checked').value;


    let donors = JSON.parse(localStorage.getItem("donors")) || [];
    const contactExists = donors.some(function(donor){
        return donor.contact === contact;
    });
    if(contactExists){
        alert("This contact Number is already exists. Please enter a valid contact number.");
        return;
    }

    let verified = true;
    if(age==="no" || hepatitis==="yes" ||infectious==="yes" || medicine==="yes"){
        verified = false;
    }

    const donor = {
        name: name,
        bloodGroup: bloodGroup,
        city: city,
        area: area,
        contact: contact,

        medicalAnswers: {
            age: age,
            hepatitis: hepatitis,
            infectious: infectious,
            medicine: medicine
        },
        status: verified ? "Verified" : "Not Verified"
        };
    donors.push(donor);
    localStorage.setItem("donors", JSON.stringify(donors));
    if(verified){
        alert(
            "Registered Successfully! \n\n" +
            "You have been registered as a verified donor. \n\n" +
            "Please note that 'Verified' means you have passed our basic eligibility questionnaire.It does not confirm medical eligibility for blood donation.Final eligibility must be verified by a qualified medical professional or blood donation center."
        );
    }else{
        alert(
            "Registered Successfully! \n\n" +
            "You have been registered as a donor, but you are not verified. \n\n" +
            "Please note that 'Not Verified' means you did not pass our basic eligibility questionnaire. It does not confirm medical eligibility for blood donation. Final eligibility must be verified by a qualified medical professional or blood donation center."
        );
    }
    form.reset();
});