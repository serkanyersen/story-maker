"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const storySchema = z.object({
  ageGroup: z.enum(["2-4", "4-6", "6-8", "8-10"]),
  duration: z.enum(["short", "medium", "full"]),
  theme: z.enum([
    "ai-decide",
    "urban",
    "country-farm",
    "fantasy",
    "fairy-tale",
    "jungle-adventure",
    "pirates",
    "science-fiction",
    "custom",
  ]),
  hero: z.enum(["boy-child", "girl-child", "young-male", "young-female"]),
  companions: z.array(
    z.enum([
      "none",
      "boy-child",
      "girl-child",
      "young-male",
      "young-female",
      "male-parent",
      "female-parent",
      "father-figure",
      "mother-figure",
      "dog",
      "cat",
    ])
  ),
  journey: z.enum([
    "hardship-challenges",
    "no-hardship-lessons",
    "no-hardship-fun",
    "curiosity-investigation",
    "silly-fun",
  ]),
  ending: z.enum(["happy", "thought-provoking", "hopeful", "big-laughter"]),
  customTheme: z.string().optional(),
});

type StoryFormData = z.infer<typeof storySchema>;

export default function StoryForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [story, setStory] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<StoryFormData>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      companions: ["none"],
    },
  });

  const theme = watch("theme");

  const onSubmit = async (data: StoryFormData) => {
    setIsLoading(true);
    setError(null);
    setStory(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to generate story");
      }

      const result = await response.json();
      setStory(result.story);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">
                Age Group
              </span>
            </label>
            <select
              className="select select-bordered select-primary w-full"
              {...register("ageGroup")}
            >
              <option value="2-4">2-4 years</option>
              <option value="4-6">4-6 years</option>
              <option value="6-8">6-8 years</option>
              <option value="8-10">8-10 years</option>
            </select>
            {errors.ageGroup && (
              <span className="text-error text-sm mt-1">
                {errors.ageGroup.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Duration</span>
            </label>
            <select
              className="select select-bordered select-primary w-full"
              {...register("duration")}
            >
              <option value="short">Short (2-5 min)</option>
              <option value="medium">Medium (5-10 min)</option>
              <option value="full">Full</option>
            </select>
            {errors.duration && (
              <span className="text-error text-sm mt-1">
                {errors.duration.message}
              </span>
            )}
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">Theme</span>
          </label>
          <select
            className="select select-bordered select-primary w-full"
            {...register("theme")}
          >
            <option value="ai-decide">Let AI Decide</option>
            <option value="urban">Urban</option>
            <option value="country-farm">Country / Farm</option>
            <option value="fantasy">Fantasy</option>
            <option value="fairy-tale">Fairy Tale</option>
            <option value="jungle-adventure">Jungle Adventure</option>
            <option value="pirates">Pirates</option>
            <option value="science-fiction">Science Fiction (space)</option>
            <option value="custom">Custom</option>
          </select>
          {errors.theme && (
            <span className="text-error text-sm mt-1">
              {errors.theme.message}
            </span>
          )}
        </div>

        {theme === "custom" && (
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">
                Custom Theme
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered input-primary w-full"
              {...register("customTheme")}
              placeholder="Enter your custom theme"
            />
            {errors.customTheme && (
              <span className="text-error text-sm mt-1">
                {errors.customTheme.message}
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Hero</span>
            </label>
            <select
              className="select select-bordered select-primary w-full"
              {...register("hero")}
            >
              <option value="boy-child">Boy Child (5-10)</option>
              <option value="girl-child">Girl Child (5-10)</option>
              <option value="young-male">Young Male (11-15)</option>
              <option value="young-female">Young Female (11-15)</option>
            </select>
            {errors.hero && (
              <span className="text-error text-sm mt-1">
                {errors.hero.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">
                Companions
              </span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "none", label: "None" },
                { value: "boy-child", label: "Boy Child" },
                { value: "girl-child", label: "Girl Child" },
                { value: "young-male", label: "Young Male" },
                { value: "young-female", label: "Young Female" },
                { value: "male-parent", label: "Male Parent" },
                { value: "female-parent", label: "Female Parent" },
                { value: "father-figure", label: "Father Figure" },
                { value: "mother-figure", label: "Mother Figure" },
                { value: "dog", label: "Dog" },
                { value: "cat", label: "Cat" },
              ].map((companion) => (
                <label
                  key={companion.value}
                  className="label cursor-pointer justify-start gap-2"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    value={companion.value}
                    {...register("companions")}
                  />
                  <span className="label-text">{companion.label}</span>
                </label>
              ))}
            </div>
            {errors.companions && (
              <span className="text-error text-sm mt-1">
                {errors.companions.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">
                Journey Type
              </span>
            </label>
            <select
              className="select select-bordered select-primary w-full"
              {...register("journey")}
            >
              <option value="hardship-challenges">
                Little Hardship but challenges overcome
              </option>
              <option value="no-hardship-lessons">
                No Hardship, but lessons learned
              </option>
              <option value="no-hardship-fun">
                No Hardship, No lessons, just a fun adventure story
              </option>
              <option value="curiosity-investigation">
                Curiosity, Investigations, Victory
              </option>
              <option value="silly-fun">Silly fun time</option>
            </select>
            {errors.journey && (
              <span className="text-error text-sm mt-1">
                {errors.journey.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Ending</span>
            </label>
            <select
              className="select select-bordered select-primary w-full"
              {...register("ending")}
            >
              <option value="happy">Happy Ending</option>
              <option value="thought-provoking">
                Thought Provoking Ending
              </option>
              <option value="hopeful">Hopeful Ending</option>
              <option value="big-laughter">Big laughter</option>
            </select>
            {errors.ending && (
              <span className="text-error text-sm mt-1">
                {errors.ending.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg w-full mt-8"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner"></span>
              Generating Story...
            </>
          ) : (
            "Generate Story"
          )}
        </button>
      </form>

      {error && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {story && (
        <div className="card bg-base-200 mt-8">
          <div className="card-body">
            <h3 className="card-title text-2xl mb-4">Your Story</h3>
            <div className="prose max-w-none">
              {story.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
