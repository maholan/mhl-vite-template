import { Avatar } from "./avatar";
import { AvatarAddButton } from "./base/avatar-add-button";
import { AvatarCompanyIcon } from "./base/avatar-company-icon";
import { ProfilePack } from "./modifined/profile-pack";
import { AvatarProfilePhoto } from "./modifined/profile-photo";

import type { Meta, StoryObj } from "@storybook/react";

const SAMPLE_AVATAR = "/images/avatar2.jpg";
const SAMPLE_LOGO = "/images/avatar2.jpg";
const AVATAR_IMAGES = ["/images/avatar1.jpg", "/images/avatar2.jpg", "/images/avatar3.jpg"];

const meta = {
  title: "Base/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Flexible avatar component with 7 sizes, online/offline status, verified tick, count badge, and company icon badge. " +
          "Falls back gracefully to initials or a placeholder icon when no image is available. " +
          "Includes ProfilePhoto (large profile page variant), ProfilePack (avatar + text layout), and AvatarAddButton (add user trigger with tooltip).",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xxs", "xs", "sm", "md", "lg", "xl", "2xl"],
      table: { defaultValue: { summary: "md" } },
    },
    status: {
      control: "select",
      options: [undefined, "online", "offline"],
    },
    verified: { control: "boolean" },
    border: { control: "boolean" },
    rounded: { control: "boolean", table: { defaultValue: { summary: "true" } } },
    focusable: { control: "boolean" },
    src: { control: "text" },
    alt: { control: "text" },
    initials: { control: "text" },
    count: { control: "number" },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Base: image ──────────────────────────────────────────────────────────────

export const WithImage: Story = {
  args: { src: SAMPLE_AVATAR, alt: "User avatar", size: "md" },
};

export const WithInitials: Story = {
  args: { initials: "OP", size: "md" },
};

export const WithPlaceholder: Story = {
  name: "Placeholder (no image)",
  args: { size: "md" },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: "All sizes — image",
  args: { src: SAMPLE_AVATAR },
  render: (args) => (
    <div className="flex items-end gap-3">
      {(["xxs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <Avatar key={size} {...args} size={size} alt={`${size} avatar`} />
      ))}
    </div>
  ),
};

export const AllSizesInitials: Story = {
  name: "All sizes — initials",
  args: { initials: "OP" },
  render: (args) => (
    <div className="flex items-end gap-3">
      {(["xxs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

// ─── Status ───────────────────────────────────────────────────────────────────

export const StatusOnline: Story = {
  name: "Status — online",
  args: { src: SAMPLE_AVATAR, status: "online", size: "md" },
};

export const StatusOffline: Story = {
  name: "Status — offline",
  args: { src: SAMPLE_AVATAR, status: "offline", size: "md" },
};

export const StatusAllSizes: Story = {
  name: "Status — all sizes",
  args: { src: SAMPLE_AVATAR, status: "online" },
  render: (args) => (
    <div className="flex items-end gap-3">
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <Avatar key={size} {...args} size={size} alt={`${size} online`} />
      ))}
    </div>
  ),
};

// ─── Verified ────────────────────────────────────────────────────────────────

export const Verified: Story = {
  args: { src: SAMPLE_AVATAR, verified: true, size: "md" },
};

export const VerifiedAllSizes: Story = {
  name: "Verified — all sizes",
  args: { src: SAMPLE_AVATAR, verified: true },
  render: (args) => (
    <div className="flex items-end gap-3">
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <Avatar key={size} {...args} size={size} alt={`${size} verified`} />
      ))}
    </div>
  ),
};

// ─── Count badge ─────────────────────────────────────────────────────────────

export const WithCount: Story = {
  name: "Count badge",
  args: { src: SAMPLE_AVATAR, count: 3, size: "md" },
};

// ─── Company icon badge ───────────────────────────────────────────────────────

export const WithCompanyIcon: Story = {
  name: "Company icon badge",
  args: { src: SAMPLE_AVATAR, size: "md" },
  render: (args) => (
    <div className="relative inline-flex">
      <Avatar {...args} />
      <AvatarCompanyIcon src={SAMPLE_LOGO} alt="Company logo" size="md" />
    </div>
  ),
};

export const CompanyIconAllSizes: Story = {
  name: "Company icon — all sizes",
  args: { src: SAMPLE_AVATAR },
  render: (args) => (
    <div className="flex items-end gap-4">
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <div key={size} className="relative inline-flex">
          <Avatar {...args} size={size} alt={`${size} avatar`} />
          <AvatarCompanyIcon src={SAMPLE_LOGO} alt="Company" size={size} />
        </div>
      ))}
    </div>
  ),
};

// ─── Border / shape ───────────────────────────────────────────────────────────

export const WithBorder: Story = {
  name: "With border",
  args: { src: SAMPLE_AVATAR, border: true, size: "md" },
};

export const Squared: Story = {
  name: "Square (rounded=false)",
  args: { src: SAMPLE_AVATAR, rounded: false, size: "md" },
};

// ─── Avatar group (stacked) ───────────────────────────────────────────────────

export const AvatarGroup: Story = {
  name: "Avatar group (stacked)",
  args: { src: SAMPLE_AVATAR },
  render: () => (
    <div className="flex -space-x-2">
      {AVATAR_IMAGES.concat(AVATAR_IMAGES.slice(0, 2)).map((src, i) => (
        <Avatar key={i} src={src} alt={`User ${i + 1}`} size="md" border />
      ))}
      <Avatar initials="+3" size="md" border />
    </div>
  ),
};

// ─── Add button ───────────────────────────────────────────────────────────────

export const AddButton: Story = {
  name: "AvatarAddButton",
  args: { size: "md" },
  render: () => (
    <div className="flex items-end gap-3">
      <AvatarAddButton size="xs" title="Add user" />
      <AvatarAddButton size="sm" title="Add user" />
      <AvatarAddButton size="md" title="Add user" />
    </div>
  ),
};

export const AddButtonWithGroup: Story = {
  name: "Add button in group",
  args: { src: SAMPLE_AVATAR },
  render: () => (
    <div className="flex items-center -space-x-2">
      {AVATAR_IMAGES.map((src, i) => (
        <Avatar key={i} src={src} alt={`User ${i + 1}`} size="md" border />
      ))}
      <div className="z-10 pl-2">
        <AvatarAddButton size="md" title="Add user" />
      </div>
    </div>
  ),
};

// ─── Profile photo ────────────────────────────────────────────────────────────

export const ProfilePhotoSizes: Story = {
  name: "ProfilePhoto — all sizes",
  args: { size: "md" },
  render: () => (
    <div className="flex items-end gap-6">
      <AvatarProfilePhoto src={SAMPLE_AVATAR} alt="User" size="sm" />
      <AvatarProfilePhoto src={SAMPLE_AVATAR} alt="User" size="md" />
      <AvatarProfilePhoto src={SAMPLE_AVATAR} alt="User" size="lg" />
    </div>
  ),
};

export const ProfilePhotoWithStatus: Story = {
  name: "ProfilePhoto — with status",
  args: { size: "md" },
  render: () => (
    <div className="flex items-end gap-6">
      <AvatarProfilePhoto src={SAMPLE_AVATAR} alt="User" size="sm" status="online" />
      <AvatarProfilePhoto src={SAMPLE_AVATAR} alt="User" size="md" status="online" />
      <AvatarProfilePhoto src={SAMPLE_AVATAR} alt="User" size="lg" status="offline" />
    </div>
  ),
};

export const ProfilePhotoWithVerified: Story = {
  name: "ProfilePhoto — verified",
  args: { size: "md" },
  render: () => (
    <div className="flex items-end gap-6">
      <AvatarProfilePhoto src={SAMPLE_AVATAR} alt="User" size="sm" verified />
      <AvatarProfilePhoto src={SAMPLE_AVATAR} alt="User" size="md" verified />
      <AvatarProfilePhoto src={SAMPLE_AVATAR} alt="User" size="lg" verified />
    </div>
  ),
};

export const ProfilePhotoFallbacks: Story = {
  name: "ProfilePhoto — fallbacks",
  args: { size: "md" },
  render: () => (
    <div className="flex items-end gap-6">
      <AvatarProfilePhoto initials="OP" size="sm" />
      <AvatarProfilePhoto initials="OP" size="md" />
      <AvatarProfilePhoto size="lg" />
    </div>
  ),
};

// ─── Profile pack ─────────────────────────────────────────────────────────────

export const ProfilePackSizes: Story = {
  name: "ProfilePack — all sizes",
  args: { size: "md" },
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      <ProfilePack
        src={SAMPLE_AVATAR}
        alt="User"
        size="sm"
        title="Olivia Rhye"
        subtitle="olivia@untitledui.com"
      />
      <ProfilePack
        src={SAMPLE_AVATAR}
        alt="User"
        size="md"
        title="Olivia Rhye"
        subtitle="olivia@untitledui.com"
      />
      <ProfilePack
        src={SAMPLE_AVATAR}
        alt="User"
        size="lg"
        title="Olivia Rhye"
        subtitle="olivia@untitledui.com"
      />
    </div>
  ),
};

export const ProfilePackWithInitials: Story = {
  name: "ProfilePack — initials fallback",
  args: { size: "md" },
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      <ProfilePack initials="OR" size="sm" title="Olivia Rhye" subtitle="olivia@untitledui.com" />
      <ProfilePack initials="OR" size="md" title="Olivia Rhye" subtitle="olivia@untitledui.com" />
      <ProfilePack initials="OR" size="lg" title="Olivia Rhye" subtitle="olivia@untitledui.com" />
    </div>
  ),
};

// ─── All states showcase ──────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  args: { size: "md" },
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      {/* Sizes */}
      <section className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-tertiary">Sizes</p>
        <div className="flex items-end gap-3">
          {(["xxs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
            <Avatar key={size} src={SAMPLE_AVATAR} alt={size} size={size} />
          ))}
        </div>
      </section>

      {/* Fallbacks */}
      <section className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-tertiary">Fallbacks</p>
        <div className="flex items-center gap-3">
          <Avatar src={SAMPLE_AVATAR} alt="User" size="md" />
          <Avatar initials="OR" size="md" />
          <Avatar size="md" />
        </div>
      </section>

      {/* Badges */}
      <section className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-tertiary">Badges</p>
        <div className="flex items-center gap-3">
          <Avatar src={SAMPLE_AVATAR} alt="User" size="md" status="online" />
          <Avatar src={SAMPLE_AVATAR} alt="User" size="md" status="offline" />
          <Avatar src={SAMPLE_AVATAR} alt="User" size="md" verified />
          <Avatar src={SAMPLE_AVATAR} alt="User" size="md" count={3} />
          <div className="relative inline-flex">
            <Avatar src={SAMPLE_AVATAR} alt="User" size="md" />
            <AvatarCompanyIcon src={SAMPLE_LOGO} alt="Company" size="md" />
          </div>
        </div>
      </section>

      {/* Border & shape */}
      <section className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-tertiary">Border & shape</p>
        <div className="flex items-center gap-3">
          <Avatar src={SAMPLE_AVATAR} alt="User" size="md" border />
          <Avatar src={SAMPLE_AVATAR} alt="User" size="md" rounded={false} />
          <Avatar initials="OR" size="md" border />
        </div>
      </section>

      {/* Avatar group */}
      <section className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-tertiary">Avatar group</p>
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {AVATAR_IMAGES.concat(AVATAR_IMAGES[0]).map((src, i) => (
              <Avatar key={i} src={src} alt={`User ${i + 1}`} size="md" border />
            ))}
            <Avatar initials="+3" size="md" border />
          </div>
          <div className="pl-2">
            <AvatarAddButton size="md" title="Add user" />
          </div>
        </div>
      </section>

      {/* ProfilePhoto */}
      <section className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-tertiary">ProfilePhoto</p>
        <div className="flex items-end gap-6">
          <AvatarProfilePhoto src={SAMPLE_AVATAR} alt="User" size="sm" />
          <AvatarProfilePhoto src={SAMPLE_AVATAR} alt="User" size="md" verified />
          <AvatarProfilePhoto src={SAMPLE_AVATAR} alt="User" size="lg" status="online" />
        </div>
      </section>

      {/* ProfilePack */}
      <section className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-tertiary">ProfilePack</p>
        <div className="flex w-64 flex-col gap-3">
          <ProfilePack
            src={SAMPLE_AVATAR}
            alt="User"
            size="sm"
            title="Olivia Rhye"
            subtitle="olivia@untitledui.com"
          />
          <ProfilePack
            src={SAMPLE_AVATAR}
            alt="User"
            size="md"
            title="Olivia Rhye"
            subtitle="olivia@untitledui.com"
          />
          <ProfilePack
            src={SAMPLE_AVATAR}
            alt="User"
            size="lg"
            title="Olivia Rhye"
            subtitle="olivia@untitledui.com"
          />
        </div>
      </section>
    </div>
  ),
};
