class Api {
	constructor(config) {
		this.url = config.url;
		this.headers = {
			authorization: config.authorization,
			"Content-Type": "application/json",
		};
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		} else return Promise.reject(`Error ${res.status}`);
	}

	_request = (url, options) => fetch(url, options).then(this._checkResponse);

	async getUserInfo() {
		return this._request(`${this.url}/users/me`, {
			method: "GET",
			headers: this.headers,
		});
	}
	async getInitialCards() {
		return this._request(`${this.url}/cards`, {
			method: "GET",
			headers: this.headers,
		});
	}
	async editProfile({ name, about }) {
		return this._request(`${this.url}/users/me`, {
			method: "PATCH",
			headers: this.headers,
			body: JSON.stringify({
				name: `${name}`,
				about: `${about}`,
			}),
		});
	}

	async addCard({ name, link }) {
		return this._request(`${this.url}/cards`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify({
				name: name,
				link: link,
			}),
		});
	}
	async removeCard(cardId) {
		return this._request(`${this.url}/cards/${cardId}`, {
			method: "DELETE",
			headers: this.headers,
		});
	}
	async likeCard(cardId) {
		return this._request(`${this.url}/cards/likes/${cardId}`, {
			method: "PUT",
			headers: this.headers,
		});
	}
	async unLikeCard(cardId) {
		return this._request(`${this.url}/cards/likes/${cardId}`, {
			method: "DELETE",
			headers: this.headers,
		});
	}
	async changeProfilePicture(link) {
		return this._request(`${this.url}/users/me/avatar`, {
			method: "PATCH",
			headers: this.headers,
			body: JSON.stringify({
				avatar: link,
			}),
		});
	}
}

const api = new Api({
	url: "https://around.nomoreparties.co/v1/cohort-3-en",
	authorization: "47e379fa-558c-4eb9-b8db-66ce53bf3802",
});
export default api;
