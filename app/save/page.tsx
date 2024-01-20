"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card } from "@nextui-org/card";
import { Select, SelectItem } from "@nextui-org/select";
import { title } from "@/components/primitives";


export default function SavePage() {
  const [amount, setAmount] = useState<string>('150');
  const [duration, setDuration] = useState<string>('6');
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    calculateTotal(amount, duration);
  }, [amount, duration])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDuration = e.target.value;
    setDuration(newDuration);
    calculateTotal(amount, newDuration);
  };

  const calculateTotal = (amount: string, duration: string) => {
    const totalAmount = amount && duration ? parseFloat(amount) * parseInt(duration) : 0;
    setTotal(totalAmount);
  };

  return (
    <Card 
      className="w-full max-w-md p-4 shadow-md rounded-xl text-white border-none bg-background/60 dark:bg-default-100/10 "
      isBlurred
      shadow="sm"
      >
      <div className="flex justify-center">
        <h1 className={title() + " text-center"}>Create a new&nbsp;</h1>
        <h1 className={title({ color: "violet" }) + " text-center"}>plan&nbsp;</h1>
      </div>
      <div className="mb-4 mt-8">
        <Input
          fullWidth
          size="lg"
          label="Monthly USDT Amount"
          placeholder="Monthly USDT Amount"
          variant="bordered"
          value={amount}
          onChange={(e) => handleAmountChange(e)}
        />
      </div>
        <Select
          fullWidth
          variant="bordered"
					label="Duration (Months)"
					placeholder="Select duration"
					defaultSelectedKeys={["6"]}
          onChange={(value) => handleDurationChange(value)}
        >
					<SelectItem key={6} value={6}>6</SelectItem>
					<SelectItem key={12} value={12}>12</SelectItem>
        </Select>
      <div className="mb-4 mt-8 flex justify-between ">
        <p className="text-left text-default-500">You will save:</p>
        <div>
          <p className="text-right text-default-500"><strong> {total} USDT</strong></p>
          <p className="text-right text-default-500">+ profits</p>
        </div>
      </div>
      <Button
        fullWidth
        color="primary"
        disabled
        onClick={() => {}}
      >
        Coming soon
      </Button>
    </Card>
  );
}
