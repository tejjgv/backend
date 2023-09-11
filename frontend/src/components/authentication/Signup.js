// import { React, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState();
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [confirmpassword, setConfirmpassword] = useState();
//   const submitHandler = async () => {
//     if (!name || !email || !password || !confirmpassword) {
//       alert("Please fill all the fields");
//       return;
//     }

//     if (password !== confirmpassword) {
//       alert("Psswords do not match, please confirm the password carefully");
//       return;
//     }

//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };

//       const { data } = await axios.post(
//         "http://localhost:5000/user",
//         { name, email, password },
//         config
//       );

//       alert("Registration Successful✅");

//       localStorage.setItem("userInfo", JSON.stringify(data));

//       navigate("/main");
//       window.location.reload();
//     } catch (error) {
//       console.log(error.response.data.message);
//       alert("Error ocurrred in registering the user⚠️");
//     }
//   };

//   return (
//     <>
//       <form>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter your name"
//             onChange={(e) => {
//               setName(e.target.value);
//             }}
//             autoComplete="off"
//           />
//         </label>
//         <br />
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//             autoComplete="off"
//           />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter a password"
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//             autoComplete="off"
//           />
//         </label>
//         <br />
//         <label>
//           Confirm Password:
//           <input
//             type="password"
//             name="confirmpassword"
//             placeholder="Confirm the password"
//             onChange={(e) => {
//               setConfirmpassword(e.target.value);
//             }}
//             autoComplete="off"
//           />
//         </label>
//         <br />
//         <button onClick={submitHandler}>Register</button>
//       </form>
//     </>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/user",
        { name, email, password },
        config
      );

      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      navigate("/main", { replace: true });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          autoComplete="off"
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          autoComplete="off"
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="off"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Your Password"
            onChange={(e) => {
              setConfirmpassword(e.target.value);
            }}
            autoComplete="off"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 17, marginBottom: 4 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
