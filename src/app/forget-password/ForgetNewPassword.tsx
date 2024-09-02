"use client";

import React, { useState } from "react";
import { TextInput } from "../components/shared/text-input.component";
interface ForgetInfo {
  email: string, onChange: (email: string) => void, error?: string
}
export const ForgetNewPassword: React.FC<ForgetInfo> = ({ email, onChange, error }) => {

  return (
    <div className="w-full  gap-y-4 flex flex-col">
      <TextInput
        label="البريد الإلكتروني "
        inputProps={{ placeholder: "البريد الإلكتروني" }}
        type="email"
        value={email}
        onChange={(event) =>
          onChange(event.target.value)
        }
      // disabled={loading}
      />
      {error && (
        <p className="text-xs text-red-600 dark:text-red-500 text-right">
          {error}
        </p>
      )}
    </div>
  );
};
