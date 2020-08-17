const apiUrlBase = "https://capstonequizapi20200705171512.azurewebsites.net";

/*
============================================================
=================TEST MANAGEMENT FUNCTIONS==================
============================================================
*/

export function generateNewTest(topicId, userId) {
    var endpoint = `${apiUrlBase}/api/TestSessions`;
    var postObject = {
        "userId": parseInt(userId),
        "topicId": parseInt(topicId)
    }
    return sendPostRequest(postObject, endpoint)
}

export function fetchNextQuestionBySession(sessionId) {
    let endpoint = `${apiUrlBase}/api/SessionQuestions?sessionId=${sessionId}`;
    return performGet(endpoint)
        .then(response => {
            if (response.length == 0) {
                return {}
            }
            let nextQuestion = response[0].question;
            nextQuestion.sessionQuestionId = response[0].id;
            let questionCount = response.length
            return {
                question: nextQuestion,
                questionCount: questionCount
            };
        })
    
}

export function removeQuestionFromList(sessionQuestionId) {
    var endpoint = `${apiUrlBase}/api/SessionQuestions/${sessionQuestionId}?action=answer`;
    return fetch(endpoint, {
        method: "PUT",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(r => {
                return true;
            }
        ) 
        .catch(err => console.log(err));
}

export function addQuestionToList(sessionQuestionId, count) {
    var endpoint = `${apiUrlBase}/api/SessionQuestions/${sessionQuestionId}?action=requeue&count=${count}`;
    return fetch(endpoint, {
        method: "PUT",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(r => {
                return true;
            }
        ) 
        .catch(err => console.log(err));
}

export function fetchSessionsByUser(userId) {
    const endpoint = `${apiUrlBase}/api/TestSessions`;
    return performGet(endpoint);
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

export function updateTopic(topic) {
    var endpoint = `${apiUrlBase}/api/Topics/${topic.id}`;
    var postObject = topic;
    return sendPutRequest(postObject, endpoint)
}

/*
============================================================
===============QUESTION MANAGEMENT FUNCTIONS================
============================================================
*/

export function fetchQuestionById(questionId) {
    var endpoint = `${apiUrlBase}/api/Questions/${questionId}`;

    return performGet(endpoint)
}

export function generateNewQuestion(inbtopicId) {
    var endpoint = `${apiUrlBase}/api/Questions`;
    var question = {
        questionText:"New Question Text",
        topicId: parseInt(inbtopicId),
        questionExplanation:"Sample Explanation"
    }
    var postObject = question;
    return sendPostRequest(postObject, endpoint)
}

export function updateQuestion(question) {
    var endpoint = `${apiUrlBase}/api/Questions/${question.id}`;
    var postObject = question;
    return sendPutRequest(postObject, endpoint)
}

export function deleteQuestion(questionId) {
    var endpoint = `${apiUrlBase}/api/Questions/${questionId}`;
    
    return sendDeleteRequest(endpoint)
}

/*
============================================================
================ANSWER MANAGEMENT FUNCTIONS=================
============================================================
*/

export function generateNewAnswer(answer) {
    var endpoint = `${apiUrlBase}/api/Answers`;
    var postObject = answer;
    return sendPostRequest(postObject, endpoint)
}

export function updateAnswer(answer) {
    var endpoint = `${apiUrlBase}/api/Answers/${answer.id}`;
    var postObject = answer;
    return sendPutRequest(postObject, endpoint)
}

export function deleteAnswer(answerId) {
    var endpoint = `${apiUrlBase}/api/Answers/${answerId}`;
    
    return sendDeleteRequest(endpoint)
}

/*
============================================================
===================REPORTING FUNCTIONS======================
============================================================
*/

export function getQuestionPerformance() {
    var endpoint = `${apiUrlBase}/api/Answers`;
    return performGet(endpoint);
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
    const endpoint = window.encodeURI(unencodedUri);
    return fetch(endpoint)
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
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => {
            if (response.url) {
                return performGet(response.url)
            }
            else {
                return true;
            }
        }) 
        .catch(err => console.log(err));
}

function sendDeleteRequest(unencodedUri) {
    const endpoint = window.encodeURI(unencodedUri); 

    return fetch(endpoint, {
        method: "DELETE"
    })
        .then(response => response.json()) 
        .then(json => { return json })
        .catch(err => console.log(err));
}