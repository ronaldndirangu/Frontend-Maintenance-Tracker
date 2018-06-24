// Get request details
function getRequest() {	
	request_id = localStorage.getItem('request_id')

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

	document.getElementById('approve').addEventListener('click', approveRequest);
	document.getElementById('reject').addEventListener('click', rejectRequest);
	document.getElementById('resolve').addEventListener('click', resolveRequest);
}

// Approve request
function approveRequest(e) {
	e.preventDefault();

	fetch('http://127.0.0.1:5000/api/v2/requests/'+request_id+'/approve', {
		method: "PUT",
		headers: {
			"Accept":"application/json",
			"Content-type":"application/json",
			"token":localStorage.getItem('token')
		}
	})
	.then((res) => res.json())
	.then((data) => console.log(data))
}

// Reject request
function rejectRequest(e) {
	e.preventDefault();

	fetch('http://127.0.0.1:5000/api/v2/requests/'+request_id+'/disapprove', {
		method: "PUT",
		headers: {
			"Accept":"application/json",
			"Content-type":"application/json",
			"token":localStorage.getItem('token')
		}
	})
	.then((res) => res.json())
	.then((data) => console.log(data))
}

// Resolve request
function resolveRequest(e) {
	e.preventDefault();

	fetch('http://127.0.0.1:5000/api/v2/requests/'+request_id+'/resolve', {
		method: "PUT",
		headers: {
			"Accept":"application/json",
			"Content-type":"application/json",
			"token":localStorage.getItem('token')
		}
	})
	.then((res) => res.json())
	.then((data) => console.log(data))
}