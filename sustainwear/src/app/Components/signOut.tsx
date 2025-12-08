"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

export const SignOutBtn = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex w-fit items-center justify-center gap-2 px-3 py-2 text-sm text-white bg-alert rounded-full hover:bg-red-700 transition-colors"
    >
      <FiLogOut className="text-lg" />
      <span>Sign Out</span>
    </button>
  );
};
