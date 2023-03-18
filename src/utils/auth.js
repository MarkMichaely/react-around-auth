const BASE_URL = "https://register.nomoreparties.co";

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else
        return Promise.reject(`Error ${res.status}`);
}



export function register(password, email) {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password, email: email }),
    })
        .then((res) => {
            return checkResponse(res);
        })
        .catch(() => {
            const err = new Error("400 - one of the fields was filled in incorrectly")
            throw err;
        });

}

export function login(password, email) {
    if (!email || !password) {
        const err = new Error("400 - one or more of the fields were not provided")
        throw err;
    }
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, email }),
    })
        .then((res) => {
            return checkResponse(res);
        })
        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;
            }
            else return;
        })
        .catch(() => {
            const err = new Error("401 - the user with the specified email not found")
            throw err;
        })
}
export function checkJwt(jwt) {
    if (!jwt) {
        const err = new Error("400 — Token not provided or provided in the wrong format")
        throw err;
    }
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
    })
        .then((res) => {
            return checkResponse(res);
        })
        .catch(() => {
            const err = new Error("401 — The provided token is invalid")
            throw err;
        })
}