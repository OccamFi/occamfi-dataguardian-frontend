import { useState } from "react";

import axios from "axios";

import { CertificateCard } from "entities/certificate";
import { Avatar } from "entities/provider/ui/avatar";
import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";
import { downloadObjectAsJson } from "shared/utils/download-object-as-json";

type Props = {
  certificate: string;
};
export const GenerationSuccessContent = ({ certificate }: Props) => {
  const [isDownloaded, setIsDownloaded] = useState(false);

  const downloadFn = async () => {
    const url = `${import.meta.env.VITE_API_HOST}/download/${certificate}`;
    try {
      const res = await axios.get(url);
      const data = res.data;

      downloadObjectAsJson(JSON.stringify(data), "cert.json");
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

  return (
    <>
      <header className="mb-5 flex flex-col items-center justify-center">
        <Icon className="h-6 w-9" name="occam" />
        <h3 className="mt-4 text-center text-lg font-medium">
          The X.com (Twitter) Certificate was successfully generated
        </h3>
      </header>

      <CertificateCard
        avatar={<Avatar onlyImage provider="twitter" />}
        className="h-[186px] border-0 bg-gradient-to-tr from-[#5D5D5D] to-[#1B1B1B]"
        issueDate={null}
        title="X.com (Twitter) Certificate"
      />

      <footer className="mt-5 flex flex-col gap-2 font-medium">
        {isDownloaded ? (
          <>
            <Button className="flex h-11" onClick={uploadGalaClick}>
              Upload to Galactica
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
