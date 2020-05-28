
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
                {sessionId: 1, name: 'Session 1', lastAccessed: "2 Days"},
                {sessionId: 2, name: 'Session 2', lastAccessed: "Today" },
                {sessionId: 3, name: 'Session 3', lastAccessed: "Today" },
                {sessionId: 4, name: 'Session 4', lastAccessed: "Today" },
                {sessionId: 5, name: 'Session 5', lastAccessed: "Today" },
                {sessionId: 6, name: 'Session 6', lastAccessed: "Today" },
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