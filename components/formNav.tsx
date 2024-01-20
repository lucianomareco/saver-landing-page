"use client"
import React, { useState } from "react";
import { CircularProgress, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import { MailIcon } from './MailIcon';
import confetti from 'canvas-confetti';
import { createUser } from "@/services/userService";
import {
	HeartFilledIcon,
} from "@/components/icons";

export default function FormNav() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [profession, setProfession] = useState('');
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [emailValidationTimer, setEmailValidationTimer] = useState<NodeJS.Timeout | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isLoading, setLoading] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e:any) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (emailValidationTimer) clearTimeout(emailValidationTimer);

    const timer = setTimeout(() => {
      setIsInvalidEmail(!validateEmail(newEmail));
    }, 1000);

    setEmailValidationTimer(timer);
  };

  const handleUsernameChange = (e: any) => setUsername(e.target.value);
  const handleProfessionChange = (value: any) =>{
    setProfession(value.target.value);
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const formData = { email, username, profession };
      if (!email || !profession || isInvalidEmail) {
        setSubmitAttempted(true);
        console.error("Please fill in all required fields.");
        setLoading(false)
        return;
      }
        setSubmitAttempted(false);
        await createUser({email, profession, username})
        console.log("Form submitted successfully");
        confetti({});
        onOpenChange()
        setLoading(false)
    } catch (error) {
      console.error('Error submitting form:', error);
      setLoading(false)
    }
  };

  return (
    <>
  		<Button
	  		className="text-sm font-normal text-default-600 bg-default-100"
		  	startContent={<HeartFilledIcon className="text-danger" />}
			  variant="flat"
        onPress={onOpen}
			>
				Join our waitlist
			</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">Join our waitlist</ModalHeader>
              <ModalBody>
                <p>Sign up for our waitlist to be the first to access our latest features.</p>
                <div className="flex flex-col gap-4">
                  <Input
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    isInvalid={isInvalidEmail}
                    errorMessage={isInvalidEmail ? "Please enter a valid email" : ''}
                    value={email}
                    onChange={handleEmailChange}
                    startContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                  />
                  <Input
                    label="X"
                    fullWidth
                    placeholder="SaverProtocol"
                    labelPlacement="outside"
                    value={username}
                    onChange={handleUsernameChange}
                    startContent={<div className="pointer-events-none flex items-center"><span className="text-default-400 text-small">@</span></div>}
                  />
                  <Select 
                    fullWidth
                    label="I am a..."
                    labelPlacement="outside"
                    placeholder="Select your role"
                    value={profession}
                    onChange={handleProfessionChange}
                  >
                    <SelectItem key={"Dev"} value="Developer">Developer</SelectItem>
                    <SelectItem key={"Degen"} value="Degen">Degen</SelectItem>
                    <SelectItem key={"Other"} value="Other">Other</SelectItem>
                  </Select>
                  {submitAttempted && (!email || !profession) && (
                    <p className={"text-danger-400"}>
                      Both Email and Role are required.
                    </p>
                  )}
                  </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleSubmit}>
                  {isLoading ? <CircularProgress /> : "Join"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
