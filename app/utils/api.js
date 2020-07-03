const apiUrlBase = "https://localhost:44336";
var questionsList = [
    {
        questionId: 1, 
        questionText: "What is your favorite color?", 
        questionExplanation: "Obviously, No Yellow is the correct answer because I said it was. Duh.", 
        answers: [
            {answerId: 1, answerText: "Blue", isCorrect: false},
            {answerId: 2, answerText: "No, Yellowwwwwww", isCorrect: true},
            {answerId: 3, answerText: "What?", isCorrect: false},
            {answerId: 4, answerText: "I don't like Spam", isCorrect: false},
        ]
    },
    {
        questionId: 2, 
        questionText: "What is the average air speed velocity of a laden swallow?", 
        questionExplanation: "Nobody suspects the Spanish Inquisition!", 
        answers: [
            {answerId: 1, answerText: "Where did you get the coconuts?", isCorrect: false},
            {answerId: 2, answerText: "I told them he's already got one", isCorrect: false},
            {answerId: 3, answerText: "The Spanish Inquisition", isCorrect: true},
            {answerId: 4, answerText: "'tis but a fleshwound", isCorrect: false},
        ]
    },
]


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

export function fetchNextQuestionBySession(sessionId) {
    let samplePromise = new Promise((resolve, reject) => {
        setTimeout( function() {
            resolve({question: questionsList[0], questionCount: questionsList.length})
        }, 1000)
    });

    return samplePromise
        //.then((res) => res.json())
        .then((data) => {
            return data;
        })
}

export function removeQuestionFromList() {
    // User is only dealing with the first question in the list; just remove index 1
    questionsList.shift();
}

export function addQuestionTolist(question, count) {
    // i is 1 because if they need to repeat the question only once, it's already on the list. Just shuffle the results :)
    for (let i=1; i < count; i++) {
        questionsList.push(question);
    }
}

export function generateNewTest() {
    // Emulate the same material, for now.
    return fetchNextQuestionBySession("123");
}

export function fetchAllUsers() {
    const endpoint = window.encodeURI(`${apiUrlBase}/api/Users`);
    console.log("Fetching from " + endpoint)

    return fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            return data;
        })
        .catch(err => console.log(err));
}

export function registerUser({firstName, lastName, username, password}) {
    const endpoint = window.encodeURI(`${apiUrlBase}/api/Users`);

    return fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
            "username": username,
            "password":password,
            "firstName": firstName,
            "lastName": lastName,
            "isAdmin": false
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json()) 
        .then(json => { return json })
        .catch(err => console.log(err));
}