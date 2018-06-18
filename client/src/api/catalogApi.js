


import {API_BASE_URL} from '../config';
class CatalogApi {
	static loadCatalog(){
		const request = new Request(`process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/catalog';
`, {method: 'GET'});

		return fetch(`${API_BASE_URL}/catalog`)
			.then(res => {
				if(!res.ok) {
					return Promise.reject(res.statusText);
				}
				console.log(res);
				return res.json();
			})
			.catch(err => {
				this.setState({
					error: 'Could not load courses',
					laoding: false
				});
			});
	}
}

export default CatalogApi;