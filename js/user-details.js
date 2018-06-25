function getUser() {
	user_id = localStorage.getItem('user_id')
	document.getElementById('userid').innerHTML = '<em><b>User ID: </b>'+user_id+'</em>';

	username= localStorage.getItem('username')
	document.getElementById('username').innerHTML = '<em><b>Username: </b>'+username+'</em>';

	email = localStorage.getItem('email')
	document.getElementById('email').innerHTML = '<em><b>Email: </b>'+email+'</em>';

	role = localStorage.getItem('role')
	document.getElementById('role').innerHTML = '<em><b>Role: </b>'+role+'</em>';

	document.getElementById('promote').addEventListener('click', promoteUser);
	document.getElementById('delete').addEventListener('click', deleteUser);
}

function promoteUser(e) {
	e.preventDefault();

	fetch('http://127.0.0.1:5000/api/v2/users/'+user_id+'/promote', {
		method: 'PUT',
		headers: {
			"Accept":"application/json",
			"Content-type":"application/json",
			"token":localStorage.getItem('token')
		}
	})
	.then((res) => res.json())
	.then((data) => console.log(data))
}

function deleteUser(e) {
	e.preventDefault();

	if (confirm("Are you sure you want to delete this user?")) {
		fetch('http://127.0.0.1:5000/api/v2/users/'+user_id, {
			method: 'DELETE',
			headers: {
				"Accept":"application/json",
				"Content-type":"application/json",
				"token":localStorage.getItem('token')
			}
		})
		.then((res) => res.json())
		.then((data) => {
			console.log(data)
			window.location.assign('users.html')
		})
	}
}