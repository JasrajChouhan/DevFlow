"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "../ui/input";

import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";
export interface LocalSearchProps {
  route: string;
  imgSrc?: string;
  placeholder?: string;
  className?: string;
  iconPosition?: "left" | "right";
}

const LocalSearch = ({
  route,
  imgSrc,
  placeholder,
  className: otherClasses,
  iconPosition,
}: LocalSearchProps) => {
  // serach params and query
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSerachQuery] = useState(query);

  // router and pathname
  const router = useRouter();
  const pathname = usePathname();

  // debounce effect on serach
  useEffect(() => {
    const debaunce = setTimeout(() => {
      if (searchQuery) {
        // make new url and push into router
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (route === pathname) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(debaunce);
  }, [searchQuery, router, route, searchParams, pathname]);
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc || "/icons/search.svg"}
          alt="Search Icon"
          width={24}
          height={24}
        />
      )}

      {/* Input */}
      <Input
        placeholder={placeholder || "Search"}
        value={searchQuery}
        onChange={(e) => setSerachQuery(e.target.value)}
        type="text"
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc || "/icons/search.svg"}
          alt="Search Icon"
          width={24}
          height={24}
        />
      )}
    </div>
  );
};

export default LocalSearch;
