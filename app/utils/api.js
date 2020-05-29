
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
    let samplePromise = new Promise((resolve, reject) => {
        setTimeout( function() {
            resolve([
                {
                    questionId: 1, 
                    questionText: "What is your favorite color?", 
                    questionExplanation: "This is the right answer.", 
                    questionType: "multiple choice",
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
                    questionExplanation: "This is the right answer. For reasons.", 
                    questionType: "multiple choice",
                    answers: [
                        {answerId: 1, answerText: "Where did you get the coconuts?", isCorrect: false},
                        {answerId: 2, answerText: "I told them he's already got one", isCorrect: false},
                        {answerId: 3, answerText: "'tis but a fleshwound", isCorrect: true},
                        {answerId: 4, answerText: "<vague MP reference>", isCorrect: false},
                    ]
                },
            ])
        }, 1000)
    });

    return samplePromise
        //.then((res) => res.json())
        .then((data) => {
            return data;
        })
}

export function generateNewTest() {
    // Emulate the same material, for now.
    return fetchQuestionsBySession("123");
}