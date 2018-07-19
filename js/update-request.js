import endPoint from './fetch';

let request_title;
let request_location;
let request_description;

if (sessionStorage.getItem('token')) {
	window.onload = function getRequest() {	
		request_title = localStorage.getItem('request_title')
		document.getElementById('req-title').value = request_title;

		request_location = localStorage.getItem('request_location')
		document.getElementById('req-location').value = request_location;
		
		request_description = localStorage.getItem('request_description')
		document.getElementById('req-description').innerHTML= request_description;
	}

	function updateRequest() {
		
		let title = document.getElementById('req-title').value;
		let location = document.getElementById('req-location').value;
		let description = document.getElementById('req-description').value;

		let req_id = localStorage.getItem('request_id');

		if (title === request_title && location === request_location && description === request_description) {
			alert('No update to request detected');
		}
		else {

			let data = {request_title:title, request_location:location, request_description:description}
			let token = window.sessionStorage.getItem('token');
			endPoint.put('/users/requests/'+req_id, data, token)
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				alert(data.message);
				window.location.assign("user-requests.html")
			})
		}
	}

	function logOut() {
		sessionStorage.removeItem('token');
		window.location.assign('index.html');
	}

	window.updateRequest = updateRequest;
	window.logOut = logOut;
}
else{
	alert("Please login");
	window.location.assign('index.html');
}
