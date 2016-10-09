'use strict';

const onMessage = require('./message/message');
const onAskFriend = require('./friends/ask');
const onAcceptFriend = require('./friends/accept');
const onRefuseFriend = require('./friends/refuse');
const onRemoveFriend = require('./friends/remove');
const onGetFriends = require('./friends/get');

module.exports = (socket) => {
   
   // message
   listenTo(socket, 'message', onMessage);

   // friends
   listenTo(socket, 'getFriends', onGetFriends);
   listenTo(socket, 'askFriend', onAskFriend);
   listenTo(socket, 'acceptFriend', onAcceptFriend);
   listenTo(socket, 'refuseFriend', onRefuseFriend);
   listenTo(socket, 'removeFriend', onRemoveFriend);

};

function listenTo(socket, name, callback) {
   socket.on(name, data => callback(socket, data));
}
