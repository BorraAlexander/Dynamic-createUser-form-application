let myFormEl = document.getElementById("myForm");
let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");
let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");
let statusEl = document.getElementById("status");
let genderMaleEl = document.getElementById("genderMale");
let genderFemaleEl = document.getElementById("genderFemale");

let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
}


nameEl.addEventListener("change", function(Event) {
    if (Event.target.value === "") {
        nameErrMsgEl.textContent = "Required*";
    } else {
        nameErrMsgEl.textContent = "";
    }
    formData.name = event.target.value;
});
//
emailEl.addEventListener("change", function(Event) {
    if (Event.target.value === "") {
        emailErrMsgEl.textContent = "Required*";
    } else {
        emailErrMsgEl.textContent = "";
    }
    formData.email = event.target.value;
});
//

//
function formValidation(formData) {
    if (formData.name === "") {
        nameErrMsgEl.textContent = "Required*";
    }
    if (formData.email === "") {
        emailErrMsgEl.textContent = "Required*";
    }
}

//
function submitFormData(formData) {
    let url = "https://gorest.co.in/public-api/users";
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: 'Bearer f90c3c079c00da40a237ab0f80066b95c88d5db01750bb95a39ef1db4231b0e2'
        },
        body: JSON.stringify(formData)
    };

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailErrMsgEl.textContent = "Email Already Exists";
                }
            }
        });
}
//

//
statusEl.addEventListener("change", function(Event) {
    formData.status = Event.target.value;
});
//
genderMaleEl.addEventListener("change", function(Event) {
    formData.gender = Event.target.value;
});
//
genderFemaleEl.addEventListener("change", function(Event) {
    formData.gender = Event.target.value;
});

myFormEl.addEventListener("submit", function(Event) {
    Event.preventDefault();
    formValidation(formData);
    submitFormData(formData);
});