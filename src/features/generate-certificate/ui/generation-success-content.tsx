import { useState } from "react";

import axios from "axios";

import { CertificateCard } from "entities/certificate";
import { Provider } from "entities/provider";
import { Avatar } from "entities/provider/ui/avatar";
import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";
import { capitalizeFirstLetter } from "shared/utils";
import { downloadObjectAsJson } from "shared/utils/download-object-as-json";

type Props = {
  certificate: string;
  provider: Provider;
};
export const GenerationSuccessContent = ({ certificate, provider }: Props) => {
  const [isDownloaded, setIsDownloaded] = useState(false);

  const downloadFn = async () => {
    const url = `${import.meta.env.VITE_API_HOST}/download/${certificate}`;
    try {
      const res = await axios.get(url);
      const data = res.data;

      downloadObjectAsJson(
        JSON.stringify(data),
        `${capitalizeFirstLetter(provider)}-zkCert.json`
      );
    } catch (err) {
      console.log("Request certificate error: ", err);
    }
  };

  const downloadHandler = () => {
    downloadFn();
    setIsDownloaded(true);
  };

  const uploadGalaClick = () => {
    const url = "https://cypherbook-stage.galactica.com/my-certificates ";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  let card = null;

  switch (provider) {
    case "twitter":
      card = (
        <CertificateCard
          avatar={<Avatar onlyImage provider="twitter" />}
          className="h-[186px] border-0 bg-gradient-to-tr from-[#5D5D5D] to-[#1B1B1B]"
          issueDate={null}
          title="X.com (Twitter) zkCertificate"
        />
      );
      break;
    case "uniswap":
      card = (
        <CertificateCard
          avatar={<Avatar onlyImage provider="uniswap" />}
          className="h-[186px] border-0 bg-gradient-to-tr from-[#ffe8f7] to-[#f538d0] text-black/60"
          issueDate={null}
          title="Uniswap zkCertificate"
        />
      );
      break;
  }

  return (
    <>
      <header className="mb-5 flex flex-col items-center justify-center">
        <Icon className="h-6 w-9" name="occam" />
        <h3 className="mt-4 text-center text-lg font-medium">
          {provider === "twitter" ? "The X.com (Twitter)" : "Uniswap"}{" "}
          Certificate was successfully generated
        </h3>
      </header>
      {card}
      <footer className="mt-5 flex flex-col gap-2 font-medium">
        {isDownloaded ? (
          <>
            <Button className="flex h-11" onClick={uploadGalaClick}>
              Upload to Wallet
            </Button>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <Icon
                  name="checkCircle"
                  svgClassName="stroke-current text-black/50"
                />

                <span className="text-black">Certificate downloaded</span>
              </div>
            </div>
          </>
        ) : (
          <Button
            className="flex h-11 items-center justify-center gap-1 text-base font-medium"
            onClick={downloadHandler}
          >
            <Icon name="fileDownload" />
            Download
          </Button>
        )}
      </footer>
    </>
  );
};
