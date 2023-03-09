let sockets = []
let  person_1 = []
let person_2 = []
import { Server } from 'socket.io'

export default async function handler(req, res){
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io
  

    

   
    
    io.on('connection',  (socket) => {
      let rooms = Array.from(socket.rooms) 
      sockets.push(rooms[0])
      console.log(sockets)
      socket.on('check', async (id)=>{
        if(sockets.length%2 !== 0){
          person_1.push(id)
          console.log('wait...')
        }else{
          console.log('ok')
          socket.to(person_1[0]).emit('person_1', id)
          person_2.push(id)
          console.log('person 1 :', person_1[0] , 'person 2:',person_2[0])
          console.log(person_1)
          sockets.length = sockets.length - 2 
          person_1.shift()
          console.log(sockets)
        }

        socket.on('person_2' , (id)=>{
          socket.to(person_2[0]).emit('info',id)
          person_2.shift()
        })   
      })
      socket.on('input-change',   (msg, id) => {
          socket.to(id).emit('update-input', msg)        
          console.log(id)
          console.log(sockets)    
      })
    })
  }
  res.end()
}