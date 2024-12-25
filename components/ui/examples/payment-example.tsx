"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export function Payment() {
  const [cardNumber, setCardNumber] = useState("4520 3678 9001 4300");
  const [name, setName] = useState("Tyler Durden");
  const [expires, setExpires] = useState("11/26");
  const [cvc, setCvc] = useState("220");
  const [zip, setZip] = useState("75201");

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 4) {
      value = value.substr(0, 4);
    }

    if (value.length >= 2) {
      value = value.substr(0, 2) + "/" + value.substr(2);
    }

    setExpires(value);
  };

  return (
    <Card className="w-full shadow-md shadow-primary/20">
      <CardHeader>
        <CardTitle>Payment method</CardTitle>
        <CardDescription>Pay for our product bellow.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tyler Durden"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="number">Card number</Label>
          <Input
            id="number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="4520 3678 9001 4300"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="expires">Expires</Label>
            <Input
              id="expires"
              placeholder="MM/YY"
              value={expires}
              onChange={handleExpiryChange}
              maxLength={5}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input
              id="cvc"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="220"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="zip">Zip Code</Label>
            <Input
              id="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="75201"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href="https://buy.stripe.com/test_7sIeYx3w76294h2dQQ"
          className="w-full"
        >
          <Button className="w-full">Continue</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
