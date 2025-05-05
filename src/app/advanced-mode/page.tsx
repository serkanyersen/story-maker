import React from "react";
import Link from "next/link";

export default function AdvancedMode() {
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="btn btn-ghost mb-8">
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-8">Advanced Mode</h1>
      <p className="text-xl mb-12">
        Create and save characters, build upon previous stories, and customize
        every detail of your story.
      </p>

      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Coming Soon!</h2>
          <p>
            The Advanced Mode is currently under development. In this mode,
            you&apos;ll be able to:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Create and save character profiles</li>
            <li>Build upon previous stories</li>
            <li>Customize story elements in detail</li>
            <li>Save and share your stories</li>
            <li>Create story series</li>
          </ul>
          <p className="mt-4">
            For now, please use the Quick Mode to create your stories.
          </p>
        </div>
      </div>
    </div>
  );
}
