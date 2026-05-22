"use client";

/**
 * menu-search-advanced.tsx
 *
 * Dropdown with a live search field pinned above the menu list.
 * Filters visible items as the user types — useful for "Assign to" or
 * "Switch workspace" patterns with many options.
 *
 * Architecture:
 * - Search input lives INSIDE the Popover but OUTSIDE the Menu (not a MenuItem).
 * - Menu items are filtered client-side by a controlled `query` state.
 * - Each item uses an avatar + label pattern with a checkmark selection indicator.
 */

import React, { useState } from "react";

import { SearchLg } from "@/components/ui/assets/icons";

import { Button } from "../../buttons/button/button";
import { Dropdown } from "../dropdown";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "alice",
    name: "Alice Johnson",
    email: "alice@untitledui.com",
    avatarUrl: "https://i.pravatar.cc/32?img=1",
  },
  {
    id: "bob",
    name: "Bob Smith",
    email: "bob@untitledui.com",
    avatarUrl: "https://i.pravatar.cc/32?img=2",
  },
  {
    id: "carol",
    name: "Carol White",
    email: "carol@untitledui.com",
    avatarUrl: "https://i.pravatar.cc/32?img=3",
  },
  {
    id: "dan",
    name: "Dan Brown",
    email: "dan@untitledui.com",
    avatarUrl: "https://i.pravatar.cc/32?img=4",
  },
  {
    id: "eva",
    name: "Eva Martinez",
    email: "eva@untitledui.com",
    avatarUrl: "https://i.pravatar.cc/32?img=5",
  },
  {
    id: "frank",
    name: "Frank Lee",
    email: "frank@untitledui.com",
    avatarUrl: "https://i.pravatar.cc/32?img=6",
  },
];

export function MenuSearchAdvanced(): React.JSX.Element {
  const [query, setQuery] = useState("");

  const filtered = TEAM_MEMBERS.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Dropdown.Root>
      <Button color="secondary" size="sm">
        Assign to
      </Button>

      <Dropdown.Popover>
        {/* Search bar — sits above the scrollable Menu */}
        <div className="border-secondary border-b px-3 py-2">
          <div className="border-primary bg-primary focus-within:border-brand-300 focus-within:ring-brand-300 flex items-center gap-2 rounded-md border px-3 py-2 ring-1 ring-transparent">
            <SearchLg className="text-icon-quaternary size-4 shrink-0" />
            <input
              autoFocus
              type="text"
              placeholder="Search members…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-primary placeholder:text-quaternary min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <Dropdown.Menu selectionMode="single" onSelectionChange={() => {}}>
          {filtered.length === 0 ? (
            <Dropdown.Item
              id="_empty"
              isDisabled
              label="No members found"
              selectionIndicator="none"
            />
          ) : (
            filtered.map((member) => (
              <Dropdown.Item
                key={member.id}
                id={member.id}
                label={member.name}
                avatarUrl={member.avatarUrl}
                selectionIndicator="checkmark"
              />
            ))
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}
