
// This doesn't work yet :( good luck
const apiUrlBase = process.env.API_URL;


export function fetchSessionsByUser(userId) {
    // const endpoint = window.encodeURI(`${apiUrlBase}/get/sessions/${userId}`);
    // const endpoint = window.encodeURI(`https://api.github.com/users/justincook951/repos?per_page=100`);
    // return fetch(endpoint)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(`API Url Base: ${apiUrlBase}`)
    //         return data;
    //     })
    // Emulate fetch for now, without hitting an endpoint
    let samplePromise = new Promise((resolve, reject) => {
        setTimeout( function() {
            resolve([
                {id: 1, text: 'Hello! 1'},
                {id: 2, text: 'Hello! 2' }
            ])
        }, 1000)
    })

    return samplePromise
        //.then((res) => res.json())
        .then((data) => {
            return data;
        })
}

export function fetchQuestionsBySession(sessionId) {
    // Emulate the same material, for now.
    return fetchSessionsByUser(sessionId);
}

export function generateNewTest() {
    // Emulate the same material, for now.
    return fetchSessionsByUser("123");
}