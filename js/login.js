import endPoint from './fetch';


// Add event listeners
document.getElementById('login').addEventListener('click', loginUser);

// Login a user
function loginUser(e) {
    e.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let data = {username:username, password:password}
    
    endPoint.post('/auth/login', data)
    .then((res) => res.json())
    .then((data) => {
        if (data.length > 1){
            if (data[1].message === 'Login successful') {
                sessionStorage.setItem('token', data[0].token);
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
    });     
}
