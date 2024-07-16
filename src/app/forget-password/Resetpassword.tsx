"use client";

import React from "react";
import { TextInput } from "../components/shared/text-input.component";

export const ResetPassword: React.FC = () => {
  return (
    <div className="w-full  gap-y-6 flex flex-col">
      <div>
        <TextInput label="كلمة المرور" />
      </div>
      <div>
        <TextInput label="تاكيد كلمة المرور" />
      </div>
    </div>
  );
};
