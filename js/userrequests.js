
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
			
			let row = table.insertRow(i);

			let id = row.insertCell(0);
			let date = row.insertCell(1);
			let title = row.insertCell(2);
			let location = row.insertCell(3);
			let priority = row.insertCell(4);
			let status = row.insertCell(5);

			id.innerHTML = "<a href='#'>"+request.request_id+"</a>";
			date.innerHTML = request.request_date;
			title.innerHTML = request.request_title;
			location.innerHTML = request.request_location;
			priority.innerHTML = request.request_priority;
			status.innerHTML = request.request_status;
			
			i++;
			
		});
			
			/*usertable += `				
				<td>${request.request_id}</td>
				<td>${request.request_date}</td>
				<td>${request.request_title}</td>
				<td>${request.request_location}</td>
				<td>${request.request_priority}</td>
				<td>${request.request_status}</td>				
			`;
		});
		document.getElementById('usertable').innerHTML = usertable;*/
	})
}