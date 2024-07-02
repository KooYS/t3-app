import { api } from "~/trpc/server";
import { CreatePost } from "./_components/Create";
import List from "./_components/List";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <CrudShowcase />
    </main>
  );
}

async function CrudShowcase() {
  const list = await api.post.getLatest();
  const latestPost = await api.post.getId({ id: 1 }).catch(() => null);

  console.log(list, latestPost);

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <CreatePost />
      <List />
    </div>
  );
}
