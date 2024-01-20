"use client"
import React, { useEffect, useState } from 'react';
import { verifyUser } from '@/services/userService';
import { Card, CircularProgress } from '@nextui-org/react';
import { BiCheckCircle, BiErrorCircle  } from "react-icons/bi";

export default function EmailVerificationPage() {
  const [verificationStatus, setVerificationStatus] = useState('Verificando...');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const encryptedId = queryParams.get('id');

    if (encryptedId) {
      verifyUser(encryptedId as string)
        .then(() => {
          setVerificationStatus('Email successfully verified.');
          setIsLoading(false);
        })
        .catch(() => {
          setVerificationStatus('Email verification error.');
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <div className="w-full flex justify-center">
      <Card className="sm:w-full md:w-1/2 py-4">
          <div className="flex flex-col items-center justify-center ">
            {isLoading ? (
              <CircularProgress size="lg" />
            ) : (
              <>
                {verificationStatus === 'Email successfully verified.' ? (
                  <BiCheckCircle size="60px" />
                ) : (
                  <BiErrorCircle color="red" size="60px" />
                )}
                <h2 className="">{verificationStatus}</h2>
              </>
            )}
          </div>
      </Card>
    </div>
  );
}
