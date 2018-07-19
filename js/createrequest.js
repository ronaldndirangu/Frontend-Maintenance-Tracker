import endPoint from './fetch';

if (sessionStorage.getItem('token')) {
	// Add event listener
	document.getElementById("submitRequest").addEventListener('click', createRequest);

	// Create request function
	function createRequest(e) {
		e.preventDefault();

		let title = document.getElementById("requesttitle").value;
		let location = document.getElementById("location").value;
		let priority = document.getElementById("priority").value;
		let description = document.getElementById("description").value;

		let data = {request_title:title, request_location:location,
					request_priority:priority, request_description:description}
		let token = sessionStorage.getItem('token')

		endPoint.post('/users/requests', data, token)
		.then ((res) => res.json())
		.then ((data) => {
			console.log(data);
			alert(data.message);
			if (data.message != 'Please fill all fields') {
				window.location.assign('user-requests.html');
			}		
		})
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
