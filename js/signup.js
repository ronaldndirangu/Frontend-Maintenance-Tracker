API_PREFIX = 'https://maintenance-tracker-project.herokuapp.com'

// Add event listener
document.getElementById('signup').addEventListener('click', signupUser);
document.getElementById('cancel').addEventListener('click', cancelSignup)

document.getElementById('rptpassword').addEventListener('keyup', checkPwd);

// Signup a user
function signupUser(e) {
	e.preventDefault();

	let username= document.getElementById('username').value;
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	let rptpassword = document.getElementById('rptpassword').value;

	if (password === rptpassword){
		fetch (API_PREFIX+'/api/v2/auth/signup', {
			method: 'POST',
			headers: {
				"Accept":"application/json",
				"Content-type":"application/json"
			},
			body: JSON.stringify({username:username, email:email, password:password})
		})	
		.then((res) => res.json())
		.then((data) => {
			console.log(data)
			if (data.message === "User created successfully") {
				window.location.assign('index.html');
			}
			else {
				alert(data.message);
			}
		})
	}
	else {
		alert("Passwords must match")
	}	
}

function cancelSignup() {
	window.location.assign('index.html');
}

function checkPwd() {

	let password = document.getElementById('password').value;
	let rptpassword = document.getElementById('rptpassword').value;
	let p = document.getElementById('pwdtext')

	if (password != rptpassword) {
		console.log('Passwords not matching');			
		p.innerHTML = 'Passwords not matching';
		p.style.color = 'red';
		document.getElementById('rptpassword').style.color = 'red';
	}
	else if (password === rptpassword) {
		console.log('Passwords matching');
		p.innerHTML = 'Passwords matching';
		p.style.color = 'green';
		document.getElementById('rptpassword').style.color = 'green';
	}
}
