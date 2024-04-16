import { PropsWithChildren, RefObject, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  className?: string;

  portalRef?: RefObject<HTMLElement>;
};

export const Portal = ({
  children,
  className,
  portalRef: portalRef,
}: PropsWithChildren<Props>) => {
  const fallbackPortalRef = useRef(getDefaultPortalElement(className));

  return createPortal(
    children,
    portalRef?.current ?? fallbackPortalRef.current
  );
};

function getDefaultPortalElement(className: string | undefined) {
  const portal = document.getElementById("portal-root");
  if (className && portal) {
    portal.className = className;
  }

  if (portal) return portal;

  const root = document.getElementById("root") ?? document.body;
  const fallbackPortal = document.createElement("div");
  fallbackPortal.id = "portal-root";
  root.appendChild(fallbackPortal);
  if (className) {
    fallbackPortal.className = className;
  }

  return fallbackPortal;
}
