import React from 'react';

import Message from 'components/chat/Message';

import styles from 'styles/chat.module.css';

export default class MessageList extends React.Component {
    componentDidUpdate() {
        const messageList = this.refs.messageList;
        if (messageList) {
            messageList.scrollTop = messageList.scrollHeight;
        }
    }
    render() {
        if (!this.props.messages || !this.props.messages.length) return (
            <div className={styles.messagelist}>
                <div className={styles.messagelist__empty}>
                    Нет сообщений
                </div>
            </div>
        );
        return (
            <div className={styles.messagelist} ref='messageList'>
                <div>
                    {this.props.messages.map((msg) => <Message channelLastVisited={this.props.channelLastVisited} onDeleteMessage={this.props.onDeleteMessage}message={msg} key={msg.id}/>)}
                </div>
            </div>
        )
    }
}
