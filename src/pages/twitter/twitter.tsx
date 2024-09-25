import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useLocalStorage } from "@uidotdev/usehooks";
import { useUnit } from "effector-react";

import { CertificateCard } from "entities/certificate";
import { ProviderItem } from "entities/provider";
import { Avatar } from "entities/provider/ui/avatar";
import { GenerateCertificateModal } from "features/generate-certificate";
import { $$certificateModel } from "features/generate-certificate/model";
import { Footer } from "pages/ui/footer";
import { Header } from "pages/ui/header";
import { useHolderCommitment } from "shared/providers/holder-commitment-guard";
import { Breadcrumbs } from "shared/ui/breadcrumbs";
import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";

import { $$twitterModel } from "./model";

export const Twitter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasClicked, setHasClicked] = useLocalStorage("hasClicked", false);
  const user = useUnit($$twitterModel.$user);

  useEffect(() => {
    $$certificateModel.setCertificateType("twitter");

    if (user && !hasClicked) {
      setIsModalOpen(true);
      setHasClicked(true);
    }
  }, [user, hasClicked, setHasClicked]);

  const { holderCommitment, encryptionPubKey } = useHolderCommitment();

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
          <Breadcrumbs.Item isActive>X.com (Twitter)</Breadcrumbs.Item>
        </Breadcrumbs>

        <hr className="mt-2.5 text-athensGray" />

        <div className="mt-8 flex items-center justify-between">
          <ProviderItem provider="twitter" />
          {user ? (
            <Button
              className="py-2.5 text-sm font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              Generate certificate
            </Button>
          ) : (
            <Button
              as={Link}
              className="py-2.5 text-sm font-semibold"
              to={import.meta.env.VITE_AUTH_URL}
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
              Twitter zkCertificate issued on Galactica blockchain allows you to
              verify and showcase your valuable social metrics while preserving
              your anonymity. This allows DApps to tailor experiences,
              facilitate targeted services, and enhance user verification
              processes.
            </p>
            <div className="mt-8 rounded-lg bg-[#F9FAFB] p-4 text-oxfordBlue">
              The process to issue your Certificate is swift: authenticate, let
              our platform generate your secret file, and then upload it to
              Galactica to complete verification.
            </div>

            {/* // background: linear-gradient(45deg, #5D5D5D 0%, #1B1B1B 100%); */}
            <div className="mt-8 flex gap-x-5">
              <CertificateCard
                avatar={<Avatar onlyImage provider="twitter" />}
                className="h-[186px] max-w-[350px] basis-1/2 bg-black bg-gradient-to-tr from-[#5D5D5D] to-[#1B1B1B]"
                issueDate="02/24"
                title="X.com Certificate"
              />
              {/* background: linear-gradient(45deg, #9DD7F5 0%, #47ACDF 100%);
               */}
              <CertificateCard
                avatar={<Avatar onlyImage provider="twitter" />}
                className="h-[186px] max-w-[350px] basis-1/2 bg-black bg-gradient-to-tr from-[#9DD7F5] to-[#47ACDF]"
                issueDate="02/23"
                title="Twitter Certificate"
              />
            </div>

            <h3 className="mt-8 font-medium leading-6">Privacy</h3>

            <p className="mt-4 font-medium leading-6 text-fiord">
              Your data privacy is paramount. The zkCertificate will be stored
              on a blockchain in the form of Merkle tree that ensures your
              Twitter information remains encrypted and undisclosed. You decide
              if and when to disclose any part of your verified identity. Secure
              your digital presence and embrace true privacy.
            </p>
          </div>

          {/* INFO */}
          <div className="rounded-[10px] border border-athensGray px-6 py-5">
            <h3 className="leading-6">Twitter zkCertificate</h3>
            <p className="mt-3 font-light text-fiord">
              The following fields will be fetched to verify your account
              attributes:
            </p>
            <br />
            <ul className="flex list-disc flex-col pl-4 font-light text-fiord">
              <li>Account creation date and it's age</li>
              <li>Location</li>
              <li>Is verified or not</li>
              <li>Followers count</li>
              <li>Friends count</li>
              <li>Likes count</li>
              <li>Posts count</li>
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
