// Add event listener
document.getElementById("submitRequest").addEventListener('click', createRequest);

// Create request function
function createRequest(e) {
	e.preventDefault();

	let title = document.getElementById("requesttitle").value;
	let location = document.getElementById("location").value;
	let priority = document.getElementById("priority").value;
	let description = document.getElementById("description").value;

	fetch ('http://127.0.0.1:5000/api/v2/users/requests', {
		method: 'POST',
		headers: {
			"Accept":"application/json",
			"Content-type":"application/json",
			"token":localStorage.getItem('token')
		},
		body: JSON.stringify({request_title:title, request_location:location,
							 request_priority:priority, request_description:description})
	})
	.then ((res) => res.json())
	.then ((data) => console.log(data))
}