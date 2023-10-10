"use client";
import Image from "next/image";
import Bard from "../public/bard.jpg";
import Cleric from "../public/cleric.jpg";
import Druid from "../public/druid.jpg";
import Ranger from "../public/ranger.jpg";
import Sorcerer from "../public/sorcerer.jpg";
import Warlock from "../public/warlock.jpg";
import Wizard from "../public/wizard.jpg";
import { useState } from "react";
import { useRouter } from "next/navigation";

const classes = [
  {
    image: Bard,
    name: "Bard",
    color: "#D6C3D6",
  },
  {
    image: Cleric,
    name: "Cleric",
    color: "#BFBFC0",
  },
  {
    image: Druid,
    name: "Druid",
    color: "#BEC3A4",
  },
  {
    image: Ranger,
    name: "Ranger",
    color: "#A1B8A8",
  },
  {
    image: Sorcerer,
    name: "Sorcerer",
    color: "#C2545A",
  },
  {
    image: Warlock,
    name: "Warlock",
    color: "#BC98D0",
  },
  {
    image: Wizard,
    name: "Wizard",
    color: "#99B0D9",
  },
];

const FilterComponent = ({ spell_class }) => {
  const router = useRouter();

  //Class sorting
  const [selectedClass, setSelectedClass] = useState(spell_class);

  const selectedColor = selectedClass
    ? classes.filter((item) => {
        return item.name.toLowerCase() === selectedClass;
      })[0].color
    : "#704CD9"; //Fetching the right color depending on the class

  const handleClassClick = (item) => {
    const lowerCasedName = item.name.toLowerCase();
    const searchParams = new URLSearchParams(window.location.search);

    if (lowerCasedName === selectedClass) {
      //Clicked on same class icon again
      setSelectedClass(undefined);
      searchParams.delete("class");
    } else {
      //Clicked on new class icon again
      setSelectedClass(lowerCasedName);
      searchParams.set("class", lowerCasedName);
    }

    // Generate the new pathname with the updated search parameters
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname);
  };

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl font-bold">D&D Spells</h1>
        <div className={`h-1`} style={{ backgroundColor: selectedColor }} />
      </div>

      <div className="grid grid-cols-4 grid-rows-2 grid-flow-col gap-4 md:grid-cols-7 md:grid-rows-1">
        {classes.map((item) => (
          <button
            key={item.color}
            className={`w-full flex flex-col gap-y-3 justify-center items-center hover:opacity-100 transition-opacity cursor-pointer ${
              selectedClass !== item.name.toLowerCase() ? "opacity-50" : ""
            }`}
            onClick={() => handleClassClick(item)}
          >
            <Image alt="Img" src={item.image} className="rounded-full w-20" />
            <h3 className="uppercase font-medium">{item.name}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
