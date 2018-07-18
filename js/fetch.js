// API Class
class API{
	
	constructor() {
		// Define base url
		this.baseUrl = 'https:///maintenance-tracker-project.herokuapp.com/api/v2'
	}

	// Post function
	post(api, data, token = null) {
		return fetch(this.baseUrl+api, {
			method: 'POST',
			headers: {
				"Accept":"application/json",
				"Content-type":"application/json",
				"token":token
			},
			body: JSON.stringify(data)
		})
	}

	// Get function
	get(api, token=null) {
		return fetch(this.baseUrl+api, {
			method: 'GET',
			headers: {
				"Accept":"application/json",
				"Content-type":"application/json",
				"token":token
			}
		})
	}

	// Put function
	put(api, data=null,token=null) {
		return fetch(this.baseUrl+api, {
			method: 'PUT',
			headers: {
				"Accept":"application/json",
				"Content-type":"application/json",
				"token":token
			},
			body: JSON.stringify(data)
		})
	}

	// Delete function
	delete(api, token=null) {
		return fetch(this.baseUrl+api, {
			method: 'DELETE',
			headers: {
				"Accept":"application/json",
				"Content-type":"application/json",
				"token":token
			}
		})
	}
}

const endPoint = new API()
export default endPoint