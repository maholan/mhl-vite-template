"use client";

/**
 * menu-account-card.tsx
 *
 * Avatar-triggered account dropdown. The trigger is the user's own avatar,
 * making the whole profile card feel native to the top-nav / sidebar.
 *
 * Pattern:
 * - Trigger: Avatar button (clicking opens menu)
 * - Header: AccountHeader with larger context (name, email, online dot)
 * - Body: Grouped items covering account, workspace, and exit actions
 * - Uses selectionMode="none" throughout — this is a command menu, not a picker
 */

import React from "react";
import { Button as AriaButton } from "react-aria-components";

import {
  LogOut01,
  MessageSmileCircle,
  Settings01,
  User01,
  UserPlus01,
  Users01,
  Zap,
} from "@/components/ui/assets/icons";

import { Avatar } from "../../avatar/avatar";
import { Dropdown } from "../dropdown";

export function MenuAccountCard(): React.JSX.Element {
  return (
    <Dropdown.Root>
      {/* Avatar is the trigger — wrapped in AriaButton for accessibility */}
      <AriaButton
        aria-label="Open account menu"
        className="focus-visible:outline-brand-500 cursor-pointer rounded-full outline-2 outline-offset-2 focus-visible:outline"
      >
        <Avatar
          size="md"
          src="https://i.pravatar.cc/40?img=33"
          alt="Cameron Yang"
          className="size-8"
        />
      </AriaButton>

      <Dropdown.Popover placement="bottom right">
        <Dropdown.AccountHeader
          name="Cameron Yang"
          email="cameron@untitledui.com"
          avatarSrc="https://i.pravatar.cc/40?img=33"
          isOnline
        />

        <Dropdown.Menu onAction={() => {}}>
          <Dropdown.Section>
            <Dropdown.SectionHeader>Account</Dropdown.SectionHeader>
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
              selectionIndicator="none"
            />
          </Dropdown.Section>

          <Dropdown.Separator />

          <Dropdown.Section>
            <Dropdown.SectionHeader>Workspace</Dropdown.SectionHeader>
            <Dropdown.Item
              id="team"
              label="Team members"
              icon={Users01}
              selectionIndicator="none"
            />
            <Dropdown.Item
              id="invite"
              label="Invite people"
              icon={UserPlus01}
              selectionIndicator="none"
            />
          </Dropdown.Section>

          <Dropdown.Separator />

          <Dropdown.Section>
            <Dropdown.SectionHeader>What&apos;s new</Dropdown.SectionHeader>
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
          </Dropdown.Section>

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
