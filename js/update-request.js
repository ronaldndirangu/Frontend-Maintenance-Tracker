API_PREFIX = 'https://maintenance-tracker-project.herokuapp.com'

if (sessionStorage.getItem('token')) {
	function getRequest() {	
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

		req_id = localStorage.getItem('request_id');

		if (title === request_title && location === request_location && description === request_description) {
			alert('No update to request detected');
		}
		else {
			fetch (API_PREFIX+'/api/v2/users/requests/'+req_id, {
				method: 'PUT',
				headers: {
					"Accept":"application/json",
					"Content-type":"application/json",
					"token":sessionStorage.getItem('token')
				},
				body: JSON.stringify({request_title:title, request_location:location, request_description:description})
			})
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
}
else{
	alert("Please login");
	window.location.assign('index.html');
}
