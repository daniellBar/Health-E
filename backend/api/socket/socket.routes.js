
module.exports = connectSockets
let msgs=[]

function connectSockets(io) {
    io.on('connection', socket => {
     
        socket.emit('chat history', msgs)
        socket.on('chat newMsg', msg=>{
            msgs.push(msg)
            io.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on('chat topic', topic=>{
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
        })
        socket.on('creatorId', id=>{
            if (socket.creatorId) {
                socket.leave(socket.creatorId)
            }
            socket.join(id)
            socket.creatorId = id;
        })
        socket.on('new purchase', purchaseInfo=>{
            io.to(purchaseInfo.creatorId).emit('show purchase notifiction', purchaseInfo)
        })

    })
}

