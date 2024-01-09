'use client'

import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
 } from "../ui/card";
 import { Header } from "./Header";
import { Social } from "./Social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
} : CardWrapperProps ) => {
  return (
   <Card className="w-[400px] shadow-md">
    <CardHeader>
      <Header label={headerLabel}/>
    </CardHeader>
    <CardContent >
      {children}
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
    </CardContent>
   </Card>
  )
}
