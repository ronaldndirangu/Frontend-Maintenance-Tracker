import endPoint from './fetch';

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

	let data = {username:username, email:email, password:password};

	if (password === rptpassword){
		endPoint.post('/auth/signup', data)	
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
// Cancel signup and go back to login/index page
function cancelSignup() {
	window.location.assign('index.html');
}

// Change repeat password field on user input
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
