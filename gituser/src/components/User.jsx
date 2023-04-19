import { Button, FormControl, FormLabel, Heading, Input,   Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Text,
  Box, } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

const User = () => {

  const [username,setusername]=useState("");
  const [data,setdata]=useState({});
  const { isOpen, onOpen, onClose } = useDisclosure()

const submit=async()=>{
        
  if(username!==""){

      try{

          let res=await fetch(`https://api.github.com/users/${username}`);
          res= await res.json();
          setdata(res)
          onOpen();

      }
      catch(err){
          console.log(err);
      }
  }
  }
       console.log(data);
return (
  <div>

<FormControl width="40%" margin="auto" p={10} lineHeight="50px">
<Heading>Enter username</Heading>
<Input type='text' value={username} onChange={(e)=>setusername(e.target.value)}/>

  <Button onClick={submit}>Submit</Button>
</FormControl>

<Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User information</ModalHeader>
        <ModalCloseButton />
        { data.login && 
        <ModalBody p={5}>
           <Image src={data.avatar_url} width="50%" margin="auto" borderRadius="20px" alt="avatar"/>
           <Box width="70%" margin="auto" p={4}>
           <Text><b>Username:</b>  {data.login}</Text>
           <Text><b>Name:</b>  {data.name}</Text>
           <Text><b>Public repos:</b>  {data.public_repos }</Text>
           <Text><b>Public gists:</b>  {data.public_gists }</Text>
           <Text><b>Profile created at:</b>  {new Date(data.created_at).toISOString().slice(0, 10)}</Text>
           </Box>
           

        </ModalBody>
       }
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          
        </ModalFooter>
      </ModalContent>
    </Modal>

  </div>
)
}

export default User