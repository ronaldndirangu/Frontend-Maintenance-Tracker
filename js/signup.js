// Add event listener
document.getElementById('signup').addEventListener('click', signupUser);

// Signup a user
function signupUser(e) {
	e.preventDefault();

	let username= document.getElementById('username').value;
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;

	fetch ('http://127.0.0.1:5000/api/v2/auth/signup', {
		method: 'POST',
		headers: {
			"Accept":"application/json",
			"Content-type":"application/json"
		},
		body: JSON.stringify({username:username, email:email, password:password})
	})	
	.then((res) => res.json())
	.then((data) => console.log(data))
}
