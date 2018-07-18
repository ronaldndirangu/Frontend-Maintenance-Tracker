import endPoint from './fetch';

let request_id;

if (sessionStorage.getItem('token')) {
	// Get request details
	window.onload = function getRequest() {	
		request_id = localStorage.getItem('request_id')

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

		document.getElementById('approve').addEventListener('click', approveRequest);
		document.getElementById('reject').addEventListener('click', rejectRequest);
		document.getElementById('resolve').addEventListener('click', resolveRequest);
	}

	// Approve request
	function approveRequest(e) {
		e.preventDefault();

		let token = window.sessionStorage.getItem('token');
		endPoint.put('/requests/'+request_id+'/approve', token)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			alert(data.message);
			if (data.message==="request approved") {
				window.location.assign("admin-all-requests.html");
			}		
		})
	}

	// Reject request
	function rejectRequest(e) {
		e.preventDefault();

		let token = window.sessionStorage.getItem('token');
		endPoint.put('/requests/'+request_id+'/disapprove', token)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			alert(data.message);
			if (data.message==="request rejected") {
				window.location.assign("admin-all-requests.html");
			}
		})
	}

	// Resolve request
	function resolveRequest(e) {
		e.preventDefault();

		let token = window.sessionStorage.getItem('token');
		endPoint.put('/requests/'+request_id+'/resolve', token)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			alert(data.message);
			if (data.message==="request resolved") {
				window.location.assign("admin-all-requests.html");
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

