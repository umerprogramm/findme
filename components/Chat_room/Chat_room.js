import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Loader from './Loader'
import io from 'socket.io-client'
let socket;


export default function Chat_room() {
  const [data , setData] = useState([])
  const [input, setInput] = useState('')
  const [ reciever , setreciever ] = useState('')
  const [connected , setconnected] = useState(false)
  const [ swicth , setSwicth] = useState(false)
    useEffect(() => {
    const socketInitializer = async () => {
       
      await fetch('/api/server');
       socket = io()
  
       socket.on('connect', () => {
        console.log('connected')
      })
      setTimeout(  () => {
      socket.on('person_1' , (id)=>{
        setreciever(id)
        setconnected(true)
        socket.emit('person_2' , socket.id)
      })
    }, 5000);
    socket.on('info',(id)=>{
      setreciever(id)
      setconnected(true)
    })
      socket.on('update-input',(msg)=>{
        let div = document.querySelector(".msg")
        let span = document.createElement("span")
        let text = document.createTextNode(`Stranger:${msg}`)
        span.appendChild(text)
        div.appendChild(span)
        span.style.display = 'flex'
        span.style.flexDirection = 'column'
   
      })
     
      setTimeout(  () => {
        socket.emit('check', socket.id)
        console.log('Hello')
    }, 3000);

    }
    socketInitializer();
   
  },[])


  const Message_sender = ()=>{
  if(input === '') {
    alert('type something')
  }else{
    socket.emit('input-change',input, reciever , "stranger")
    console.log(socket.id)
    setInput('')
    setSwicth(false)
    let div = document.querySelector(".msg")
    let span = document.createElement("span")
    let text = document.createTextNode(`you:${input}`)
    span.appendChild(text)
    div.appendChild(span)
    span.style.display = 'flex'
    span.style.flexDirection = 'column'


  }
    
  }
  const onChangeHandler = (e) => {
    setInput(e.target.value)
  }
  return (
    <>
    <Navbar/>
      
    <main className='chat_room'>
{ connected === false ?     
<div className='loader'>
       <Loader/>
      <h1>connecting to the Server</h1>

      </div>:
      <div style={{display : 'none'}} className='loader'>

     </div>
      }
     
         

        <>
        <div className='msg'>

      <hr/>
        </div>
       
      </>
        
      <div className='input'>
        <input
      placeholder={connected? "type something" : "connecting..."}
      value={input}
      onChange={onChangeHandler}
    />
    <button onClick={Message_sender}>send</button>
      </div>
    </main>
    </>
    
  )
}
