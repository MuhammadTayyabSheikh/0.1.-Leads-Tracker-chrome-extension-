let myLeads = [];
const inputEl = document.querySelector("#input-el");
const inputBtnEl = document.querySelector("#input-btn");
const deleteBtnEl = document.querySelector("#delete-btn");
const tabBtnEl = document.querySelector("#tab-btn");
const ulEl = document.querySelector("#ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    saveInput(myLeads, "Please type in something before saving.");
}

function saveInput(leads, alertMsg) {
    if (!(inputEl.value === "")) {
        leads.push(inputEl.value);
    } else
        // alert(alertMsg);

        localStorage.setItem("leads", JSON.stringify(leads));

    inputEl.value = ""// Clearing out input field after input is entered and saved.
    let listItems = "";
    // it is better not to show elements on screen with each iteration of the loop.
    // Better is to save all the html in one variable and then assign that variable after all iteration to the el.innerHTML.
    leads.forEach(element => {
        listItems += `
        <li>
            <a target='_blank' href='${element}'>
                ${element}
            </a>
        </li>`;

    });
    ulEl.innerHTML = listItems;
}

inputBtnEl.addEventListener('click', () => {
    saveInput(myLeads, "Please type in something before saving.");
});

inputEl.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        inputBtnEl.click();
    }
});

deleteBtnEl.addEventListener('dblclick', function () {
    myLeads = []
    localStorage.clear();
    saveInput(myLeads, "Deleted");
});

tabBtnEl.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        console.log(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        saveInput(myLeads, "Current tab saved.");
    });
});