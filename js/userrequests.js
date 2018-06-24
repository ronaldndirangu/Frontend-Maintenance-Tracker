
function userRequests() {
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
			console.log(table);
			// Create row for each request
			if (typeof table !== "undefined" && table !== null) {
					let row = table.insertRow(i);

					// Create cell for each entry
					let id = row.insertCell(0);
					let date = row.insertCell(1);
					let title = row.insertCell(2);
					let location = row.insertCell(3);
					let priority = row.insertCell(4);
					let status = row.insertCell(5);
					
					// Add data into cells
					id.innerHTML = "<a>"+request.request_id+"</a>";
					date.innerHTML = request.request_date;
					title.innerHTML = request.request_title;
					location.innerHTML = request.request_location;
					priority.innerHTML = request.request_priority;
					status.innerHTML = request.request_status;
					
					i++;	
					id.addEventListener('click', viewRequest);
			} 
			

			function viewRequest() {
				fetch('http://127.0.0.1:5000/api/v2/users/requests/'+(request.request_id), {
					method: 'GET',
					headers:{
						"Accept":"application/json",
						"Content-type":"application/json",
						"token":localStorage.getItem('token')
					}
				})
				.then((res) => res.json())
				.then((data) => {
					localStorage.setItem('request_id', data[0].request_id);
					localStorage.setItem('request_title', data[0].request_title);
					localStorage.setItem('request_date', data[0].request_date);
					localStorage.setItem('request_location', data[0].request_location);
					localStorage.setItem('request_priority', data[0].request_priority);
					localStorage.setItem('request_status', data[0].request_status);
					localStorage.setItem('request_description', data[0].request_description);
					location.assign('user-view-request.html');
				})
			}
		});
	})
}

