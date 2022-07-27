const Services = () => {
	const getResourse = (url, method="GET", data=null) => {
		
		try{
			const request = fetch(url, {
				method: method,
				headers: { "Content-type": "application/json" },
				body: data
			}).then(response => {
				if(!response.ok) {
					throw new Error(`Could not fetch ${url}, status: ${response.status}`);
				}
				else {
					return response.json();
				}
			}
			);
			return request;
		}
		catch (e) {
			console.log(e);
		}
		
		// return fetch(url, {
		// 	method: method,
		// 	headers: { "Content-type": "application/json" },
		// 	body: data
		// }).then(response => response.json());
	};

	return {getResourse};
};

export default Services;