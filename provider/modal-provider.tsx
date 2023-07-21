"use client";

import LoginForm from "@/app/login/components/login-form";
import { useEffect, useState } from "react";


const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return ( 
    <>
      <LoginForm />
    </>
   );
}
 
export default ModalProvider;