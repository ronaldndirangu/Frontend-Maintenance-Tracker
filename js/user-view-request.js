API_PREFIX = 'https://maintenance-tracker-project.herokuapp.com'

function getRequest() {	
	request_title = localStorage.getItem('request_title')
	document.getElementById('req-title').innerHTML = '<u> Title: '+request_title+ '</u>';

	request_date = localStorage.getItem('request_date')
	document.getElementById('req-date').innerHTML = '<em><b>Created at: </b>'+request_date+'</em>';

	request_location = localStorage.getItem('request_location')
	document.getElementById('req-location').innerHTML = '<em><b>Location: </b>'+request_location+'</em>';

	request_priority = localStorage.getItem('request_priority')
	document.getElementById('req-priority').innerHTML = '<em><b>Priority: </b>'+request_priority+'</em>';

	request_status = localStorage.getItem('request_status')
	document.getElementById('req-status').innerHTML = '<em><b>Status: </b>'+request_status+'</em>';
	
	request_description = localStorage.getItem('request_description')
	document.getElementById('req-description').innerHTML = '<em><b>Description: </b>'+request_description+'</em>';

	document.getElementById('delete').addEventListener('click', deleteRequest);
}

function deleteRequest(e) {
	e.preventDefault();
	
	req_id = localStorage.getItem('request_id')
	if (confirm("Are you sure you want to delete this request?")) {
		fetch (API_PREFIX+'/api/v2/users/requests/'+req_id, {
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
			window.location.assign('user-requests.html');
		})
	}	
}

function editRequest() {
	window.location.assign('update-request.html');
}

function logOut() {
	localStorage.removeItem('token');
	window.location.assign('index.html');
}