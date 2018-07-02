API_PREFIX = 'https://maintenance-tracker-project.herokuapp.com'

// Add event listeners
document.getElementById('login').addEventListener('click', loginUser);

// Login a user
function loginUser(e) {
    e.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    fetch (API_PREFIX+'/api/v2/auth/login', {
    	method: 'POST',
    	headers: {
    		"Accept":"application/json",
    		"Content-type":"application/json"
    	},
    	body: JSON.stringify({username:username, password:password})
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.length > 1){
            if (data[1].message === 'Login successful') {
                localStorage.setItem('token', data[0].token);
                if (data[2].role) {
                    location.assign("admin-all-requests.html"); 
                }
                else {
                    location.assign("user-requests.html"); 
                }             
            }
        } 
        else {
            alert(data.message);
        }    
    })     
}
