
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
}