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
    let t_row = document.createElement('tr');

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

    $t_body.appendChild(t_row);

    // Event listener for row deletion
    deleteRow.addEventListener('click', () => {
        t_row.remove();
        updateLocalStorage(); // Update local storage after removing a row
    });

    // Clear input values after adding a row
    $amount.value = "";
    $note.value = "";

    updateLocalStorage(); // Update local storage after adding a row
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
    // for (let row of $t_body.rows) {
    //     let rowData = {
    //         date: row.cells[0].innerHTML,
    //         transactionType: row.cells[1].innerHTML,
    //         category: row.cells[2].innerHTML,
    //         amount: row.cells[3].innerHTML,
    //         note: row.cells[4].innerHTML
    //     };
    //     tableData.push(rowData);
    // }



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


//setting section






