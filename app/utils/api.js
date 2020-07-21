const apiUrlBase = "https://capstonequizapi20200705171512.azurewebsites.net";
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

/*
============================================================
=================TEST MANAGEMENT FUNCTIONS==================
============================================================
*/

export function generateNewTest() {
    // Emulate the same material, for now.
    return fetchNextQuestionBySession("123");
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
            ])
        }, 1000)
    })

    return samplePromise
        //.then((res) => res.json())
        .then((data) => {
            return data;
        })
}

/*
============================================================
=================TOPIC MANAGEMENT FUNCTIONS=================
============================================================
*/

export function fetchTopicsByUser() {
    var endpoint = `${apiUrlBase}/api/Topics`;

    return performGet(endpoint)
}

export function fetchTopicById(topicId) {
    var endpoint = `${apiUrlBase}/api/Topics/${topicId}`;

    return performGet(endpoint)
}

export function generateNewTopic({topicName, topicDescription, userId}) {
    var endpoint = `${apiUrlBase}/api/Topics`;
    var postObject = {
        "topicName": topicName,
        "topicDescription": topicDescription,
        "userId": userId
    };
    return sendPostRequest(postObject, endpoint)
}

export function editTopic(topic) {
    var endpoint = `${apiUrlBase}/api/Topics/${topic.id}`;
    var postObject = topic;
    console.log("Topic to post: ")
    console.log(topic)
    return sendPutRequest(postObject, endpoint)
}


/*
============================================================
=================USER MANAGEMENT FUNCTIONS==================
============================================================
*/

export function fetchAllUsers() {
    const endpoint = window.encodeURI(`${apiUrlBase}/api/Users`);

    return fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch(err => console.log(err));
}

export function registerUser({firstName, lastName, username, password}) {
    var endpoint = `${apiUrlBase}/api/Users`;
    var postObject = {
        "username": username,
        "password":password,
        "firstName": firstName,
        "lastName": lastName,
        "isAdmin": false
    };
    return sendPostRequest(postObject, endpoint)
}

export function getToken({username, password}) {
    const endpoint = `${apiUrlBase}/api/Token`;
    var postObject = {
        "username": username,
        "password":password
    };

    return sendPostRequest(postObject, endpoint)
}

/*
============================================================
====================GENERIC API FUNCTIONS===================
============================================================
*/

function performGet(unencodedUri) {
    return fetch(unencodedUri)
    .then((res) => res.json())
    .then((data) => {
        return data;
    })
    .catch(err => console.log(err));
}

function sendPostRequest(postObject, unencodedUri) {
    const endpoint = window.encodeURI(unencodedUri);

    return fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(postObject),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json()) 
        .then(json => { return json })
        .catch(err => console.log(err));
}

function sendPutRequest(putObject, unencodedUri) {
    const endpoint = window.encodeURI(unencodedUri);

    return fetch(endpoint, {
        method: "PUT",
        body: JSON.stringify(putObject),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => {
            console.log(response); 
            if (response.url) {
                return performGet(response.url)
            }
        else {
            return true;
        }}) 
        .catch(err => console.log(err));
}