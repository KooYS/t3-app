"use client";

import React from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function CreatePost() {
  const router = useRouter();

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div
      onClick={() => {
        createPost.mutate({ name: "koo" });
      }}
    >
      Create
    </div>
  );
}
