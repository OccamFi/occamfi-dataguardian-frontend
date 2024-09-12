import { Link } from "react-router-dom";

import { connectSnap, getHolderCommitment } from "@galactica-net/snap-api";
import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";
import { injected } from "wagmi/connectors";

import { ProviderCard } from "entities/provider";
import { Header } from "pages/ui/header/header";
import { Breadcrumbs } from "shared/ui/breadcrumbs";
import { Button } from "shared/ui/button";
import { Card } from "shared/ui/card";
import { Icon, IconName } from "shared/ui/icon";
import * as ICONS from "shared/ui/icon/svg";
import { Spinner } from "shared/ui/spinner";

export const Dev = () => {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  const handleGetSnap = async () => {
    await connectSnap("npm:@galactica-net/snap", { version: "0.6.1" });
  };

  const handleGetHolderCommitment = async () => {
    const commitment = await getHolderCommitment();
    console.log(commitment);
  };

  return (
    <div className="h-full bg-cover bg-fixed bg-left-top bg-no-repeat">
      <Header />
      <Breadcrumbs>
        <Breadcrumbs.Item>
          <Link to="/home">App</Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item isActive>
          <Link to="/home">App</Link>
        </Breadcrumbs.Item>
      </Breadcrumbs>
      <ProviderCard provider="twitter" />
      <Card>Hello</Card>
      <Button theme="white">Hello world</Button>
      <Button
        className="block"
        onClick={() => {
          switchChain({ chainId });
        }}
      >
        Switch chaind naskjdjask naksjdjksa
      </Button>
      <Button className="block">Switch chain</Button>
      <button
        className="block"
        onClick={() => {
          isConnected
            ? disconnect()
            : connect({ connector: injected({ target: "metaMask" }) });
        }}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </button>

      <button className="block" onClick={handleGetSnap}>
        Get Snap
      </button>
      <button className="block" onClick={handleGetHolderCommitment}>
        GenerateCommitmentHash
      </button>

      {Object.keys(ICONS).map((icon) => {
        return (
          <Icon
            className="text-dodgerBlue"
            key={icon}
            name={icon as IconName}
          />
        );
      })}

      <Spinner className="size-6" />
    </div>
  );
};
