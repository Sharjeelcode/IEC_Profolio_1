// checking activeuser starts
let users = []
let userdata = localStorage.getItem('users')
let activeuser = localStorage.getItem('activeUser')
let active;
let $active_user_data ;
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
// Get today's date in the format "YYYY-MM-DD"
const today = new Date().toISOString().split('T')[0];

console.log($active_user_data);

let $date = document.getElementById('SelectDate').value = today
let $transactiontype = document.getElementById("transactiontype")
let $category = document.getElementById("category")
let $amount = document.getElementById("amount")
let $note = document.getElementById("note")
let $t_body = document.getElementById("t_body")
let $save_records = document.getElementById("save_records");

let income_catagory = ["Utilities", "Grocery", "Rent", "Health", "Education"]
let expense_catagory = ["Salary", "Commission", "Bonus"]

function typecheck() {
    if ($transactiontype.value === "Expense") {
        $category.options.length = 0;  // Clear existing options
        addOptionsToCategory(income_catagory);
    } else if ($transactiontype.value === "Income"){
        $category.options.length = 0;  // Clear existing options
        addOptionsToCategory(expense_catagory);
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

//To display data in table
function savedata() {
    let t_row = document.createElement('tr')

    let date = document.createElement('td')
    date.innerHTML = $date
    t_row.appendChild(date)


    let transactiontype = document.createElement('td')
    transactiontype.innerHTML = $transactiontype.value
    t_row.appendChild(transactiontype)

    let category = document.createElement('td')
    category.innerHTML = $category.value
    t_row.appendChild(category)

    let amount = document.createElement('td')
    amount.innerHTML = $amount.value
    t_row.appendChild(amount)


    let note = document.createElement('td')
    note.innerHTML = $note.value
    t_row.appendChild(note)

    $t_body.appendChild(t_row)
}




$save_records.addEventListener('click', () => {
    if ($note.value === "" || $amount.value === "") {
        alert("Fields are required!")
    } else {
        savedata()
    }
})

//setting section






