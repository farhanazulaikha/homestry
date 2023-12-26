import React, {useState, useEffect, useContext} from "react";
import { ChatEngine, getOrCreateChat, createChatUser } from 'react-chat-engine';
import {Button} from 'react-bootstrap';
import { UserContext } from "./../Helper/Context";
import Axios from 'axios';
// import ScrollToBottom from "react-scroll-to-bottom";

function Chat() {

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const[loading,setLoading]=useState(true);

  const { userId, setUserId } = useContext(UserContext);

  // let newUsers = [];
  // let failedUsers = [];
  // const users = setUserList();

  // users.map(user => {
  //   response = createChatUser(user);
  //   if (response.status_code === 201) {
  //     newUsers.push(response.data);
  //   } else {
  //     failedUsers.push(response.data);
  //   }
  // });

    // function createDirectChat(creds) {
    //   getOrCreateChat(
    //     creds,
    //     { is_direct_chat: true, usernames: [userList] },
    //     () => setUserList('')
    //   )
    // }
  
  
    // function renderChatForm(creds) {
    //   return (
    //     <div>
    //       <input
    //         placeholder='Email' 
    //         value={userList.userEmail}
    //         onChange={(e) => setUserList(e.target.value)} 
    //       />
           
    //       <Button onClick={() => createDirectChat(creds)}>
    //         Create
    //       </Button>
    //     </div>
    //   )
    // }

    useEffect(()=>{

      Axios.get(`http://localhost:8800/profile/${userId}`,{
          id: userId,
      })
      .then((res) => {
          
          setUserEmail(res.data.userEmail);
          setUserPassword(res.data.userPassword);


          Axios.get('https://api.chatengine.io/users/',{
            headers:{
                "project-id":"365e3a30-1188-4d04-a654-f17aad978e5d",
                "user-name":userEmail,
                "user-secret":userPassword,
            }
        })
        .then(()=>{
          setLoading(false);
       })
       .catch(()=>{
           let formdata=new FormData();
           formdata.append('username',userEmail);
           formdata.append('secret',userPassword);


               Axios.post('https://api.chatengine.io/users/',
               formdata,
               {headers:{"private-key":"365e3a30-1188-4d04-a654-f17aad978e5d"}}
               ).then(()=>setLoading(false))
               .catch(error => console.log(error))
           
       })
      })
  })

  return (
    <div>
			<ChatEngine
			projectID='365e3a30-1188-4d04-a654-f17aad978e5d'
			userName={userEmail}
			userSecret={userPassword}
      // renderNewChatForm={(creds) => renderChatForm(creds)}
		/>
		</div>
  )
}

export default Chat;