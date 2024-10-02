"use client";

import React from "react";
import { Search } from "../assets/svg";
import { TextInput } from "../components/shared/text-input.component";
import SharedHeaderComponent from "../components/shared/SharedHeaderComponent";
import QuestionsData from "./QuestionsData";

const FrequentlyAskedQuestions: React.FC = () => {
  return (
    <div className="container bg-white mx-auto ">
      <SharedHeaderComponent text="الأسئلة الشائعة" />

      <div className="p-4">
        <TextInput inputProps={{ placeholder: "بحث" }} icon={<Search />} />
      </div>

      <QuestionsData />
    </div>
  );
};

export default FrequentlyAskedQuestions;
