"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Anton Kårefalk
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {
    // Ta bort tidiage felmeddelanden
    errors = [];
    
    // Kontrollera formulärets obligatoriska fält
    // Namnet
    if (fullnameInput.ariaValueMax.trim() === "") {
        errors.push("Du måste fylla i ditt namn.")
    }

    // E-post
    if (emailInput.ariaValueMax.trim() === "") {
        errors.push("Du måste fylla i din e-post.")
    }

    // Telefonnummer
    if (phoneInput.ariaValueMax.trim() === "") {
        errors.push("Du måste fylla i ditt telefonnummer.")
    }

    // Visa eventuella felmeddelanden
    displayErrors();

    // Returnera resultatet (true eller false) av valideringen
    return errors.length === 0;
}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.innterHTML = "";

    // Skriv ut aktuella felmeddelanden till DOM
    errors.forEach(function(error) {
        const listItem = document.createElement("li");
        listItem.textContent = error;
        errorList.appendChild(listItem);
    });
}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret
    const student = {
        fullname: fullnameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        font: fontSelect.value
    };

    // Uppdatera studentkortet
    previewFullname.textContent = student.fullname;
    previewEmail.textContent = student.email;
    previewPhone.textContent = student.phone;

    // Lägg till studentkortet i historiken
    history.unshift(student);

    // Spara och uppdatera historiken
    saveHistory();
    renderHistory();
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    // Genom att göra om arrayen till en JSON string
    localStorage.setItem("studentHistory", JSON.stringify(history));
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    const savedHistory = localStorage.getItem("studentHistory");
    if (savedHistory !== null) {
        try {
            // Gör om JSON-stringen till JavaScript
            const savedData = JSON.parse(savedHistory);
            // Kollar om information är en array
            if (Array.isArray(sacedData)) {
                history = savedData.filter(function(student) {
                    return student !== null &&
                    typeof student === "object" &&
                    typeof student.fullname === "string" &&
                    typeof student.email === "string" &&
                    typeof student.phone === "string" &&
                    typeof student.font === "string";
            });
        } else {
            // Om inte, så ska den använda en tom array
            history = [];
        }
    } catch (error) {
        // använd tom array om JSON-datan inte fungerar
        history = [];
    }
}

    // Uppdatera history
    renderHistory();
}

/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";

    // Skriv ut innehållet i history till DOM
    history.forEach(function(student) {
        // Skapa ett element för historiken
        const card = document.createElement("div");

        // Skapa ett element för namnet
        const name = document.createElement("p");
        name.textConent = "Name: " + student.fullname;

        // Skapa ett element för e-posten
        const email = document.createElement("p");
        email.textContent = "E-post: " + student.email;

        // Skapa ett element för telefonnumret
        const phone = document.createElement("p");
        phone.textContent = "Telefon " + student.phone;

        // Skapa ett element för typsnittet
        const font = document.createElement("p");
        font.textContent = "Typsnitt: " + student.font;

        // Använd den valda typsnittet
        card.style.fontFamily = student.font;

        // Lägg till informationen i historiken
        card.appendChild(name);
        card.appendChild(email);
        card.appendChild(phone);
        card.appendChild(font);

        // Lägg till en divider efter historiken
        const divider = document.createElement("hr");
        card.appendChild(divider);

        // Lägg till historiken på sidan
        historySection.appendChild(card);
    });
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort
    form.reset();

    // Studentkort
    previewFullname.textContent = "Name";
    previewEmail.textContent = "E-post";
    previewPhone.textContent = "Telefon";

    // Typesnitt
    previewFullname.style.fontFamily = "";
    previewEmail.style.fontFamily = "";
    previewPhone.style.fontFamily = "";

    // Rensa eventuella felmeddelanden
    errors = [];
    displayErrors();
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik
    localStorage.removeItem("studentHistory");
    history = [];

    // Uppdatera history och visningen på sidan
    renderHistory();
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
form.addEventListener("submit", function(event) {
    event.preventDefault();

// - skapa studentkort om valideringen lyckas
if (validateForm()) {
    createStudentCard();
}
});

// När användaren klickar på "Rensa"
clearButton.addEventListener("click", function() {
    clearForm();
});

// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", function() {
    deleteHistory();
});


// När sidan laddas:
// - läs in och visa eventuell tidigare historik
loadHistory();