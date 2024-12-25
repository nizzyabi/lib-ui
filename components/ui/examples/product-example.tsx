'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { Icons } from "../icons/icons";

export function ProductPayment() {

  const productBenefits = [
    "Beginner-friendly setup",
    "Up-to-date libraries",
    "Frontend & backend code",
    "Customizable components",
    "Access to our full library",
    "24/7 customer support",
    "Discord community",
    "No hidden fees",
  ];

  return (
    <Card className="w-full shadow-md shadow-primary/20">
      <CardHeader>
        <CardTitle>Payment method</CardTitle>
        <CardDescription>
          Checkout & pay for our product.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {productBenefits.map((benefit) => (
          <div key={benefit} className="flex items-center gap-3">
            <Icons.check className="w-4 h-4 opacity-50" />
            <p className="text-md font-medium text-sm">{benefit}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Link href="https://buy.stripe.com/test_7sIeYx3w76294h2dQQ" className="w-full">
          <Button className="w-full">Pay</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
