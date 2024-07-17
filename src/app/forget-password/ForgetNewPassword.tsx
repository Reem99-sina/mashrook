"use client";

import React from "react";
import { TextInput } from "../components/shared/text-input.component";

export const ForgetNewPassword: React.FC = () => {
  return (
    <div className="w-full  gap-y-6 flex flex-col">
      <TextInput
        label="البريد الإلكتروني "
        inputProps={{ placeholder: "البريد الإلكتروني" }}
        type="email"
      />
    </div>
  );
};
