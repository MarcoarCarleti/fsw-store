"use client";

import {
  MenuIcon,
  ShoppingCartIcon,
  LogInIcon,
  PercentIcon,
  ListOrderedIcon,
  HomeIcon,
  PackageSearchIcon,
  User2,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Link from "next/link";
import Cart from "./cart";
import { useState, useEffect } from "react";
import { Popover, PopoverTrigger } from "./popover";
import { PopoverClose, PopoverContent } from "@radix-ui/react-popover";

export function Header() {
  const { status, data } = useSession();
  const [isWindow, setWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.screen.width >= 1920) {
      setWindow(true);
    }
  }, []);

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogOutClick = async () => {
    await signOut();
  };

  return (
    <Card>
      {isWindow ? (
        <div className="flex items-center justify-between px-24 py-[1.875rem]">
          <Link href={"/"}>
            <h1 className="text-lg font-semibold">
              <span className="text-primary">FSW</span> Store
            </h1>
          </Link>

          <div className="flex items-center gap-4 font-bold">
            <Link href="/">
              <p>Início</p>
            </Link>
            <Link href="/catalog">
              <p className=" before:px-4 before:opacity-20 before:content-['|'] after:px-4 after:opacity-20 after:content-['|']">
                Catalogo
              </p>
            </Link>
            <Link href="/deals">
              <p>Ofertas</p>
            </Link>
          </div>

          <div className="flex gap-7">
            <Popover>
              <PopoverTrigger>
                <Button size="icon" variant="outline">
                  <User2 />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 rounded-lg border border-accent bg-background p-5">
                <div className="flex flex-col gap-2">
                  {status === "unauthenticated" && (
                    <Button
                      onClick={handleLoginClick}
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <LogInIcon size={16} />
                      Fazer Login
                    </Button>
                  )}

                  {status === "authenticated" && data?.user && (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 py-4">
                        <Avatar>
                          <AvatarFallback>
                            {data.user.name?.[0].toUpperCase()}
                          </AvatarFallback>
                          {data.user.image && (
                            <AvatarImage src={data.user.image} />
                          )}
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="font-medium ">{data.user.name}</p>
                          <p className="text-sm opacity-75">Boas Compras!</p>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  )}

                  <PopoverClose>
                    <Link href={"/orders"}>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                      >
                        <PackageSearchIcon size={16} />
                        Meus Pedidos
                      </Button>
                    </Link>
                  </PopoverClose>

                  {status === "authenticated" && (
                    <Button
                      onClick={handleLogOutClick}
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <LogInIcon size={16} />
                      Fazer Logout
                    </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                  <ShoppingCartIcon />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[350px] xl:w-full">
                <Cart />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-[1.875rem]">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader className="text-left text-lg font-semibold">
                Menu
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-3">
                {status === "unauthenticated" && (
                  <Button
                    onClick={handleLoginClick}
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <LogInIcon size={16} />
                    Fazer Login
                  </Button>
                )}
                {status === "authenticated" && data?.user && (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 py-4">
                      <Avatar>
                        <AvatarFallback>
                          {data.user.name?.[0].toUpperCase()}
                        </AvatarFallback>
                        {data.user.image && (
                          <AvatarImage src={data.user.image} />
                        )}
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="font-medium ">{data.user.name}</p>
                        <p className="text-sm opacity-75">Boas Compras!</p>
                      </div>
                    </div>
                    <Separator />
                  </div>
                )}
                <SheetClose asChild>
                  <Link href={"/"}>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <HomeIcon size={16} />
                      Início
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={"/orders"}>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <PackageSearchIcon size={16} />
                      Meus Pedidos
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/deals">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <PercentIcon size={16} />
                      Ofertas
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={"/catalog"}>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <ListOrderedIcon size={16} />
                      Catalogo
                    </Button>
                  </Link>
                </SheetClose>
                {status === "authenticated" && (
                  <Button
                    onClick={handleLogOutClick}
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <LogInIcon size={16} />
                    Fazer Logout
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <Link href={"/"}>
            <h1 className="text-lg font-semibold">
              <span className="text-primary">FSW</span> Store
            </h1>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <ShoppingCartIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[350px] xl:w-full">
              <Cart />
            </SheetContent>
          </Sheet>
        </div>
      )}
    </Card>
  );
}
