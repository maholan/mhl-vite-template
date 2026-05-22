"use client";

/**
 * menu-account.tsx
 *
 * Account dropdown triggered by a DotsButton (kebab ⋮).
 * Shows an AccountHeader (avatar + name + email) followed by grouped menu items
 * with icons and keyboard shortcuts — matching the Figma "Dropdown Account" pattern.
 *
 * Usage:
 *   Drop this component anywhere you need a per-row or page-level account menu.
 */

import React from "react";

import {
  HomeLine,
  Keyboard01,
  LogOut01,
  MessageSmileCircle,
  Settings01,
  User01,
  Users01,
  Zap,
} from "@/components/ui/assets/icons";

import { Dropdown } from "../dropdown";

export function MenuAccount(): React.JSX.Element {
  return (
    <Dropdown.Root>
      <Dropdown.DotsButton />

      <Dropdown.Popover>
        <Dropdown.AccountHeader
          name="Cameron Yang"
          email="cameron@untitledui.com"
          avatarSrc="https://i.pravatar.cc/40?img=12"
          isOnline
        />

        <Dropdown.Menu onAction={() => {}}>
          <Dropdown.Item
            id="profile"
            label="View profile"
            icon={User01}
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="settings"
            label="Settings"
            icon={Settings01}
            shortcut="⌘S"
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="keyboard"
            label="Keyboard shortcuts"
            icon={Keyboard01}
            shortcut="?"
            selectionIndicator="none"
          />

          <Dropdown.Separator />

          <Dropdown.Item
            id="company"
            label="Company profile"
            icon={HomeLine}
            selectionIndicator="none"
          />
          <Dropdown.Item id="team" label="Team" icon={Users01} selectionIndicator="none" />
          <Dropdown.Item
            id="invite"
            label="Invite colleagues"
            icon={UserPlaceholder}
            selectionIndicator="none"
          />

          <Dropdown.Separator />

          <Dropdown.Item
            id="changelog"
            label="Changelog"
            icon={Zap}
            shortcut="⌥⇧C"
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="support"
            label="Support"
            icon={MessageSmileCircle}
            selectionIndicator="none"
          />

          <Dropdown.Separator />

          <Dropdown.Item
            id="logout"
            label="Log out"
            icon={LogOut01}
            shortcut="⌥⇧Q"
            selectionIndicator="none"
          />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}

function UserPlaceholder({ className }: { className?: string }): React.JSX.Element {
  return <User01 className={className} />;
}
