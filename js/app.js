let isLoad = true;
async function getUsersData() {
  try {
    toggleSpinner(true);
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    console.log("aaaaaaaaaaaaaa");

    if (!res.ok) {
      console.log("Something error ");
      showAlert();

     
      return;
    }
    isLoad = false;
    const data = await res.json();

    renderCards(data);
    toggleSpinner(false);
  } catch (error) {
    console.error("Fetch Error:", error);
    showAlert();
  }
}
getUsersData();
function renderCards(data) {
  const container = document.createElement("div");
  container.className = "d-flex flex-wrap gap-3 p-3 justify-content-center";

  let cardsHTML = "";
  data.forEach((element) => {
    cardsHTML += `
      <div class="card shadow-sm" style="width: 18rem;">
        <div class="card-body text-center bg-light">
          <h5 class="card-title text-primary m-0">${element.name}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><strong>ID:</strong> ${element.id}</li>
          <li class="list-group-item"><strong>Email:</strong> ${element.email}</li>
          <li class="list-group-item"><strong>City:</strong> ${element.address.city}</li>
          <li class="list-group-item"><strong>Company:</strong> ${element.company.name}</li>
        </ul>
      </div>`;
  });

  container.innerHTML = cardsHTML;
  document.body.appendChild(container);
}
function toggleSpinner(isLoading) {
  let sp = document.querySelector(".omar-spinner");

  if (isLoading) {
    if (!sp) {
      sp = document.createElement("div");
      sp.className = "omar-spinner d-flex justify-content-center my-4";
      sp.innerHTML = `
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>`;
      document.body.appendChild(sp);
    }
  } else {
    if (sp) sp.remove();
  }
}

function showAlert() {
  const alertCon = document.createElement("div");
  alertCon.className = "alert-container position-fixed top-0 end-0 p-3";
  alertCon.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
Something went wrong      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

  document.body.appendChild(alertCon);
  setTimeout(() => alertCon.remove(), 3000);
}

async function testApiCORS() {
  const res = await fetch("http://localhost:3000/api/expenses");
}
testApiCORS();
// Expense Tracker - frontend logic

// PHASE 2
// Your backend from Phase 1 is already running, with real expenses in the
// database (from schema.sql). Build this page directly against it with
// fetch and async/await - there is no in-memory or localStorage stage
// this time, and no sample data file.
//
// A possible structure (change it if you have a better idea):
//   - async function getExpenses()          fetch(API_URL), return the JSON
//   - async function addExpense(data)       fetch(API_URL, { method: "POST", ... })
//   - async function updateExpense(id,data) fetch(API_URL + "/" + id, { method: "PUT", ... })
//   - async function deleteExpense(id)      fetch(API_URL + "/" + id, { method: "DELETE" })
//   - async function refresh()              get the list, then call renderTable and renderSummary
//   - renderTable(list)                     build the table rows from the array the API returned
//   - renderSummary(list)                   update the summary cards
//   - applyFilter()                         re-render with the list filtered by category
//
// Don't forget:
//   - Show a Bootstrap spinner while a request is in flight.
//   - Wrap every fetch call in try/catch, and show a Bootstrap alert on failure.
//   - After add, edit, or delete, call refresh() so the page always shows
//     what the server actually saved - never update the table by hand.
//   - The API is at http://localhost:3000/api/expenses (see the Roadmap).

// const API_URL = "http://localhost:3000/api/expenses";
