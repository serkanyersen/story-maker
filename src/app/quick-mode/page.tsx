import React from "react";
import Link from "next/link";
import StoryForm from "@/components/StoryForm";

export default function QuickMode() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="btn btn-ghost">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold">Quick Mode</h1>
      </div>

      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Create Your Story</h2>
          <p className="mb-6">
            Fill in the details below to generate a magical story for your
            child.
          </p>

          <StoryForm />
        </div>
      </div>
    </div>
  );
}
