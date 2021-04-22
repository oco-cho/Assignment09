// CREATE AN ARRAY OF EMPLOYEES
let employees = [];

employees[0] = [12345678, 'Malala Yousafzai', 1234, 'malala@nobel.com', 'Administrative'];
employees[1] = [87654321, 'Denis Mukwege', 4321, 'denis@nobel.com', 'Engineering'];
employees[2] = [23456789, 'Nadia Murad', 2345, 'nadia@nobel.com', 'Executive'];
employees[3] = [98765432, 'Juan Santos', 5432, 'juan@nobel.com', 'Marketing'];
employees[4] = [10101010, 'Kailash Satyarthi', 9876, 'kailash@nobel.com', 'Sales'];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS

window.addEventListener('load', () => {
    if (localStorage.getItem('storedEmployees')) {
        employees = JSON.parse(localStorage.getItem('storedEmployees'));
        buildGrid();
    } else {
        buildGrid();
    }
});

// GET DOM ELEMENTS
const $ = id => document.getElementById(id);

// ADD EMPLOYEE
$('addForm').addEventListener('submit', (e) => {

    // PREVENT FORM SUBMISSION
    e.preventDefault();
    
    // GET THE VALUES FROM THE TEXT BOXES
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let newEntry = [Number($('id').value), $('name').value, Number($('extension').value), $('email').value, $('department').value];

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEntry);

    // BUILD THE GRID
    buildGrid();

    // RESET THE FORM
    $('addForm').reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    $('id').focus();

});

// DELETE EMPLOYEE
$('employees').addEventListener('click', (e) => {

    if (e.target.classList.contains('delete')) {
        // CONFIRM THE DELETE
        if(confirm('Are you sure you want to delete this employee?')) {

            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE ********Found it unnecessary to use method since we call buildGrid() which will functionally delete the row due to the rebuild of tbody based off of current array elements********
            // REMOVE EMPLOYEE FROM ARRAY
            employees.splice(e.target.parentNode.parentNode.rowIndex - 1, 1);
            // BUILD THE GRID
            buildGrid();
        }
    }   
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {

    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    $('employees').removeChild(document.querySelector('tbody'));

    // REBUILD THE TBODY FROM SCRATCH
    let grid = document.createElement('tbody');

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (value of employees) {
        let newRow = document.createElement('tr');
        
        newRow.innerHTML = `<td>${value[0]}</td><td>${value[1]}</td><td>${value[2]}</td><td>${value[3]}</td><td>${value[4]}</td><td><button class="btn btn-danger btn-sm float-right delete">X</button></td>`;

        grid.appendChild(newRow);
    }

    // BIND THE TBODY TO THE EMPLOYEE TABLE
    $('employees').appendChild(grid);

    // UPDATE EMPLOYEE COUNT
    $('empCount').innerHTML = `(${employees.length})`;

    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('storedEmployees', JSON.stringify(employees));
};