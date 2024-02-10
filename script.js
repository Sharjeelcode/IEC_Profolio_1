// checking activeuser starts
let users = []
let userdata = localStorage.getItem('users')
let activeuser = localStorage.getItem('activeUser')
let active;
let $active_user_data;
if (userdata) {
    users = JSON.parse(userdata)
}
users.forEach(element => {
    if (element.email === activeuser) {
        active = true
        $active_user_data = element
    }
});
if (!active) {
    location.replace('./signin.html')
}
// checking activeuser ends


// ******Dashboard*******
const today = new Date().toISOString().split('T')[0];



let $date = document.getElementById('SelectDate').value = today
let $transactiontype = document.getElementById("transactiontype")
let $category = document.getElementById("category")
let $amount = document.getElementById("amount")
let $note = document.getElementById("note")
let $t_body = document.getElementById("t_body")
let $save_records = document.getElementById("save_records");




let expense = JSON.parse(localStorage.getItem('expense'))
let income = JSON.parse(localStorage.getItem('income'))

function typecheck() {
    if ($transactiontype.value === "Expense") {
        $category.options.length = 0;  // Clear existing options
        addOptionsToCategory(expense);
    } else if ($transactiontype.value === "Income") {
        $category.options.length = 0;  // Clear existing options
        addOptionsToCategory(income);
    }
}

function addOptionsToCategory(optionsArray) {
    for (let option of optionsArray) {
        let optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.text = option;
        $category.add(optionElement);
    }
}

// Initial call to populate category based on default transaction type
typecheck();

// Event listener for changes in transaction type
$transactiontype.addEventListener("change", typecheck);


// Function to update local storage with the modified data


function savedata() {
    // Create a new row for the table
    let t_row = document.createElement('tr');
    // Create cells for each column in the table
    let date = document.createElement('td');
    date.innerHTML = $date;
    t_row.appendChild(date);

    let transactiontype = document.createElement('td');
    transactiontype.innerHTML = $transactiontype.value;
    t_row.appendChild(transactiontype);

    let category = document.createElement('td');
    category.innerHTML = $category.value;
    t_row.appendChild(category);

    let amount = document.createElement('td');
    amount.innerHTML = $amount.value;
    t_row.appendChild(amount);

    let note = document.createElement('td');
    note.innerHTML = $note.value;
    t_row.appendChild(note);

    let deleteRow = document.createElement('td');
    deleteRow.innerHTML = "❌";
    deleteRow.className = "cursor-pointer";
    t_row.appendChild(deleteRow);

    // Append the new row to the table body
    $t_body.appendChild(t_row);

    deleteRow.addEventListener('click', () => {
        t_row.remove();
        updateLocalStorage();
    });

    // Create a new object for the row data
    let rowData = {
        date: $date,
        transactionType: $transactiontype.value,
        category: $category.value,
        amount: $amount.value,
        note: $note.value
    };

    // Loop through the users array to find the active user
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === activeuser) {
            // Check if tableData exists in the user's data
            if (!users[i].tableData) {
                users[i].tableData = [];
            }

            // Append the new row data to the existing tableData
            users[i].tableData.push(rowData);
            break; // Exit the loop once the active user is found and updated
        }
    }

    // Update the local storage with the modified users array
    localStorage.setItem('users', JSON.stringify(users));

    // Clear input values after adding a row
    $amount.value = "";
    $note.value = "";
}


function updateLocalStorage() {
    // Loop through the users array to find the active user
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === activeuser) {
            // Update the tableData in the active_user_data object
            users[i].tableData = getTableData();
            break; // Exit the loop once the active user is found and updated
        }
    }

    // Update the local storage with the modified users array
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to retrieve tableData from the table rows
function getTableData() {
    let tableData = [];

   // Loop through the table rows and store the data in an array
    for (let row of $t_body.rows) {
        let rowData = {
            date: row.cells[0].innerHTML,
            transactionType: row.cells[1].innerHTML,
            category: row.cells[2].innerHTML,
            amount: row.cells[3].innerHTML,
            note: row.cells[4].innerHTML
        };
        tableData.push(rowData);
    }



    return tableData;
}

// Check if the element is present before adding the event listener

$save_records.addEventListener('click', () => {
    if ($note.value === "" || $amount.value === "") {
        alert("Fields are required!");
    } else {
        savedata();
    }
});


// Function to initialize the table with user's data on page load
function initializeTable(transactionType = null) {
    // Get the user's data from local storage
    let userData = JSON.parse(localStorage.getItem('users'));

    // Find the active user's data
    let activeUserData = userData.find(user => user.email === activeuser);

    // Check if active user data is available
    if (activeUserData && activeUserData.tableData) {
        let filteredTableData;

        // Filter the table data based on the transaction type
        if (transactionType) {
            filteredTableData = activeUserData.tableData.filter(row => row.transactionType === transactionType);
        } else {
            filteredTableData = activeUserData.tableData;
        }

        // Clear existing table rows
        $t_body.innerHTML = '';

        // Loop through the filtered table data and populate the DOM
        filteredTableData.forEach(rowData => {
            let t_row = createTableRow(rowData);
            $t_body.appendChild(t_row);
        });
    }
}



// Function to create a table row based on rowData
function createTableRow(rowData) {
    let t_row = document.createElement('tr');

    // Populate the table row with data
    for (let key in rowData) {
        let cell = document.createElement('td');
        cell.innerHTML = rowData[key];
        t_row.appendChild(cell);
    }

    // Add delete event listener
    let deleteRow = document.createElement('td');
    deleteRow.innerHTML = "❌";
    deleteRow.className = "cursor-pointer";
    t_row.appendChild(deleteRow);

    deleteRow.addEventListener('click', () => {
        t_row.remove();
        updateLocalStorage();
    });

    return t_row;
}

// Call the initializeTable function on page load based on the page location
window.addEventListener('load', () => {
    let pageLocation = window.location.href; // Get the current page URL
    let transactionType;

    if (pageLocation.includes('/income')) {
        transactionType = 'Income';
    } else if (pageLocation.includes('/expenses')) {
        transactionType = 'Expense';
    }
    // Call initializeTable with the determined transactionType or without an argument
    initializeTable(transactionType);
});


//username show in navbar
let username = document.getElementById('username')
let fullname = $active_user_data.fullname
username.innerHTML = fullname.toUpperCase()





