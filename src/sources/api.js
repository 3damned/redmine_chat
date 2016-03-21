import {API_URL} from 'settings';
var token = null;

export function setAuthToken(authtoken) {
    token = authtoken;
}

function makeRequest(url, options) {
    return fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        ...options
    })
}
function processApiResponse(res) {
    if (res.ok) return res.json();
    throw new Error('Unable to process API response');
};

export function fetchMessages(channel, options) {
    return makeRequest(`${API_URL}/chats/${channel}/messages`).then(processApiResponse);
};

export function sendMessage(channel, message) {
    return makeRequest(`${API_URL}/chats/${channel}/messages`, {
        method: 'post',
        body: JSON.stringify({
            message: message
        })
    }).then(processApiResponse);
};

export function deleteMessage(channel, msgId) {
    return makeRequest(`${API_URL}/chats/${channel}/messages/${msgId}`, {
        method: 'delete'
    }).then(processApiResponse);
}

export function updateMessage(channel, msgId, message) {
    return makeRequest(`${API_URL}/chats/${channel}/messages/${msgId}`, {
        method: 'PUT',
        body: JSON.stringify(message)
    }).then(processApiResponse);
}

export function fetchAccountInfo() {
    return makeRequest(`${API_URL}/account`).then(processApiResponse);
}

export function joinChannel(channelId) {
    return makeRequest(`${API_URL}/chats/${channelId}/join`,{
        method: "POST"
    }).then(processApiResponse);
}

export function leaveChannel(channelId) {
    return makeRequest(`${API_URL}/chats/${channelId}/exit`,{
        method: "POST"
    }).then(processApiResponse);
}

export function updateChannelLastVisited(channelId) {
    return makeRequest(`${API_URL}/account/update_last_visited?chat_id=${channelId}`, {
        method: 'PUT'
    }).then(processApiResponse);
}
