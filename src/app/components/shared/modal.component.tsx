"use client";

import React, { forwardRef, useImperativeHandle } from "react";
import { Dialog } from "@material-tailwind/react";
import type { DialogProps } from "@material-tailwind/react";
import clsx from "clsx";

export interface ModalRef {
  open: () => void;
  close: () => void;
}

interface Props {
  children: React.ReactNode;
  size?: DialogProps["size"];
  className?: string;
  functiontoClose?: () => void;
}

export const Modal = forwardRef<ModalRef, Props>(
  ({ children, size, className, functiontoClose }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsVisible(true),
      close: () => setIsVisible(false),
    }));

    return (
      <Dialog
        open={isVisible}
        size={size}
        handler={() => {
          setIsVisible(false);
          if (functiontoClose) {
            functiontoClose();
          }
        }}
        className={clsx("border-0 focus:border-0", className)}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {isVisible ? children : null}
      </Dialog>
    );
  }
);
Modal.displayName = "Modal";
