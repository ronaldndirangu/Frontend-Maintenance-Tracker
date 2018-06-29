function getUsers() {
	fetch('http://127.0.0.1:5000/api/v2/users', {
		method: 'GET',
		headers: {
			"Accept":"application/json",
			"Content-type":"application/json",
			"token":localStorage.getItem('token')
		}
	})
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		data.forEach(function(user) {
			let table = document.getElementById('users');
			
			i = 1
			console.log(table);
			// Create row for each user
			if (typeof table !== "undefined" && table !== null) {
					let row = table.insertRow(i);

					// Create cell for each entry
					let id = row.insertCell(0);
					let username = row.insertCell(1);
					let email = row.insertCell(2);
					let role = row.insertCell(3);
					
					// Add data into cells
					id.innerHTML = "<a>"+user.user_id+"</a>";
					username.innerHTML = user.username;
					email.innerHTML = user.email;
					if (user.role === true) {
						role.innerHTML = 'Admin';
					}
					else {
						role.innerHTML = 'Normal';
					}					
					i++;

					id.addEventListener('click', getUser);
					username.className = "username"	
			}

			function getUser() {
				fetch('http://127.0.0.1:5000/api/v2/users/'+user.user_id, {
					method: 'GET',
					headers:{
						"Accept":"application/json",
						"Content-type":"application/json",
						"token":localStorage.getItem('token')
					}
				})
				.then((res) => res.json())
				.then((data) => {
					localStorage.setItem('user_id', data[0].user_id);
					localStorage.setItem('username', data[0].username);
					localStorage.setItem('email', data[0].email);
					localStorage.setItem('role', data[0].role);
					location.assign('user-details.html')
				})
			} 

		});
	})
}

searchUser = document.getElementById('username');
searchUser.addEventListener('keyup', filterUser);

function filterUser() {
	let filterValue = document.getElementById('username').value.toUpperCase();

	// Get table rows
	let tr = document.getElementsByClassName('username');
	// Get entries
	for (let i=0; i<tr.length; i++) {
		if (tr[i].innerHTML.toUpperCase().indexOf(filterValue) > -1 ) {
            tr[i].parentNode.style.display = '';
        } else {
            tr[i].parentNode.style.display = 'none';
        }
	}	
}