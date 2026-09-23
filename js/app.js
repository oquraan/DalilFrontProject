function alerts() {
  const alertCon = document.createElement("div");
  alertCon.innerHTML = `<div class="alert alert-primary" role="alert">
  A simple primary alert—check it out!
</div>`;
  // alertCon.appendChild(alert);
  document.body.appendChild(alertCon);
}
async function getUsersData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    console.log("aaaaaaaaaaaaaa");

    if (!res.ok) {
      console.log("sssssssssssssssssss");
      // alerts();
      return;
    }
    const data = await res.json();

    console.log(data);
    const card = document.createElement("div");
    card.className = "card";

    data.forEach((element) => {
      const cardContainer = document.createElement("div");
      cardContainer.innerHTML = `
          
          <div class="card" style="width: 18rem;">
  <div class="card-body">
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">id : ${element.id}</li>
    <li class="list-group-item"> name :${element.name}</li>
    <li class="list-group-item">email :${element.email}</li>
        <li class="list-group-item"> city: ${element.address.city}</li > <li class="list-group-item">company :${element.company.name}</li>


  </ul >
      
</div >`;
      card.appendChild(cardContainer);
    });
    document.body.appendChild(card);
  } catch (error) {
    alerts();
  }
}
getUsersData();

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
