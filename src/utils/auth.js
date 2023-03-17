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
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    })
        .then((res) => {
            return checkResponse(res);
        });

}

export function login(password, email) {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    })
        .then((res) => {
            return checkResponse(res);
        })
        .then((data) => {
            if (data.jwt) {
                localStorage.setItem('jwt', data.jwt);
                return data;
            }
            else return;
        })


} 