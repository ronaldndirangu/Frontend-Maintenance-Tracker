API_PREFIX = 'https://maintenance-tracker-project.herokuapp.com'

function getUsers() {
	fetch(API_PREFIX+'/api/v2/users', {
		method: 'GET',
		headers: {
			"Accept":"application/json",
			"Content-type":"application/json",
			"token":sessionStorage.getItem('token')
		}
	})
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		data.forEach(function(user) {
			let table = document.getElementById('users');
			
			i = 1
			console.log(table);
			// Create row for each user
			if (typeof table !== "undefined" && table !== null) {
					let row = table.insertRow(i);
					row.setAttribute('onclick', 'getUser(this)');

					// Create cell for each entry
					let id = row.insertCell(0);
					let username = row.insertCell(1);
					let email = row.insertCell(2);
					let role = row.insertCell(3);
					
					// Add data into cells
					id.innerHTML = user.user_id;
					username.innerHTML = user.username;
					email.innerHTML = user.email;
					if (user.role === true) {
						role.innerHTML = 'Admin';
					}
					else {
						role.innerHTML = 'Normal';
					}					
					i++;

					username.className = "username"	
			}
			sort = paginate(table);
		});
	});
}

searchUser = document.getElementById('username');
searchUser.addEventListener('keyup', filterUser);

function filterUser() {
	let filterValue = document.getElementById('username').value.toUpperCase();

	// Get table rows
	let tr = document.getElementsByClassName('username');
	// Get entries
	for (let i=0; i<tr.length; i++) {
		if (tr[i].innerHTML.toUpperCase().indexOf(filterValue) > -1 ) {
            tr[i].parentNode.style.display = '';
        } else {
            tr[i].parentNode.style.display = 'none';
        }
	}	
}

// Pagination function 
function paginate(tb) {
	let table_rows = tb.rows.length;
	console.log(table_rows);
	let table_header = tb.rows[0].firstElementChild.tagName;
	// Set rows to be displayed per page
	page_rows = 2;
	// Check if table has header
	is_header = (table_header === 'TH');
	// Array to hold each row
	let tr = [];
	// Start counter row at 1 if table header is present
	let i, ii, j = (is_header)?1:0;
	// Insert first row as header if present
	let th = (is_header?tb.rows[(0)].outerHTML:"");
	// Determine no of pages required 
	let pages = Math.ceil(table_rows/page_rows);
	// If only one page is present do nothing 

	if (pages > 1) {
		// Assign each row into the array

		for (i=j, ii=0; i < table_rows; i++, ii++) {
			tr[ii] = tb.rows[(i)].outerHTML;
			console.log(tr[ii]);
		}
		tb.insertAdjacentHTML("afterend","<br/><div id='buttons'></div");
		sort(1);
	}
	// Generate current page after user clicks page button
	function sort(selected_page) {
		// rows variable holds the group of rows on the page including the header if present
		// start_point is the first row on each page

		let rows = th, start_point = ((page_rows*selected_page)-page_rows);
		for (i=start_point; i<(start_point+page_rows) && i<tr.length; i++) {
			rows += tr[i];
		}

		// table has a number of rows
		tb.innerHTML = rows;
		// Create pagination buttons
		document.getElementById('buttons').innerHTML = pageButtons(pages, selected_page);
		// Style button
		document.getElementById("id"+selected_page).setAttribute("class", "active");
	}
	// pageCount, current_page selected 
	function pageButtons(pageCount, current_page) {
		// Disable previous button on first page and next button on last page
		let prev_disable = (current_page === 1)?"disabled":"";
		let next_disable = (current_page === pageCount)?"disabled":"";
		// Buttons hold every button required
		let buttons = "<input type='button' value='&lt;&lt; Prev' onclick='sort("+(current_page-1)+")' "+prev_disable+">";
		console.log(buttons);
		for (i=1; i<=pageCount; i++) {
			buttons += "<input type='button' value='"+i+"' id='id"+i+"' onclick='sort("+i+")'>";
		}
		buttons +="<input type='button' value='Next &gt;&gt;' onclick='sort("+(current_page+1)+")' "+next_disable+">";
		return buttons;
	}
	return sort;
}

function getUser(event) {
	fetch(API_PREFIX+'/api/v2/users/'+event.cells[0].innerHTML, {
		method: 'GET',
		headers:{
			"Accept":"application/json",
			"Content-type":"application/json",
			"token":sessionStorage.getItem('token')
			}
 		})
		.then((res) => res.json())
		.then((data) => {
			localStorage.setItem('user_id', data[0].user_id);
			localStorage.setItem('username', data[0].username);
			localStorage.setItem('email', data[0].email);
			localStorage.setItem('role', data[0].role);
			location.assign('user-details.html')
		})
	} 

function logOut() {
	sessionStorage.removeItem('token');
	window.location.assign('index.html');
}