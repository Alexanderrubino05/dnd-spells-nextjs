"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const sortingValues = ["A-Z", "Z-A", "Level"];

export const SortingComponent = ({ sort_by, spell_name, spell_level }) => {
  const router = useRouter();

  //Sorting
  const [showSortBy, selectShowSortBy] = useState(false);
  const [sortBy, setSortBy] = useState(sort_by);
  const [spellName, setSpellName] = useState(spell_name);
  const [spellLevel, setSpellLevel] = useState(spell_level);

  const changeSorting = () => {
    const searchParams = new URLSearchParams(window.location.search);

    if (spellName) {
      searchParams.set("spell_name", spellName);
    } else {
      searchParams.delete("spell_name");
    }

    if (spellLevel) {
      searchParams.set("spell_level", spellLevel);
    } else {
      searchParams.delete("spell_level");
    }

    if (sortBy) {
      searchParams.set("sort_by", sortBy);
    } else {
      searchParams.delete("sort_by");
    }

    // Generate the new pathname with the updated search parameters
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname);
  };

  return (
    <div className="grid grid-cols-1 grid-rows-4 gap-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
      <input
        placeholder="Spell name"
        className="border rounded-md p-3 outline-none hover:shadow-sm focus:shadow-md transition-shadow"
        onChange={(e) => setSpellName(e.target.value)}
        value={spellName}
      />

      <input
        placeholder="Spell level"
        className="border rounded-md p-3 outline-none hover:shadow-sm focus:shadow-md transition-shadow"
        onChange={(e) => setSpellLevel(e.target.value)}
        value={spellLevel}
      />

      <div className="flex flex-col relative">
        <button
          onClick={() => selectShowSortBy(!showSortBy)}
          className="flex items-center justify-between border rounded-md p-3 outline-none hover:shadow-sm focus:shadow-md transition-shadow w-full"
        >
          Sort by: {sortBy}
          <svg
            className={`-mr-1 h-5 w-5 text-gray-400 transition-transform duration-300 ${
              showSortBy ? "-rotate-180" : "rotate-0"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <ul
          className={`bg-white shadow-xl w-full absolute top-full rounded-md transition-opacity ${
            showSortBy
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {sortingValues.map((value) => (
            <li
              key={value}
              onClick={() => {
                selectShowSortBy(false), setSortBy(value);
              }}
              className="cursor-pointer hover:bg-gray-100 px-4 py-2"
            >
              {value}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => changeSorting()}
        className="bg-[#704CD9] text-white rounded-md hover:bg-[#836acb] transition-colors"
      >
        Filter
      </button>
    </div>
  );
};
