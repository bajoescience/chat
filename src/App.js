import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useMatch, useNavigate } from "react-router-dom";
import userService from './services/user'
import messageService from './services/messages'
import helper from './helper/helper'



const App = (props) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedUser')) ||null)
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState(null)
    const navigate = useNavigate()

    const match = useMatch('chat')

    useEffect(() => {
      // This conditional statement checks if 
    // Route strictly matches '/chat' route
    // So as not to allow the conditional statement
    // To extend to children routes
    if (match) {
      if (user) {
        navigate('room')
      } else {
        navigate('auth')
      }
    }
    }, [user])

    useEffect(() => {
      const getContacts = async () => {
        const users = await userService.getAll()

        // Filter user out of contacts
        // user cannot be it's own contact
        const fetchedContacts = users.filter(contact => contact.id !== user?.id)

        // Clear out password
        setContacts(fetchedContacts.map(contact => {
          return ({...contact, password: undefined})
        }))
      }
      getContacts()
    }, [user])

    // Create a new message
  const createMessage = async (msg, person) => {
    if (!msg.string && !msg.files) {
      return
    }

    // BUG ALERT TODO: it is not only one side that can create messages
    const messageObject = {
      string: msg.string,
      files: msg.files,
      sender: user.username,
      receiver: person.username,
    }
      try {
        const message = await messageService.createMessage(messageObject)
        setMessages(messages.concat(message))
      } catch(e) {
        console.error(e.message);
      }
  }

    const logOut = () => {
      localStorage.removeItem('loggedUser')
      setUser(null)
    }

    const getUserDetails = async (userObj) => {
      try {
        messageService.setToken(userObj.user.token)
        const contactss = await userService.getContactsOnLogin(userObj.user.username)
        setContacts(contactss)
      } catch(e) {
        console.error(e);
      }
    }

    const context = {
      userState: {
        user, setUser
      },
      contactState: {
        contacts, setContacts
      },
      messagesState: {
        messages, setMessages
      },
      logOut,
      getUserDetails,
      createMessage,
    }

    return (
      <>
        <Outlet context={context} />
      </>
    )
}

export default App