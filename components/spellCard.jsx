"use client";

import { getClassImage } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SpellCard = ({ spell }) => {
  const router = useRouter();

  const showPopupCard = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("spell", spell.slug);

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname);
  };

  return (
    <button
      onClick={showPopupCard}
      className="p-4 flex flex-col shadow-md rounded-lg gap-y-4 cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="flex gap-x-2 items-center">
        <div className="border border-[#704CD9] p-2 w-10 h-10 rounded-full justify-center items-center">
          <h1 className="text-center">{spell.spell_level}</h1>
        </div>
        <h1 className="font-bold">{spell.name}</h1>
      </div>

      <h1 className="line-clamp-3 text-gray-500 text-left flex-grow">
        {spell.desc}
      </h1>

      <div className="flex items-center justify-between gap-x-2 w-full self-end">
        <div className="bg-gray-100 rounded-full max-w-[60%]">
          <h1 className="px-3 my-2 text-xs font-light line-clamp-1">
            {spell.casting_time}
          </h1>
        </div>

        <div className="flex gap-x-2 justify-end">
          {spell.spell_lists.slice(0, 3).map((item) => (
            <Image
              src={getClassImage(item)}
              className="h-8 w-8 rounded-full"
              alt="img"
              key={item}
            />
          ))}
          {spell.spell_lists.length > 3 ? (
            <h1 className="self-end">...</h1>
          ) : (
            <></>
          )}
        </div>
      </div>
    </button>
  );
};
