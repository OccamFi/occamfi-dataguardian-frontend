import { Link } from "react-router-dom";

import { twMerge } from "tailwind-merge";

import { Provider, ProviderCard, providers } from "entities/provider";
import { Footer } from "pages/ui/footer";
import { Header } from "pages/ui/header";
import { Button } from "shared/ui/button";

import bg from "./assets/bg.jpg";
import { Hero } from "./ui/hero";

export const Home = () => {
  return (
    <div
      className="relative flex min-h-full grow flex-col bg-[length:100%] bg-top bg-no-repeat px-28 pt-[18px]"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <Header />
      <Hero className="mt-[118px]" />

      <h2 className="mb-6 mt-[136px] text-4xl font-semibold leading-[44px] tracking-tight">
        Connect your Account
      </h2>
      <div
        className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
      >
        {Object.entries(providers).map(([provider, data]) => {
          const disabled = !data.link;
          const link = data.link;

          return (
            <ProviderCard
              className="place-self-stretch"
              footer={
                <Button
                  as={Link}
                  className={twMerge(
                    "w-full text-sm",
                    disabled && "inner-border inner-border-athensGray"
                  )}
                  disabled={disabled}
                  theme={disabled ? "white" : "dodgerBlue"}
                  to={link}
                >
                  {disabled ? "Coming soon" : "Get started"}
                </Button>
              }
              key={provider}
              provider={provider as Provider}
            />
          );
        })}
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};
