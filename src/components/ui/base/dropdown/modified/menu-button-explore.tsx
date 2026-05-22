"use client";

/**
 * menu-button-explore.tsx
 *
 * Button-triggered dropdown with a plain "Dropdown menu" text header —
 * matching the Figma "Dropdown Menu" node (node-id=1694-21380).
 *
 * Shows full icon + label + shortcut layout across all eleven menu items
 * grouped into: account actions, workspace, community & support, danger.
 */

import React from "react";

import {
  Building05,
  HomeLine,
  Keyboard01,
  LayersTwo01,
  LogOut01,
  MessageSmileCircle,
  Settings01,
  User01,
  UserPlus01,
  Users01,
  Zap,
} from "@/components/ui/assets/icons";

import { Button } from "../../buttons/button/button";
import { Dropdown } from "../dropdown";

export function MenuButtonExplore(): React.JSX.Element {
  return (
    <Dropdown.Root>
      <Button color="secondary" size="sm">
        Options
      </Button>

      <Dropdown.Popover>
        <Dropdown.MenuHeader>Dropdown menu</Dropdown.MenuHeader>

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
            icon={Building05}
            selectionIndicator="none"
          />
          <Dropdown.Item id="team" label="Team" icon={Users01} selectionIndicator="none" />
          <Dropdown.Item
            id="invite"
            label="Invite colleagues"
            icon={UserPlus01}
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
            id="slack"
            label="Slack community"
            icon={MessageSmileCircle}
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="support"
            label="Support"
            icon={LayersTwo01}
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="api"
            label="API"
            icon={HomeLine}
            shortcut="⌥⇧A"
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
