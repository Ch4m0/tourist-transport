"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { useQuery } from "react-query";
import axios from "axios";

export default function Home() {
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    axios
      .get("http://localhost:1337/api/destinations?populate=*")
      .then((res) => res.data)
  );

  if (isLoading) return "Loading...";

  const destinations = data.data;

  if (error) return "An error has occurred: ";

  const truncateString = (str: string, num: number) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
        {destinations.map((destination, idx) => {
          return (
            <Card
              isFooterBlurred
              className="col-span-12 sm:col-span-4 h-[300px]"
              key={idx}
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  Santa Marta
                </p>
                <h4 className="text-white/90 font-medium text-xl">
                  {destination.attributes.titulo}
                </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 w-full h-full object-cover"
                src={destination.attributes.imagen.data.attributes.url}
              />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <Image
                    alt="Breathing app icon"
                    className="rounded-full w-10 h-11 bg-black"
                    src="/card-example-5.jpeg"
                  />
                  <div className="flex flex-col">
                    <p className="text-tiny  truncate text-white/60">
                      {truncateString(destination.attributes.descripcion, 40)}
                    </p>
                  </div>
                </div>
                <Button radius="full" size="sm">
                  Cotiza con nosotros
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
