import { useState } from "react";
import { Link } from "react-router-dom";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

import { CertificateCard } from "entities/certificate";
import { ProviderItem } from "entities/provider";
import { Avatar } from "entities/provider/ui/avatar";
import { GenerateCertificateModal } from "features/generate-certificate";
import { Footer } from "pages/ui/footer";
import { Header } from "pages/ui/header";
import { useUniswapAuthMutation } from "shared/api";
import { useGetUserQuery } from "shared/api/getUserQuery";
import { useHolderCommitment } from "shared/providers/holder-commitment-guard";
import { Breadcrumbs } from "shared/ui/breadcrumbs";
import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";

export const Uniswap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isConnected } = useAccount();
  const uniswapAuthMutation = useUniswapAuthMutation();
  const userData = useGetUserQuery();
  const user = Boolean(userData.data);

  const { connect } = useConnect({
    mutation: {
      onSuccess: () => {
        uniswapAuthMutation.mutate();
      },
    },
  });
  const { disconnect } = useDisconnect();
  const { holderCommitment, encryptionPubKey } = useHolderCommitment();

  const handleConnectAccountClick = () => {
    connect({
      connector: injected({ target: "metaMask" }),
    });
  };

  return (
    <>
      <div className="flex grow flex-col px-28 pt-[18px]">
        <Header buttonClassName="inner-border inner-border-athensGray" />
        <Breadcrumbs className="mt-[50px]">
          <Breadcrumbs.Item>
            <Link
              className="flex items-center gap-x-2 font-light text-fiord outline-none transition-colors hover:text-fiord/50 focus:text-fiord/50"
              to="/"
            >
              <Icon name="app" /> Apps
            </Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Item isActive>Uniswap</Breadcrumbs.Item>
        </Breadcrumbs>

        <hr className="mt-2.5 text-athensGray" />

        <div className="mt-8 flex items-center justify-between">
          <ProviderItem provider="uniswap" />
          {isConnected && user ? (
            <>
              <Button
                className="py-2.5 text-sm font-semibold"
                onClick={() => setIsModalOpen(true)}
              >
                Generate certificate
              </Button>
              {/* <Button */}
              {/*   className="py-2.5 text-sm font-semibold" */}
              {/*   onClick={() => disconnect()} */}
              {/* > */}
              {/*   Disconnect */}
              {/* </Button> */}
            </>
          ) : (
            <Button
              className="py-2.5 text-sm font-semibold"
              onClick={handleConnectAccountClick}
            >
              Connect Account
            </Button>
          )}
        </div>

        <div className="my-8 flex items-start gap-x-8">
          <div className="basis-[93%] pr-28">
            <hr className="text-athensGray" />
            <h2 className="mt-6 text-lg font-semibold leading-7">
              About the Certificate
            </h2>

            <p className="mt-3 font-light text-fiord">
              The Uniswap zkCertificate, issued on the Galactica blockchain,
              enables you to verify and showcase your DeFi trading activity
              while preserving your anonymity. This allows DApps to personalize
              services, provide access to exclusive liquidity pools, and enhance
              user reputation systems.
            </p>
            <div className="mt-8 rounded-lg bg-[#F9FAFB] p-4 text-oxfordBlue">
              The process to issue your certificate is swift: connect your
              wallet, let our platform analyze your on-chain activity, and
              upload the generated file to Galactica to complete verification.
            </div>

            <div className="mt-8 flex gap-x-5">
              <CertificateCard
                avatar={<Avatar onlyImage provider="uniswap" />}
                className="h-[186px] max-w-[350px] basis-1/2 bg-gradient-to-tr from-[#ffe8f7] to-[#f538d0] text-black/60"
                issueDate="02/23"
                title="Uniswap zkCertificate"
              />
            </div>

            <h3 className="mt-8 font-medium leading-6">Privacy</h3>

            <p className="mt-4 font-medium leading-6 text-fiord">
              Your data privacy is paramount. The zkCertificate will be stored
              on the blockchain in the form of a Merkle tree, ensuring that your
              DeFi trading information remains encrypted and undisclosed. You
              decide if and when to disclose any part of your verified activity.
              Secure your DeFi presence and maintain your privacy.
            </p>
          </div>

          {/* INFO */}
          <div className="rounded-[10px] border border-athensGray px-6 py-5">
            <h3 className="leading-6">Uniswap zkCertificate</h3>
            <p className="mt-3 font-light text-fiord">
              The following fields will be fetched to verify your account
              attributes:
            </p>
            <br />
            <ul className="flex list-disc flex-col pl-4 font-light text-fiord">
              <li>Wallet address</li>
              <li>History of swaps</li>
            </ul>
          </div>
        </div>

        <Footer className="mt-auto" />
      </div>
      {isModalOpen && (
        <GenerateCertificateModal
          encryptionPubKey={encryptionPubKey}
          holderCommitment={holderCommitment}
          onClose={setIsModalOpen}
        />
      )}
    </>
  );
};
