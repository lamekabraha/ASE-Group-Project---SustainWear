"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

export const SignOutBtn = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
    >
      <FiLogOut className="text-lg" />
      <span>Sign Out</span>
    </button>
  );
};