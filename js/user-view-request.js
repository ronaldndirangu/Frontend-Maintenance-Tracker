import endPoint from './fetch';

if (sessionStorage.getItem('token')) {
	window.onload = function getRequest() {	
		let request_title = localStorage.getItem('request_title')
		document.getElementById('req-title').innerHTML = '<u> Title: '+request_title+ '</u>';

		let request_date = localStorage.getItem('request_date')
		document.getElementById('req-date').innerHTML = '<em><b>Created at: </b>'+request_date+'</em>';

		let request_location = localStorage.getItem('request_location')
		document.getElementById('req-location').innerHTML = '<em><b>Location: </b>'+request_location+'</em>';

		let request_priority = localStorage.getItem('request_priority')
		document.getElementById('req-priority').innerHTML = '<em><b>Priority: </b>'+request_priority+'</em>';

		let request_status = localStorage.getItem('request_status')
		document.getElementById('req-status').innerHTML = '<em><b>Status: </b>'+request_status+'</em>';
		
		let request_description = localStorage.getItem('request_description')
		document.getElementById('req-description').innerHTML = '<em><b>Description: </b>'+request_description+'</em>';

		document.getElementById('delete').addEventListener('click', deleteRequest);
	}

	function deleteRequest(e) {
		e.preventDefault();
		
		let req_id = localStorage.getItem('request_id')
		if (confirm("Are you sure you want to delete this request?")) {

			let token = window.sessionStorage.getItem('token');
			endPoint.delete('/users/requests/'+req_id, token)
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				window.location.assign('user-requests.html');
			})
		}	
	}

	function editRequest() {
		window.location.assign('update-request.html');
	}

	function logOut() {
		sessionStorage.removeItem('token');
		window.location.assign('index.html');
	}

	window.deleteRequest = deleteRequest;
	window.editRequest = editRequest;
	window.logOut = logOut;
}
else{
	alert("Please login");
	window.location.assign('index.html');
}



