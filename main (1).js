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
        }
    }

    // Uppdatera history
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";

    // Skriv ut innehållet i history till DOM
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort

    // Rensa eventuella felmeddelanden
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas


// När användaren klickar på "Rensa"


// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik