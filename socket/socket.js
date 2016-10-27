'use strict';

const onSendMessage = require('./message/send');
const onAskFriend = require('./friends/ask');
const onAcceptFriend = require('./friends/accept');
const onRemoveFriend = require('./friends/remove');
const onGetFriends = require('./friends/get');

module.exports = (socket) => {

   // message
   listenTo(socket, 'sendMessage', onSendMessage);

   // friends
   listenTo(socket, 'getFriends', onGetFriends);
   listenTo(socket, 'askFriend', onAskFriend);
   listenTo(socket, 'acceptFriend', onAcceptFriend);
   listenTo(socket, 'removeFriend', onRemoveFriend);

};

function listenTo(socket, name, callback) {
   socket.on(name, data => callback(socket, data));
}
