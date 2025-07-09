"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Fullscreen } from "lucide-react";

interface NavItem {
  name: string;
  path: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { name: "发展史", path: "/" },
  {
    name: "图鉴",
    path: "/pokedex",
    children: [
      { name: "经典系列", path: "/pokedex/classic" },
      { name: "彩屏系列", path: "/pokedex/color" },
      { name: "智能系列", path: "/pokedex/smart" },
    ],
  },
  { name: "角色", path: "/characters" },
  { name: "图书", path: "/books" },
  { name: "拓麻相册", path: "/gallery" },
  { name: "攻略", path: "/guides" },
  { name: "有关网站", path: "/links" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <NavigationMenu className="w-full right-0">
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.path}>
            {item.children && item.children.length > 0 ? (
              <>
                <NavigationMenuTrigger
                  className={
                    isActive(item.path) ? "text-green-700 font-bold" : ""
                  }
                >
                  {item.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2 p-2">
                    {item.children.map((child) => (
                      <li key={child.path}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={child.path}
                            className={`block px-4 py-2 rounded hover:bg-green-50 hover:text-green-700 ${
                              isActive(child.path)
                                ? "bg-green-100 text-green-700 font-bold"
                                : ""
                            }`}
                          >
                            {child.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  href={item.path}
                  className={`px-3 py-2 rounded transition text-gray-700 hover:text-green-600 ${
                    isActive(item.path)
                      ? "bg-green-100 text-green-700 font-bold"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
