export function checkReponse(res) {
    return res.ok ? res.json() : res.json().then((data) => Promise.reject(data));
}