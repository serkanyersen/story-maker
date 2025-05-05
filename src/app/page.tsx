import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold text-center mb-8">Story Maker</h1>
      <p className="text-xl text-center mb-12 max-w-2xl">
        Create magical bedtime stories with your kids using AI. Choose a mode to
        get started!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Link
          href="/quick-mode"
          className="card bg-base-200 hover:bg-base-300 transition-colors"
        >
          <div className="card-body">
            <h2 className="card-title text-2xl">Quick Mode</h2>
            <p>
              Create a story quickly with essential options. Perfect for
              spontaneous story time!
            </p>
          </div>
        </Link>

        <Link
          href="/advanced-mode"
          className="card bg-base-200 hover:bg-base-300 transition-colors"
        >
          <div className="card-body">
            <h2 className="card-title text-2xl">Advanced Mode</h2>
            <p>
              Create and save characters, build upon previous stories, and
              customize every detail.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
