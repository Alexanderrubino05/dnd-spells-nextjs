import FilterComponent from "@/components/filterComponent";
import { fetchData } from "@/utils";

import { SpellCard } from "@/components/spellCard";
import { SortingComponent } from "@/components/sortingComponent";
import { PopupCard } from "@/components/popupCard";

export default async function Home({ searchParams }) {
  let apiURL = `https://api.open5e.com/spells/?sort_by=${
    searchParams.sort_by || "A-Z"
  }`;

  //Change apiURL, depending on searchParams
  if (searchParams.class) apiURL += `&spell_lists=${searchParams.class}`;

  if (searchParams.spell_level)
    apiURL += `&spell_level=${searchParams.spell_level}`;

  if (searchParams.spell_name) apiURL += `&name=${searchParams.spell_name}`;

  const data = await fetchData(apiURL);

  //Sort data, depending on searchParams
  if (data.results) {
    if (searchParams.sort_by === "Z-A") {
      //Sort by Z-A
      data.results.reverse();
    } else if (searchParams.sort_by === "Level") {
      //Sort by levels
      data.results.sort((a, b) => {
        return a.spell_level - b.spell_level;
      });
    }
  }

  return (
    <main className="px-20 py-10">
      <div className="flex flex-col gap-y-8 pb-6">
        <FilterComponent spell_class={searchParams.class || ""} />

        <SortingComponent
          spell_level={searchParams.spell_level || ""}
          spell_name={searchParams.spell_name || ""}
          sort_by={searchParams.sort_by || "A-Z"}
        />
      </div>
      {data.results ? (
        <div className="grid grid-cols-1 gap-5 pt-5 md:grid-cols-2 xl:grid-cols-3">
          {data.results.map((spell) => (
            <SpellCard key={spell.desc} spell={spell} />
          ))}
        </div>
      ) : (
        <h1>No spells</h1>
      )}

      {searchParams.spell ? <PopupCard searchParams={searchParams} /> : <></>}
    </main>
  );
}
