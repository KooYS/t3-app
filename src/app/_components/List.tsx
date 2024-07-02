"use client";
import React from "react";
import { api } from "~/trpc/react";

const List = () => {
  const { data } = api.post.getLatest.useQuery();
  return (
    <div>
      {data?.map((post) => (
        <div key={post.id}>
          {Number(post.id)} / {post.name}
        </div>
      ))}
    </div>
  );
};

export default List;
