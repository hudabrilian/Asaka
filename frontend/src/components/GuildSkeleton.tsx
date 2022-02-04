export const GuildSkeleton = () => {
  return (
    <div className="flex items-center space-x-5 px-10 py-6 bg-stone-700 rounded-2xl font-bold text-lg animation animate-pulse">
      <div className="rounded-full bg-stone-800 opacity-50 h-12 w-12 relative flex justify-center items-center"></div>
      <div className="w-full py-3 bg-stone-800 opacity-50 relative rounded-2xl font-bold text-lg "></div>
    </div>
  );
};
