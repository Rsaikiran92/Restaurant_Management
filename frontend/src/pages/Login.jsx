// import { useState } from "react";
// import API from "../utils/api";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await API.post("/auth/login", form);

//       const { token, user } = res.data;

//       // store token & role
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", user.role);

//       // redirect based on role
//       if (user.role === "admin") navigate("/admin");
//       else if (user.role === "waiter") navigate("/waiter");
//       else if (user.role === "kitchen") navigate("/kitchen");
//       else if (user.role === "frontdesk") navigate("/frontdesk");

//     } catch (err) {
//       alert(err.response?.data?.msg || "Login failed");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Login</h2>

//       <input
//         placeholder="Email"
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />
//       <br /><br />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//       />
//       <br /><br />

//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;

import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  VStack,
  InputGroup,

//   useToast,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
//   const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

    //   toast({
    //     title: "Login Successful",
    //     status: "success",
    //     duration: 2000,
    //   });

      if (user.role === "admin") navigate("/admin");
      else if (user.role === "waiter") navigate("/waiter");
      else if (user.role === "kitchen") navigate("/kitchen");
      else navigate("/frontdesk");

    } catch (err) {
      toast({
        title: err.response?.data?.msg || "Login Failed",
        status: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, purple.500, blue.500)"
    >
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        bg="whiteAlpha.200"
        backdropFilter="blur(20px)"
        p={10}
        rounded="2xl"
        boxShadow="xl"
        w="350px"
      >
        <VStack spacing={5}>
          <Heading color="white">Welcome Back 👋</Heading>
          <Text color="gray.200">Login to your account</Text>

          <InputGroup>
            {/* <InputLeftElement children={<FaEnvelope />} color="white" /> */}
            <Input
              placeholder="Email"
            
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </InputGroup>

          <InputGroup>
            {/* <InputLeftElement children={<FaLock />} color="white" /> */}
            <Input
              type="password"
              placeholder="Password"
              
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </InputGroup>

          <Button
            w="full"
            colorScheme="teal"
            onClick={handleLogin}
            _hover={{ transform: "scale(1.05)" }}
          >
            Login
          </Button>
        </VStack>
      </MotionBox>
    </Box>
  );
};

export default Login;