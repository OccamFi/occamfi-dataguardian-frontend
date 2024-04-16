import { useState } from "react";

import { CertificateCard } from "entities/certificate";
import { Avatar } from "entities/provider/ui/avatar";
import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";

export const GenerationSuccessContent = () => {
  const [isDownloaded, setIsDownloaded] = useState(false);

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
        issueDate="01/24"
        title="X.com (Twitter) Certificate"
      />

      <footer className="mt-5 flex flex-col gap-2">
        {isDownloaded ? (
          <>
            <Button className="flex h-11 items-center justify-center gap-1 text-base font-medium ">
              <Icon
                name="checkCircle"
                svgClassName="stroke-current text-white/50"
              />
              Certificate downloaded
            </Button>
            <Button
              className="flex h-11 items-center justify-center gap-1 text-base font-medium"
              theme="white"
            >
              Back to Home page
            </Button>
          </>
        ) : (
          <Button
            className="flex h-11 items-center justify-center gap-1 text-base font-medium"
            onClick={() => {
              setIsDownloaded(true);
            }}
          >
            <Icon name="fileDownload" />
            Download{" "}
            <span className="font-semibold text-white/50">[24.10.24]</span>
          </Button>
        )}
      </footer>
    </>
  );
};
