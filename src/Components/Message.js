import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './Message.css'

const Message = ({ username, text }) => {
  const isUser = username === text.username;
  
  return (
    <div  className={`mssg ${isUser && 'msg__user'}`}>
      <Card className={isUser ? 'msg__userCard' : 'msg__guestCard'}>
        <CardContent>
          <Typography
            color="white"
            variant="h5"
            component="h2">
            {!isUser && `${text.username || "Unknown User"} : `} {text.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
    )
}

export default Message
