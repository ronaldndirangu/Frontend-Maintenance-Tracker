
window.onload = function userRequests() {
	fetch('http://127.0.0.1:5000/api/v2/users/requests', {
		method: 'GET',
		headers: {
			"Accept":"application/json",
			"Content-type":"application/json",
			"token":localStorage.getItem('token')
		}
	})
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		data.forEach(function(request) {
			let table = document.getElementById('requests');
			
			i = 1

			// Create row for each request
			let row = table.insertRow(i);

			// Create cell for each entry
			let id = row.insertCell(0);
			let date = row.insertCell(1);
			let title = row.insertCell(2);
			let location = row.insertCell(3);
			let priority = row.insertCell(4);
			let status = row.insertCell(5);
			
			// Add data into cells
			id.innerHTML = "<a href='#'>"+request.request_id+"</a>";
			date.innerHTML = request.request_date;
			title.innerHTML = request.request_title;
			location.innerHTML = request.request_location;
			priority.innerHTML = request.request_priority;
			status.innerHTML = request.request_status;
			
			i++;
			
		});
	})
}