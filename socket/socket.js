'use strict';

const onMessage = require('./message/message');
const onAddFriend = require('./friends/add');
const onRemoveFriend = require('./friends/remove');
const onGetFriends = require('./friends/get');

module.exports = (socket) => {
   listenTo(socket, 'message', onMessage);
   listenTo(socket, 'addFriend', onAddFriend);
   listenTo(socket, 'removeFriend', onRemoveFriend);
   listenTo(socket, 'getFriends', onGetFriends);
};

function listenTo(socket, name, callback) {
   socket.on(name, data => callback(socket, data));
}
