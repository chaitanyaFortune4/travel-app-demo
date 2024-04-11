export const apiGetCall = (endpoint) => {
    return new Promise((resolve, reject) => {
        const header = {
            "Content-Type": "application/json",
            'exp-api-key': process.env.VIATOR_API_KEY,
            'Accept-Language': 'en-IN',
            'Accept': 'application/json;version=2.0'
        };

        fetch(endpoint, {
            method: "GET",
            headers: header,
        })
            .then((res) => resolve(res.json()))
            .catch((error) => {
                resolve(error);
            });
    });
};

export const apiPostCall = (endpoint, payload = {}) => {
    return new Promise((resolve, reject) => {
        const header = {
            "Content-Type": "application/json",
            'exp-api-key': process.env.VIATOR_API_KEY,
            'Accept-Language': 'en-IN',
            'Accept': 'application/json;version=2.0'
        };

        fetch(endpoint, {
            method: "POST",
            headers: header,
            body: JSON.stringify(payload),
        })
            .then((res) => resolve(res.json()))
            .catch((error) => {
                resolve(error);
            });
    });
};

export async function postApiData(action, payload) {
    try {
        const response = await fetch(action, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow'
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.log("object", error);
    }
}

export async function fetchData(url) {
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
        headers: {
            'Content-Type': "application/json",
        }
    })
    const data = await response.json()
    return data
}