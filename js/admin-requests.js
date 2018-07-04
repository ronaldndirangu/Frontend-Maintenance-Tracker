API_PREFIX = 'https://maintenance-tracker-project.herokuapp.com'

let sort;

function adminRequests() {
	fetch(API_PREFIX+'/api/v2/requests', {
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
		let table = document.getElementById('requests');
		data.forEach(function(request) {

			let i = 1
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
					title.className = 'title';
			} 
			

			function viewRequest() {
				fetch(API_PREFIX+'/api/v2/users/requests/'+(request.request_id), {
					method: 'GET',
					headers:{
						"Accept":"application/json",
						"Content-type":"application/json",
						"token":localStorage.getItem('token')
					}
				})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					localStorage.setItem('request_id', data[0].request_id);
					localStorage.setItem('request_title', data[0].request_title);
					localStorage.setItem('request_date', data[0].request_date);
					localStorage.setItem('request_location', data[0].request_location);
					localStorage.setItem('request_priority', data[0].request_priority);
					localStorage.setItem('request_status', data[0].request_status);
					localStorage.setItem('request_description', data[0].request_description);
					location.assign('admin-request.html');
				})
			}
		});
		sort = paginate(table);
	})
}

// Implement search on user request page
searchTitle = document.getElementById('filterbytitle');
searchTitle.addEventListener('keyup', filterTitle);

function filterTitle() {
	let filterTitleValue = document.getElementById('filterbytitle').value.toUpperCase();

	// Get table rows
	let tr = document.getElementsByClassName('title');
	// Get entries
	for (let i=0; i<tr.length; i++) {
		if (tr[i].innerHTML.toUpperCase().indexOf(filterTitleValue) > -1 ) {
            tr[i].parentNode.style.display = '';
        } else {
            tr[i].parentNode.style.display = 'none';
        }
	}	
}

// Pagination function 
function paginate(tb) {
	let table_rows = tb.rows.length
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
			console.log(tr[ii])
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
		console.log(buttons)
		for (i=1; i<=pageCount; i++) {
			buttons += "<input type='button' value='"+i+"' id='id"+i+"' onclick='sort("+i+")'>";
		}
		buttons +="<input type='button' value='Next &gt;&gt;' onclick='sort("+(current_page+1)+")' "+next_disable+">";
		return buttons;
	}
	return sort;
}
