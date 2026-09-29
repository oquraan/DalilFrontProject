https://omaressamquraan.com/
[website demo](https://drive.google.com/file/d/1Ho9mgxp99ubOV95-Q8Oszm9nWF62T1HB/view?usp=sharing)

# Expense Tracker ” Frontend

A frontend interface for an expense tracking application, built with **HTML + Vanilla JavaScript + Bootstrap 5**.
Communicates with the Backend via a REST API at `http://localhost:3000/api/expenses`.

---

## Project Structure

```
DalilFrontProject/
├── index.html          ← Main page
├── css/
│   └── style.css       ← Custom styles
└── js/
    ├── expenses.js     ← Core application logic (CRUD + UI)
    ├── chart.js        ← Bar chart rendering for expenses
    └── app.js          ← Experimental / helper file (spinner + alert)
```

---

##  Functions — `js/expenses.js`

### API

| Variable | Value |
|---------|-------|
| `API_URL` | `http://localhost:3000/api/expenses` |

---

### 1. `Theme()`
**File:** `expenses.js` — Line 9

Toggles the page appearance between **Light mode** and **Dark mode**.

- Changes background and text color for: `body`, `navbar`, cards, form, inputs, table rows, and modal.
- Updates the theme button text (`Dark` ↔ `Light`).
- Relies on the `isLight` variable to track the current mode.

---

### 2. `Spinner()`
**File:** `expenses.js` — Line 63

Returns HTML for a Bootstrap **loading spinner** icon.

- Used inside `getAllExpenses()` to show a loading indicator while fetching data from the API.

---

### 3. `getAllExpenses(selectedCategory, orderBy, month, title)`
**File:** `expenses.js` — Line 71

**The main function** — fetches all expenses from the API with support for filtering and sorting.

| Parameter | Description |
|-----------|-------------|
| `selectedCategory` | Filter by category (Food, Transport...) |
| `orderBy` | Sort by column (title, amount, category, date) |
| `month` | Filter by month (01-12) |
| `title` | Search by title (text) |

**What it does:**
1. Shows the Spinner in the cards area.
2. Requests data from the API via `fetch`.
3. If `404` is returned → displays a "No results found" message in the table.
4. If the request succeeds → calculates `totalExpenses`, `highestExpenses`, `numberOfExpenses`.
5. Calls: `SummaryCard()`, `ShowDataForm()`, `ChartExpense()`.

---

### 4. `Filteration()`
**File:** `expenses.js` — Line 132

Binds the three page filters to `getAllExpenses()`:

| Filter | Element | Event |
|--------|---------|-------|
| Category | `#categoryFilter` | `change` |
| Month | `#monthFilter` | `change` |
| Title search | `#TitleForm` | `input` (with 500ms debounce) |

>  **Debounce** on the title filter: waits 500ms after the last keystroke before calling the API — to avoid sending a request on every single character typed.

---

### 5. `NavBar()`
**File:** `expenses.js` — Line 160

Builds the Navbar and injects it inside `<header>`.

- Displays the application name **"Expense Tracker"**.
- Adds a **Dark/Light** toggle button.

---

### 6. `SummaryCard(total, max, count)`
**File:** `expenses.js` — Line 177

Builds and displays **3 summary cards** at the top of the page:

| Card | Value |
|------|-------|
| **Total** | Sum of all expenses |
| **Number Of Expenses** | Total count of expenses |
| **Highest Expenses** | The highest single expense amount |

---

### 7. `ShowDataForm(data)`
**File:** `expenses.js` — Line 241

Populates the **main table** with data returned from the API.

- Adds a row for each expense: Title, Amount, Category, Date, Actions.
- **Category** is displayed as a colored Badge:
  - [Green] Food → `bg-success`
  - [Blue] Transport → `bg-info`
  - [Red] Bills → `bg-danger`
  - [Yellow] Entertainment → `bg-warning`
- Adds a **Delete** button and an **Update** button to each row.
- Finally calls `OrderDataUsingColumn()`.

---

### 8. `UpdateModel(updateButton, e)`
**File:** `expenses.js` — Line 335

Opens the **modal** (edit window) and fills it with the selected expense's data.

- Triggered when the "Update" button in any row is clicked.
- Populates the fields: id, title, amount, date, category.
- Shows the modal (`#updateBox`).

---

### 9. `UpdateExpense(newValues)` ← async
**File:** `expenses.js` — Line 314

Sends a **PUT** request to the API to update an existing expense.

```
PUT http://localhost:3000/api/expenses/:id
Body: { id, title, amount, date, category }
```

- On success → shows an `alert` with the updated title.
- On failure → shows an error message.

> Called when `#saveBtn` is clicked inside the modal; afterwards the modal is closed and the table is refreshed.

---

### 10. `DeleteExpense({ id })` ← async
**File:** `expenses.js` — Line 346

Sends a **DELETE** request to the API to remove an expense.

```
DELETE http://localhost:3000/api/expenses/:id
```

- On success → `alert` with the title + confirmation message, then reloads the table.
- On failure → displays the error message from the API.

---

### 11. `AddExpense(newExpenseObject)` ← async
**File:** `expenses.js` — Line 389

Sends a **POST** request to the API to add a new expense.

```
POST http://localhost:3000/api/expenses
Body: { title, amount, category, date }
```

- If the request fails → shows the error message.
- On success → clears the form fields and reloads the table.

> **Validation** (performed before calling this function in the event listener):
> - All fields are required.
> - The amount must be greater than 0.

---

### 12. `OrderDataUsingColumn()`
**File:** `expenses.js` — Line 415

Attaches a **click event** to each table column header to sort the data.

| Column | ID | Sort by |
|--------|----|---------|
| Title | `#titleColumn` | `orderBy=title` |
| Amount | `#amountColumn` | `orderBy=amount` |
| Category | `#categoryColumn` | `orderBy=category` |
| Date | `#dateColumn` | `orderBy=date` |

Each click calls `getAllExpenses()` with the appropriate `orderBy` value.

---

##  Functions — `js/chart.js`

### 13. `ChartExpense(data)` ← export
**File:** `chart.js` — Line 1

Renders a **Bar Chart** showing the number of expenses per category.

- Uses the **Chart.js** library (loaded from CDN).
- If a chart already exists on the same `<canvas>` → destroys it first before rendering (to prevent overlap).
- Data: count of expenses per category.

---

## Functions `js/app.js`

> This file is experimental and contains old code from an earlier development phase.

### 14. `toggleSpinner(isLoading)` ← export
**File:** `app.js` — Line 51

Shows or hides a Bootstrap Spinner on the page.

- `isLoading = true` → creates a `div.omar-spinner` and appends it to the body.
- `isLoading = false` → removes the spinner.

### 15. `showAlert(message)`
**File:** `app.js` — Line 69

Displays a **Bootstrap Alert** (red notification) in the top-right corner of the screen.

- Automatically disappears after **3 seconds**.

---

## Call Order on Page Load

```
1. NavBar()             ← Build the navigation bar
2. Filteration()        ← Bind filters to events
3. getAllExpenses()      ← Fetch data and render
   ├── Spinner()
   ├── SummaryCard()
   ├── ShowDataForm()
   │   └── OrderDataUsingColumn()
   └── ChartExpense()
```

---

## Technologies Used

| Technology | Usage |
|------------|-------|
| **HTML5** | Page structure |
| **Vanilla JavaScript (ES6+)** | All logic and fetch calls |
| **Bootstrap 5.3** | Styling and UI components |
| **Chart.js** | Bar chart rendering |
| **Fetch API** | Communication with the Backend |
| **ES Modules** | `import/export` between files |

---

## Running the Project

1. Make sure the Backend is running at `http://localhost:3000`
2. Open `index.html` in the browser (or run it via Live Server)

> [Warning] The API URL is set to `http://localhost:3000/api/expenses` at the very first line of `expenses.js`