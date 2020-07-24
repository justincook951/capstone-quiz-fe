export function shuffleArray(array, arrayShuffled, changeArrayShuffled) {
    if (!arrayShuffled) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        changeArrayShuffled(true);
    }
    return array;
}

export function getLoginCookie() {
    var allCookies = document.cookie;
    var loginToken = allCookies.includes("token=");
    if (loginToken) {
        var cookiesSplit = allCookies.split("; ");
        var loginToken = "";
        for (var i=0; i<cookiesSplit.length; i++) {
            if (cookiesSplit[i].includes("token=")) {
                loginToken = cookiesSplit[i].split("token=")[1];
                break;
            }
        }
    }
    else {
        loginToken = false;
    }
    return loginToken;
}

export function hasValidLogin() {
    var loginToken = getLoginCookie();
    hasValidToken = false;
    if (loginToken) {
        // Oh, and if we try to base64 decode the signature, it explodes. :D
        var trimmedTokenArr = loginToken.split(".");
        var decodedStr = b64DecodeUnicode(`${trimmedTokenArr[1]}`);
        var tokenObj = JSON.parse(decodedStr);
        var currentTime = (new Date().getTime()).toString();
        // Evaluate against the exp that was given to us, in its format (remove ms digits from the end)
        var trimmedTime = currentTime.substring(0, currentTime.length - 3)
        var hasValidToken = (tokenObj.exp > trimmedTime);
        if (!hasValidToken) {
            // Clear out any existing cookies
            expireToken()
        }
    }
    
    return hasValidToken;
}

export function getLoggedInUserObject() {
    var allCookies = document.cookie;
    var hasToken = allCookies.includes("userObject=")
    var userObj = false;
    if (hasToken) {
        var cookiesSplit = allCookies.split("; ");
        for (var i=0; i<cookiesSplit.length; i++) {
            if (cookiesSplit[i].includes("userObject=")) {
                userObj = JSON.parse(cookiesSplit[i].split("userObject=")[1]);
                break;
            }
        }
    }
    return userObj;
}

export function getUserData(property = "") {
    var userObject = getLoggedInUserObject();
    if (!userObject) {
        return false;
    }
    if (property) {
        return userObject[property];
    }
    else {
        return userObject;
    }
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

export function expireToken() {
    document.cookie="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie="userObject=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}