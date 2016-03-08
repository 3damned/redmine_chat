import * as types from 'actionTypes';

const initialState = {
    loaded: false,
    currentChannel: 1,
    channels: []
};

export default function messages(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_CHANNEL:
            return {...state,
                currentChannel: action.channelId
            }
        case types.LOAD_ACCOUNT_INFO_SUCCESS:
            return {...state,
                loaded: true,
                channels: action.data.chats.reduce((memo, channel) => {
                    memo[channel.id] = channel;
                    return memo;
                }, {})
            }
        default:
            return state;
    }
}
