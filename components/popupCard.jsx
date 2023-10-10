"use client";

import { fetchData, getClassImage } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const PopupCard = async ({ searchParams }) => {
  const router = useRouter();

  const data = await fetchData(
    `https://api.open5e.com/spells/?slug=${searchParams.spell}`
  );
  const spell = data.results[0];

  const dismissPopupCard = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("spell");

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname);
  };

  const spellInfoData = [
    {
      label: "Level",
      data: spell.spell_level,
    },
    {
      label: "Casting Time",
      data: spell.casting_time,
    },
    {
      label: "Range",
      data: spell.range,
    },
    {
      label: "Components",
      data: spell.components,
    },
    {
      label: "Duration",
      data: spell.duration,
    },
    {
      label: "School",
      data: spell.school,
    },
  ];

  return (
    <main
      onClick={dismissPopupCard}
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 flex justify-center items-center"
    >
      <div className="w-1/2 min-h-1/2 p-4 flex flex-col shadow-md rounded-lg gap-y-6 hover:shadow-xl transition-shadow bg-white">
        {/* Top section */}
        <div className="flex gap-x-2 items-center">
          <div className="border border-[#704CD9] p-2 w-10 h-10 rounded-full justify-center items-center">
            <h1 className="text-center">{spell.spell_level}</h1>
          </div>
          <h1 className="font-bold">{spell.name}</h1>
        </div>
        <h1 className="text-gray-500">{spell.desc}</h1>

        {/* Table of data */}
        <section className="grid grid-cols-3 grid-rows-2 gap-3 py-2">
          {spellInfoData.map((data) => (
            <div
              className="flex flex-col gap-y-1 justify-center items-center p-2 rounded-md shadow-[0px_0px_4px_rgba(0,0,0,0.2)]"
              key={data.label}
            >
              <h1 className="font-semibold uppercase text-xs">{data.label}</h1>
              <p className="text-xs text-center">{data.data}</p>
            </div>
          ))}
        </section>

        {/* Bottom section */}
        <section className="flex justify-between items-center gap-x-2">
          <div className="bg-gray-100 rounded-full max-w-[60%]">
            <h1 className="px-3 my-2 text-xs font-light line-clamp-1">
              {spell.casting_time}
            </h1>
          </div>

          {/* Class Images */}
          <div className="flex gap-x-2 justify-end">
            {spell.spell_lists.map((item) => (
              <Image
                src={getClassImage(item)}
                className="h-8 w-8 rounded-full"
                alt="img"
                key={item}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
