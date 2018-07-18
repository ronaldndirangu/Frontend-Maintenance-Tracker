import endPoint from './fetch';

let user_id;

if (sessionStorage.getItem('token')) {
	window.onload = function getUser() {
		user_id = localStorage.getItem('user_id')
		document.getElementById('userid').innerHTML = '<em><b>User ID: </b>'+user_id+'</em>';

		let username= localStorage.getItem('username')
		document.getElementById('username').innerHTML = '<em><b>Username: </b>'+username+'</em>';

		let email = localStorage.getItem('email')
		document.getElementById('email').innerHTML = '<em><b>Email: </b>'+email+'</em>';

		let role = localStorage.getItem('role')
		if (role === 'true') {
			document.getElementById('role').innerHTML = '<em><b>Role: </b>Admin</em>';
		}
		else {
			document.getElementById('role').innerHTML = '<em><b>Role: </b>Normal</em>';
		}
		

		if (role === 'true') {
			console.log(role);
			document.getElementById('promote').style.display = 'none';
		}

		document.getElementById('promote').addEventListener('click', promoteUser);
		document.getElementById('delete').addEventListener('click', deleteUser);
	}

	function promoteUser(e) {
		e.preventDefault();

		let token = window.sessionStorage.getItem('token');
		endPoint.put('/users/'+user_id+'/promote', token)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			window.location.assign('users.html')
		})
	}

	function deleteUser(e) {
		e.preventDefault();

		if (confirm("Are you sure you want to delete this user?")) {

			let token = window.sessionStorage.getItem('token');
			endPoint.delete('/users/'+user_id, token)
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				window.location.assign('users.html')
			})
		}
	}

	function logOut() {
		sessionStorage.removeItem('token');
		window.location.assign('index.html');
	}
	window.logOut = logOut;
}
else{
	alert("Please login");
	window.location.assign('index.html');
}

