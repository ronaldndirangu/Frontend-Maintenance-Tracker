// Add event listeners
document.getElementById('login').addEventListener('click', loginUser);

// Login a user
function loginUser(e) {
    e.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    fetch ('http://127.0.0.1:5000/api/v2/auth/login', {
    	method: 'POST',
    	headers: {
    		"Accept":"application/json",
    		"Content-type":"application/json"
    	},
    	body: JSON.stringify({username:username, password:password})
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if (data[1].message === 'Login successful') {
            localStorage.setItem('token', data[0].token);
            if (data[2].role) {
                location.assign("admin-all-requests.html"); 
            }
            else {
                location.assign("user-requests.html"); 
            }             
        }
        else {
            alert("Login Failed.");
        }    
    })     
}
