import { selectedTooltype } from "@draw/types";
import { Dispatch, SetStateAction } from "react";

export interface IconProps {
  size?: "sm" | "md" | "lg";
  clicked?: boolean;
  currentTool: selectedTooltype;
  setCurrentTool: Dispatch<SetStateAction<selectedTooltype>>;
  selectedTool?: selectedTooltype;
}

export const IconSizes =  {
  "sm": 35,
  "md": 40,
  "lg": 45
}

export const defaultClassName = "hover:cursor-pointer hover:bg-pixora-950/15 hover:text-pixora-900/75 transition-all duration-300 ease-in-out rounded-md p-1.5";