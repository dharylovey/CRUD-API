
// addUser
document.getElementById('submitUser').addEventListener('click', function (e) {
    e.preventDefault();
    addUser();
});
document.getElementById('submitUser').addEventListener('click', function (e) {
    e.preventDefault();
    addUser();
});


// =====================================================

const tableBody = document.querySelector('tbody');

function fetchAllUsers() {
    fetch('http://localhost:3000/users/read')
        .then(res => res.json())
        .then(userData => {
            setTableData(userData);
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        })
}

function setTableData(data) {
    tableBody.innerHTML = '';

    data.users.forEach(user => {
        console.log(user)
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td >${user.name}</td>
            <td >${user.username}</td>
            <td>
                <button type="button" class="btn btn-primary updateBtn" data-bs-toggle="modal"
                data-bs-target="#updateUser" onclick="${user.id}">Update</button>
                <button type="button" class="btn btn-danger">Delete</button>
            </td>
        `;

        tableBody.append(tableRow)
    })
}


function addUser() {
    const name = document.getElementById('name').value
    const username = document.getElementById('userName').value
    const password = document.getElementById('passWord').value

    if (!name || !username || !password) {
        alert('All fields required!!!')
        return;
    }

    fetch('http://localhost:3000/users/create', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ name, username, password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.status) {
                fetchAllUsers();

                name.value = '';
                username.value = '';
                password.value = '';

            } else {
                alert(data.message)
            }
        }).catch(error => {
            console.error(`Error: ${error}`);
            return;
        })
}

function getUserById(id) {
    return fetch(`http://localhost:3000/users/read/${id}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Something went wrong!');
            }
        }).catch(error => {
            console.error(`Error: ${error}`);
        });
}

function getUserById(id) {
    return fetch(`http://localhost:3000/users/read/${id}`)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(`Error: ${error}`)
            }
        })
        .catch(error => {
            console.error(`Error: ${error}`)
        })
}

function updateUser(id) {
    
    const modal = document.getElementById('updateUser')
    getUserById(id).then(user=>{
        console.log(user)
    })
}

fetchAllUsers()