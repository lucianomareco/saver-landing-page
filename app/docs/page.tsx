import React from 'react';
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { title } from "@/components/primitives";
import "./styles.css"

export default function SavingsPlanPage() {
  const payments = [
    { month: 'January', amount: 150, paid: true },
    { month: 'February', amount: 150, paid: true },
    { month: 'March', amount: 150, paid: false },
    { month: 'April', amount: 150, paid: false },
    { month: 'May', amount: 150, paid: false },
    { month: 'June', amount: 150, paid: false },
  ];

  return (
    <div>
			<h1 className={title({ color: "violet" })}>Track</h1>
      <h1 className={title({fullWidth: true})}>my savings</h1>
			<div className="flex justify-between items-center mt-8">
				<h2 className="w-100 font-bold text-xl mt-2 mb-4 text-default-500">Overview of Your Savings Plan</h2>
				<Button disabled>
					Claim Savings
				</Button>  
			</div>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
				<Card className="border-none bg-background/60 dark:bg-default-100/30" shadow="sm" isBlurred>
					<CardBody>
						<p className="text-3xl">2/6</p>
						<p>Paid Installments</p>
					</CardBody>
				</Card>
				<Card className="border-none bg-background/60 dark:bg-default-100/30" shadow="sm" isBlurred>
					<CardBody>
						<p className="text-3xl">300</p>
						<p>Current Savings [USDT]</p>
					</CardBody>
				</Card>
				<Card className="border-none bg-background/60 dark:bg-default-100/30" shadow="sm" isBlurred>
					<CardBody>
						<p className="text-3xl">900</p>
						<p>You will receive a minimum of [USDT]</p>
					</CardBody>
				</Card>
				<Card className="border-none bg-background/60 dark:bg-default-100/30" shadow="sm" isBlurred>
					<CardBody>
						<p className="text-3xl">21</p>
						<p>Next expiration [Days]</p>
					</CardBody>
				</Card>
				{/* Repite para las otras categorías: Paid Installments, Current Savings, etc. */}
			</div>
      {/* Sección de Visualización de Cuotas */}
      <h2 className="w-100 font-bold text-xl mt-2 mb-4 text-default-500 mt-8 text-left">Monthly Installment Status</h2>
			<div className="flex flex-wrap gap-3">
				{payments.map((payment, index) => (
					<Card key={index} isFooterBlurred className="flex-grow flex-shrink min-w-[150px] max-w-[200px] h-[300px]">
						<CardHeader className="absolute z-10 top-1 flex-col items-start">
							<p className="text-tiny text-white/60 uppercase font-bold">{payment.month}</p>
							<h4 className="text-white/90 font-medium text-xl">{payment.paid ? 'Paid' : 'Pending'}: {payment.amount} USDT</h4>
						</CardHeader>
						<div className={"flex flex-col justify-center items-center h-full bg-gradient-to-r" + (payment.paid ? " from-purple-500 to-pink-500" : " from-default-100 to-default-200")}>
							<div className="text-4xl font-bold text-white">
								{index + 1}/{payments.length}
							</div>
							<div className="text-white/80">Installment</div>
						</div>
						<CardFooter className="absolute bottom-0 left-0 w-full bg-black bg-opacity-40 flex justify-end">
							{payment.paid ? (
								<Button className="text-tiny" color="primary" radius="full" size="sm">View Transaction</Button>
							) : (index === payments.findIndex(p => !p.paid) && (
								<Button className="text-tiny" color="primary" radius="full" size="sm">Pay</Button>
							))}
						</CardFooter>
					</Card>
				))}
      </div>
    </div>
  );
}

