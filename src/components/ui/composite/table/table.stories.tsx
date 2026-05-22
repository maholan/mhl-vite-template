import { useState } from "react";

import { Edit01, Trash01, UploadCloud } from "@/components/ui/assets/icons";
import { Avatar } from "@/components/ui/base/avatar/avatar";
import { Badge, BadgeWithDot } from "@/components/ui/base/badges";
import { Button } from "@/components/ui/base/buttons/button/button";
import { Dropdown } from "@/components/ui/base/dropdown/dropdown";

import { Table, TableCard, TableRowActionsDropdown } from "./table";

import type { Meta, StoryObj } from "@storybook/react";
import type { Key, SortDescriptor } from "react-aria-components";

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: "Composite/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Accessible data table built on React Aria. Supports single/multiple row selection, " +
          "sortable columns, keyboard navigation, and optional card shell via `TableCard`.",
      },
    },
  },
  argTypes: {
    selectionMode: {
      control: "select",
      options: ["none", "single", "multiple"],
      table: { defaultValue: { summary: "none" } },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Shared cell helpers ───────────────────────────────────────────────────────

function CellText({ primary, secondary }: { primary: string; secondary?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-primary">{primary}</span>
      {secondary && <span className="text-sm text-tertiary">{secondary}</span>}
    </div>
  );
}

function AvatarGroup({ srcs, max = 4 }: { srcs: string[]; max?: number }) {
  const visible = srcs.slice(0, max);
  const overflow = srcs.length - max;
  return (
    <div className="flex items-center">
      {visible.map((src, i) => (
        <div
          key={i}
          className="size-6 shrink-0 overflow-hidden rounded-full border border-white bg-brand-50 -mr-1"
          style={{ zIndex: visible.length - i }}
        >
          <img src={src} alt="" className="size-full object-cover" />
        </div>
      ))}
      {overflow > 0 && (
        <div className="size-6 shrink-0 rounded-full border border-secondary bg-tertiary -mr-1 flex items-center justify-center">
          <span className="text-xs font-semibold text-quaternary">+{overflow}</span>
        </div>
      )}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex flex-1 items-center gap-3">
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-quaternary">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-brand-600"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-9 shrink-0 text-sm font-medium text-secondary tabular-nums">{value}%</span>
    </div>
  );
}

const FILE_COLORS: Record<string, string> = {
  PDF: "bg-error-600",
  JPG: "bg-brand-600",
  PNG: "bg-brand-600",
  MP4: "bg-[#155eef]",
  FIG: "bg-brand-600",
  DOCX: "bg-[#155eef]",
  AEP: "bg-[#9333ea]",
  MP3: "bg-[#db2777]",
  CSV: "bg-success-600",
  ZIP: "bg-warning-600",
};

function FileTypeIcon({ ext }: { ext: string }) {
  const color = FILE_COLORS[ext] ?? "bg-quaternary";
  return (
    <div className="relative size-10 shrink-0">
      <svg viewBox="0 0 40 40" className="absolute inset-0 size-full" aria-hidden="true">
        <rect
          x="7"
          y="0"
          width="26"
          height="40"
          rx="3"
          fill="var(--background-color-secondary,#f5f5f5)"
        />
        <rect
          x="7"
          y="0"
          width="26"
          height="40"
          rx="3"
          stroke="var(--border-color-secondary,#dcdcdc)"
          strokeWidth="0.5"
          fill="none"
        />
        <path d="M26 0 L33 7 L26 7 Z" fill="var(--background-color-tertiary,#e8e8e8)" />
      </svg>
      <div
        className={`absolute bottom-[15%] left-[2.5%] right-[7.5%] flex items-center justify-center rounded-[2px] px-1 py-0.5 ${color}`}
      >
        <span className="text-[9px] font-bold leading-none text-white">{ext}</span>
      </div>
    </div>
  );
}

// ── Sample data ───────────────────────────────────────────────────────────────

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Olivia Rhye",
    email: "olivia@untitledui.com",
    avatar: "https://i.pravatar.cc/40?img=1",
    role: "Product Designer",
    status: "Active" as const,
    teams: ["Design", "Product"],
  },
  {
    id: 2,
    name: "Phoenix Baker",
    email: "phoenix@untitledui.com",
    avatar: "https://i.pravatar.cc/40?img=2",
    role: "Product Manager",
    status: "Active" as const,
    teams: ["Product", "Engineering"],
  },
  {
    id: 3,
    name: "Lana Steiner",
    email: "lana@untitledui.com",
    avatar: "https://i.pravatar.cc/40?img=3",
    role: "Frontend Engineer",
    status: "Active" as const,
    teams: ["Engineering"],
  },
  {
    id: 4,
    name: "Demi Wilkinson",
    email: "demi@untitledui.com",
    avatar: "https://i.pravatar.cc/40?img=4",
    role: "Backend Engineer",
    status: "Inactive" as const,
    teams: ["Engineering"],
  },
  {
    id: 5,
    name: "Candice Wu",
    email: "candice@untitledui.com",
    avatar: "https://i.pravatar.cc/40?img=5",
    role: "UX Designer",
    status: "Active" as const,
    teams: ["Design"],
  },
  {
    id: 6,
    name: "Natali Craig",
    email: "natali@untitledui.com",
    avatar: "https://i.pravatar.cc/40?img=6",
    role: "UX Copywriter",
    status: "Active" as const,
    teams: ["Design"],
  },
] as const;

type TeamMember = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: "Active" | "Inactive";
  teams: readonly string[];
};

const COMPANIES = [
  {
    id: 1,
    name: "Ephemeral",
    url: "ephemeral.io",
    logo: "https://i.pravatar.cc/40?img=10",
    status: "Customer" as const,
    about: "Content curating app",
    aboutSub: "Brings all your news into one place",
    users: [
      "https://i.pravatar.cc/24?img=1",
      "https://i.pravatar.cc/24?img=2",
      "https://i.pravatar.cc/24?img=3",
      "https://i.pravatar.cc/24?img=4",
      "https://i.pravatar.cc/24?img=5",
      "https://i.pravatar.cc/24?img=6",
      "https://i.pravatar.cc/24?img=7",
      "https://i.pravatar.cc/24?img=8",
    ],
    licenseUse: 70,
  },
  {
    id: 2,
    name: "Stack3d Lab",
    url: "stack3dlab.com",
    logo: "https://i.pravatar.cc/40?img=11",
    status: "Churned" as const,
    about: "Design software",
    aboutSub: "Super lightweight design app",
    users: [
      "https://i.pravatar.cc/24?img=10",
      "https://i.pravatar.cc/24?img=11",
      "https://i.pravatar.cc/24?img=12",
      "https://i.pravatar.cc/24?img=13",
      "https://i.pravatar.cc/24?img=14",
    ],
    licenseUse: 60,
  },
  {
    id: 3,
    name: "Warpspeed",
    url: "getwarpspeed.com",
    logo: "https://i.pravatar.cc/40?img=12",
    status: "Customer" as const,
    about: "Data prediction",
    aboutSub: "AI and machine learning data",
    users: [
      "https://i.pravatar.cc/24?img=20",
      "https://i.pravatar.cc/24?img=21",
      "https://i.pravatar.cc/24?img=22",
      "https://i.pravatar.cc/24?img=23",
    ],
    licenseUse: 30,
  },
  {
    id: 4,
    name: "CloudWatch",
    url: "cloudwatch.app",
    logo: "https://i.pravatar.cc/40?img=13",
    status: "Customer" as const,
    about: "Productivity app",
    aboutSub: "Time management and productivity",
    users: [
      "https://i.pravatar.cc/24?img=30",
      "https://i.pravatar.cc/24?img=31",
      "https://i.pravatar.cc/24?img=32",
      "https://i.pravatar.cc/24?img=33",
      "https://i.pravatar.cc/24?img=34",
      "https://i.pravatar.cc/24?img=35",
    ],
    licenseUse: 80,
  },
  {
    id: 5,
    name: "ContrastAI",
    url: "contrastai.com",
    logo: "https://i.pravatar.cc/40?img=14",
    status: "Churned" as const,
    about: "Web app integrations",
    aboutSub: "Connect web apps seamlessly",
    users: ["https://i.pravatar.cc/24?img=40", "https://i.pravatar.cc/24?img=41"],
    licenseUse: 20,
  },
  {
    id: 6,
    name: "Convergence",
    url: "convergence.io",
    logo: "https://i.pravatar.cc/40?img=15",
    status: "Customer" as const,
    about: "Sales CRM",
    aboutSub: "Web-based sales doc management",
    users: [
      "https://i.pravatar.cc/24?img=50",
      "https://i.pravatar.cc/24?img=51",
      "https://i.pravatar.cc/24?img=52",
    ],
    licenseUse: 10,
  },
  {
    id: 7,
    name: "Sisyphus",
    url: "sisyphus.com",
    logo: "https://i.pravatar.cc/40?img=16",
    status: "Customer" as const,
    about: "Automation and workflow",
    aboutSub: "Time tracking, invoicing and expenses",
    users: [
      "https://i.pravatar.cc/24?img=60",
      "https://i.pravatar.cc/24?img=61",
      "https://i.pravatar.cc/24?img=62",
      "https://i.pravatar.cc/24?img=63",
    ],
    licenseUse: 40,
  },
] as const;

type Company = {
  id: number;
  name: string;
  url: string;
  logo: string;
  status: "Customer" | "Churned";
  about: string;
  aboutSub: string;
  users: readonly string[];
  licenseUse: number;
};

const FILES = [
  {
    id: 1,
    name: "Tech requirements.pdf",
    size: "200 KB",
    ext: "PDF",
    dateUploaded: "Jan 4, 2025",
    lastUpdated: "Jan 4, 2025",
    uploadedBy: "Olivia Rhye",
  },
  {
    id: 2,
    name: "Dashboard screenshot.jpg",
    size: "720 KB",
    ext: "JPG",
    dateUploaded: "Jan 4, 2025",
    lastUpdated: "Jan 4, 2025",
    uploadedBy: "Phoenix Baker",
  },
  {
    id: 3,
    name: "Dashboard prototype recording.mp4",
    size: "16 MB",
    ext: "MP4",
    dateUploaded: "Jan 2, 2025",
    lastUpdated: "Jan 2, 2025",
    uploadedBy: "Lana Steiner",
  },
  {
    id: 4,
    name: "Dashboard prototype FINAL.fig",
    size: "4.2 MB",
    ext: "FIG",
    dateUploaded: "Jan 6, 2025",
    lastUpdated: "Jan 6, 2025",
    uploadedBy: "Demi Wilkinson",
  },
  {
    id: 5,
    name: "UX Design Guidelines.docx",
    size: "400 KB",
    ext: "DOCX",
    dateUploaded: "Jan 8, 2025",
    lastUpdated: "Jan 8, 2025",
    uploadedBy: "Candice Wu",
  },
  {
    id: 6,
    name: "Dashboard interaction.aep",
    size: "12 MB",
    ext: "AEP",
    dateUploaded: "Jan 6, 2025",
    lastUpdated: "Jan 6, 2025",
    uploadedBy: "Natali Craig",
  },
  {
    id: 7,
    name: "Briefing call recording.mp3",
    size: "18.6 MB",
    ext: "MP3",
    dateUploaded: "Jan 4, 2025",
    lastUpdated: "Jan 4, 2025",
    uploadedBy: "Drew Cano",
  },
] as const;

type FileRow = {
  id: number;
  name: string;
  size: string;
  ext: string;
  dateUploaded: string;
  lastUpdated: string;
  uploadedBy: string;
};

// ── 1. Team Members ───────────────────────────────────────────────────────────

export const TeamMembers: Story = {
  name: "Team members",
  args: {},
  render: () => {
    const [selected, setSelected] = useState<"all" | Set<Key>>(new Set());
    return (
      <TableCard.Root>
        <TableCard.Header
          title="Team members"
          badge={String(TEAM_MEMBERS.length)}
          description="Manage your team and their account permissions here."
          contentTrailing={
            <div className="flex gap-3">
              <Button color="secondary" size="sm">
                Export
              </Button>
              <Button color="primary" size="sm" iconLeading={<UploadCloud className="size-4" />}>
                Upload
              </Button>
            </div>
          }
        />
        <Table
          aria-label="Team members"
          selectionMode="multiple"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <Table.Header>
            <Table.Head label="Name" isRowHeader />
            <Table.Head label="Status" />
            <Table.Head label="Role" />
            <Table.Head label="Teams" />
            <Table.Head label="" />
          </Table.Header>
          <Table.Body items={TEAM_MEMBERS as unknown as TeamMember[]}>
            {(row) => (
              <Table.Row id={row.id}>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <Avatar src={row.avatar} size="md" />
                    <CellText primary={row.name} secondary={row.email} />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <BadgeWithDot
                    color={row.status === "Active" ? "success" : "gray"}
                    size="sm"
                    variant="outline"
                  >
                    {row.status}
                  </BadgeWithDot>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-sm text-tertiary">{row.role}</span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex flex-wrap gap-1">
                    {row.teams.map((t) => (
                      <Badge key={t} color="brand" size="sm" variant="soft">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <TableRowActionsDropdown />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </TableCard.Root>
    );
  },
};

// ── 2. Customers (avatar + status + progress) ─────────────────────────────────

export const Customers: Story = {
  name: "Customers (avatar + status + progress)",
  args: {},
  render: () => {
    const [sort, setSort] = useState<SortDescriptor>({ column: "name", direction: "ascending" });
    const sorted = [...COMPANIES].sort((a, b) => {
      const dir = sort.direction === "ascending" ? 1 : -1;
      return (
        String((a as unknown as Record<string, unknown>)[sort.column as string]).localeCompare(
          String((b as unknown as Record<string, unknown>)[sort.column as string])
        ) * dir
      );
    });
    return (
      <TableCard.Root>
        <TableCard.Header
          title="Customers"
          description="These companies have purchased in the last 12 months."
        />
        <Table aria-label="Customers" sortDescriptor={sort} onSortChange={setSort}>
          <Table.Header>
            <Table.Head label="Company" id="name" isRowHeader allowsSorting />
            <Table.Head label="Status" id="status" allowsSorting />
            <Table.Head label="About" id="about" />
            <Table.Head label="Users" />
            <Table.Head label="License use" id="licenseUse" allowsSorting />
            <Table.Head label="" />
          </Table.Header>
          <Table.Body items={sorted as unknown as Company[]}>
            {(row) => (
              <Table.Row id={row.id}>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <Avatar src={row.logo} size="md" />
                    <CellText primary={row.name} secondary={row.url} />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <BadgeWithDot
                    color={row.status === "Customer" ? "success" : "gray"}
                    size="sm"
                    variant="outline"
                  >
                    {row.status}
                  </BadgeWithDot>
                </Table.Cell>
                <Table.Cell>
                  <CellText primary={row.about} secondary={row.aboutSub} />
                </Table.Cell>
                <Table.Cell>
                  <AvatarGroup srcs={row.users as unknown as string[]} max={4} />
                </Table.Cell>
                <Table.Cell>
                  <ProgressBar value={row.licenseUse} />
                </Table.Cell>
                <Table.Cell>
                  <TableRowActionsDropdown />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </TableCard.Root>
    );
  },
};

// ── 3. Files uploaded (checkboxes + file type icons) ─────────────────────────

export const FilesUploaded: Story = {
  name: "Files uploaded (checkbox + file icons)",
  args: {},
  render: () => {
    const [selected, setSelected] = useState<"all" | Set<Key>>(new Set());
    return (
      <TableCard.Root>
        <TableCard.Header
          title="Files uploaded"
          contentTrailing={
            <div className="flex gap-3">
              <Button color="tertiary" size="sm">
                Tertiary
              </Button>
              <Button color="secondary" size="sm">
                Secondary
              </Button>
              <Button color="secondary" size="sm">
                Secondary
              </Button>
              <Button color="primary" size="sm">
                Primary
              </Button>
            </div>
          }
        />
        <Table
          aria-label="Files uploaded"
          selectionMode="multiple"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <Table.Header>
            <Table.Head label="File name" isRowHeader />
            <Table.Head label="File size" />
            <Table.Head label="Date uploaded" />
            <Table.Head label="Last updated" />
            <Table.Head label="Uploaded by" />
            <Table.Head label="" />
          </Table.Header>
          <Table.Body items={FILES as unknown as FileRow[]}>
            {(row) => (
              <Table.Row id={row.id}>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <FileTypeIcon ext={row.ext} />
                    <CellText primary={row.name} secondary={row.size} />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-sm text-tertiary">{row.size}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-sm text-tertiary">{row.dateUploaded}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-sm text-tertiary">{row.lastUpdated}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-sm text-tertiary">{row.uploadedBy}</span>
                </Table.Cell>
                <Table.Cell>
                  <TableRowActionsDropdown />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </TableCard.Root>
    );
  },
};

// ── 4. Sortable columns ───────────────────────────────────────────────────────

export const SortableColumns: Story = {
  name: "Sortable columns",
  args: {},
  render: () => {
    const [sort, setSort] = useState<SortDescriptor>({ column: "name", direction: "ascending" });
    const sorted = [...TEAM_MEMBERS].sort((a, b) => {
      const dir = sort.direction === "ascending" ? 1 : -1;
      return (
        String((a as unknown as Record<string, unknown>)[sort.column as string]).localeCompare(
          String((b as unknown as Record<string, unknown>)[sort.column as string])
        ) * dir
      );
    });
    return (
      <TableCard.Root>
        <TableCard.Header title="Team members" badge={String(TEAM_MEMBERS.length)} />
        <Table aria-label="Team members" sortDescriptor={sort} onSortChange={setSort}>
          <Table.Header>
            <Table.Head label="Name" id="name" isRowHeader allowsSorting />
            <Table.Head label="Role" id="role" allowsSorting />
            <Table.Head label="Status" id="status" allowsSorting />
            <Table.Head label="Teams" />
          </Table.Header>
          <Table.Body items={sorted as unknown as TeamMember[]}>
            {(row) => (
              <Table.Row id={row.id}>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <Avatar src={row.avatar} size="sm" />
                    <CellText primary={row.name} secondary={row.email} />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-sm text-tertiary">{row.role}</span>
                </Table.Cell>
                <Table.Cell>
                  <BadgeWithDot
                    color={row.status === "Active" ? "success" : "gray"}
                    size="sm"
                    variant="outline"
                  >
                    {row.status}
                  </BadgeWithDot>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex flex-wrap gap-1">
                    {row.teams.map((t) => (
                      <Badge key={t} color="brand" size="sm" variant="soft">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </TableCard.Root>
    );
  },
};

// ── 5. Editable rows (inline editing) ────────────────────────────────────────

const EDITABLE_ROWS_INITIAL = [
  { id: 1, name: "Olivia Rhye", role: "Product Designer", email: "olivia@untitledui.com" },
  { id: 2, name: "Phoenix Baker", role: "Product Manager", email: "phoenix@untitledui.com" },
  { id: 3, name: "Lana Steiner", role: "Frontend Engineer", email: "lana@untitledui.com" },
  { id: 4, name: "Demi Wilkinson", role: "Backend Engineer", email: "demi@untitledui.com" },
];

export const EditableRows: Story = {
  name: "Editable rows (inline editing)",
  args: {},
  render: () => {
    const [rows, setRows] = useState(EDITABLE_ROWS_INITIAL);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [draft, setDraft] = useState<{ name: string; role: string; email: string } | null>(null);

    function startEdit(row: (typeof EDITABLE_ROWS_INITIAL)[number]) {
      setEditingId(row.id);
      setDraft({ name: row.name, role: row.role, email: row.email });
    }
    function saveEdit(id: number) {
      if (!draft) return;
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...draft } : r)));
      setEditingId(null);
      setDraft(null);
    }
    function cancelEdit() {
      setEditingId(null);
      setDraft(null);
    }

    return (
      <TableCard.Root>
        <TableCard.Header
          title="Team members"
          description="Click ⋮ and choose Edit to modify a row inline."
        />
        <Table aria-label="Editable team members">
          <Table.Header>
            <Table.Head label="Name" isRowHeader />
            <Table.Head label="Role" />
            <Table.Head label="Email" />
            <Table.Head label="" />
          </Table.Header>
          <Table.Body items={rows}>
            {(row) => {
              const isEditing = editingId === row.id;
              return (
                <Table.Row id={row.id}>
                  <Table.Cell>
                    {isEditing && draft ? (
                      <input
                        className="w-full rounded-md border border-primary bg-primary px-3 py-1.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-brand-500"
                        value={draft.name}
                        onChange={(e) => setDraft((d) => d && { ...d, name: e.target.value })}
                        aria-label="Name"
                      />
                    ) : (
                      <span className="text-sm font-medium text-primary">{row.name}</span>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isEditing && draft ? (
                      <input
                        className="w-full rounded-md border border-primary bg-primary px-3 py-1.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-brand-500"
                        value={draft.role}
                        onChange={(e) => setDraft((d) => d && { ...d, role: e.target.value })}
                        aria-label="Role"
                      />
                    ) : (
                      <span className="text-sm text-tertiary">{row.role}</span>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isEditing && draft ? (
                      <input
                        className="w-full rounded-md border border-primary bg-primary px-3 py-1.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-brand-500"
                        value={draft.email}
                        onChange={(e) => setDraft((d) => d && { ...d, email: e.target.value })}
                        aria-label="Email"
                      />
                    ) : (
                      <span className="text-sm text-tertiary">{row.email}</span>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isEditing ? (
                      <div className="flex gap-2">
                        <Button color="primary" size="sm" onPress={() => saveEdit(row.id)}>
                          Save
                        </Button>
                        <Button color="secondary" size="sm" onPress={cancelEdit}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <TableRowActionsDropdown>
                        <Dropdown.Item icon={Edit01} onAction={() => startEdit(row)}>
                          <span className="pr-4">Edit</span>
                        </Dropdown.Item>
                        <Dropdown.Item
                          icon={Trash01}
                          className="text-error-primary"
                          onAction={() => setRows((prev) => prev.filter((r) => r.id !== row.id))}
                        >
                          <span className="pr-4">Delete</span>
                        </Dropdown.Item>
                      </TableRowActionsDropdown>
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            }}
          </Table.Body>
        </Table>
      </TableCard.Root>
    );
  },
};

// ── 6. Single selection ───────────────────────────────────────────────────────

export const SingleSelection: Story = {
  name: "Single selection",
  args: {},
  render: () => {
    const [selected, setSelected] = useState<"all" | Set<Key>>(new Set());
    const selectedId = selected !== "all" ? [...selected][0] : null;
    const selectedMember = TEAM_MEMBERS.find((m) => m.id === selectedId);
    return (
      <div className="space-y-3">
        <p className="text-sm text-tertiary">
          Selected:{" "}
          <span className="font-medium text-primary">{selectedMember?.name ?? "None"}</span>
        </p>
        <TableCard.Root>
          <TableCard.Header title="Team members" badge={String(TEAM_MEMBERS.length)} />
          <Table
            aria-label="Team members"
            selectionMode="single"
            selectedKeys={selected}
            onSelectionChange={setSelected}
          >
            <Table.Header>
              <Table.Head label="Name" isRowHeader />
              <Table.Head label="Role" />
              <Table.Head label="Status" />
            </Table.Header>
            <Table.Body items={TEAM_MEMBERS as unknown as TeamMember[]}>
              {(row) => (
                <Table.Row id={row.id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar src={row.avatar} size="sm" />
                      <CellText primary={row.name} secondary={row.email} />
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm text-tertiary">{row.role}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <BadgeWithDot
                      color={row.status === "Active" ? "success" : "gray"}
                      size="sm"
                      variant="outline"
                    >
                      {row.status}
                    </BadgeWithDot>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </TableCard.Root>
      </div>
    );
  },
};

// ── 7. Multiple selection (checkbox) ─────────────────────────────────────────

export const MultipleSelection: Story = {
  name: "Multiple selection (checkbox)",
  args: {},
  render: () => {
    const [selected, setSelected] = useState<"all" | Set<Key>>(new Set());
    const count = selected === "all" ? TEAM_MEMBERS.length : selected.size;
    return (
      <div className="space-y-3">
        <p className="text-sm text-tertiary">
          {count === 0 ? "No rows selected" : `${count} row${count > 1 ? "s" : ""} selected`}
        </p>
        <TableCard.Root>
          <TableCard.Header title="Team members" badge={String(TEAM_MEMBERS.length)} />
          <Table
            aria-label="Team members"
            selectionMode="multiple"
            selectedKeys={selected}
            onSelectionChange={setSelected}
          >
            <Table.Header>
              <Table.Head label="Name" isRowHeader />
              <Table.Head label="Role" />
              <Table.Head label="Status" />
              <Table.Head label="" />
            </Table.Header>
            <Table.Body items={TEAM_MEMBERS as unknown as TeamMember[]}>
              {(row) => (
                <Table.Row id={row.id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar src={row.avatar} size="sm" />
                      <CellText primary={row.name} secondary={row.email} />
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm text-tertiary">{row.role}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <BadgeWithDot
                      color={row.status === "Active" ? "success" : "gray"}
                      size="sm"
                      variant="outline"
                    >
                      {row.status}
                    </BadgeWithDot>
                  </Table.Cell>
                  <Table.Cell>
                    <TableRowActionsDropdown />
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </TableCard.Root>
      </div>
    );
  },
};

// ── 8. Size sm ────────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: "Size sm (compact)",
  args: {},
  render: () => (
    <TableCard.Root size="sm">
      <TableCard.Header title="Team members" badge={String(TEAM_MEMBERS.length)} />
      <Table aria-label="Team members" size="sm">
        <Table.Header>
          <Table.Head label="Name" isRowHeader />
          <Table.Head label="Role" />
          <Table.Head label="Status" />
          <Table.Head label="" />
        </Table.Header>
        <Table.Body items={TEAM_MEMBERS as unknown as TeamMember[]}>
          {(row) => (
            <Table.Row id={row.id}>
              <Table.Cell>
                <div className="flex items-center gap-2">
                  <Avatar src={row.avatar} size="xs" />
                  <span className="text-sm font-medium text-primary">{row.name}</span>
                </div>
              </Table.Cell>
              <Table.Cell>
                <span className="text-sm text-tertiary">{row.role}</span>
              </Table.Cell>
              <Table.Cell>
                <BadgeWithDot
                  color={row.status === "Active" ? "success" : "gray"}
                  size="sm"
                  variant="outline"
                >
                  {row.status}
                </BadgeWithDot>
              </Table.Cell>
              <Table.Cell>
                <TableRowActionsDropdown />
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </TableCard.Root>
  ),
};

// ── 9. All States ─────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  args: {},
  render: () => (
    <div className="flex flex-col gap-10">
      <div>
        <p className="mb-2 text-xs text-quaternary">
          Team members — multiple selection, avatar, badge, md size
        </p>
        <TableCard.Root>
          <TableCard.Header
            title="Team members"
            badge="6"
            description="Manage your team and their account permissions here."
            contentTrailing={
              <div className="flex gap-3">
                <Button color="secondary" size="sm">
                  Export
                </Button>
                <Button color="primary" size="sm">
                  Add member
                </Button>
              </div>
            }
          />
          <Table aria-label="Team members" selectionMode="multiple">
            <Table.Header>
              <Table.Head label="Name" isRowHeader />
              <Table.Head label="Status" />
              <Table.Head label="Role" />
              <Table.Head label="" />
            </Table.Header>
            <Table.Body items={TEAM_MEMBERS.slice(0, 4) as unknown as TeamMember[]}>
              {(row) => (
                <Table.Row id={row.id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar src={row.avatar} size="md" />
                      <CellText primary={row.name} secondary={row.email} />
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <BadgeWithDot
                      color={row.status === "Active" ? "success" : "gray"}
                      size="sm"
                      variant="outline"
                    >
                      {row.status}
                    </BadgeWithDot>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm text-tertiary">{row.role}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <TableRowActionsDropdown />
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </TableCard.Root>
      </div>

      <div>
        <p className="mb-2 text-xs text-quaternary">
          Customers — sortable, company avatar, status badge, avatar group, progress bar
        </p>
        <TableCard.Root>
          <TableCard.Header
            title="Customers"
            description="These companies have purchased in the last 12 months."
          />
          <Table aria-label="Customers">
            <Table.Header>
              <Table.Head label="Company" isRowHeader />
              <Table.Head label="Status" />
              <Table.Head label="Users" />
              <Table.Head label="License use" />
              <Table.Head label="" />
            </Table.Header>
            <Table.Body items={COMPANIES.slice(0, 4) as unknown as Company[]}>
              {(row) => (
                <Table.Row id={row.id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar src={row.logo} size="md" />
                      <CellText primary={row.name} secondary={row.url} />
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <BadgeWithDot
                      color={row.status === "Customer" ? "success" : "gray"}
                      size="sm"
                      variant="outline"
                    >
                      {row.status}
                    </BadgeWithDot>
                  </Table.Cell>
                  <Table.Cell>
                    <AvatarGroup srcs={row.users as unknown as string[]} max={4} />
                  </Table.Cell>
                  <Table.Cell>
                    <ProgressBar value={row.licenseUse} />
                  </Table.Cell>
                  <Table.Cell>
                    <TableRowActionsDropdown />
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </TableCard.Root>
      </div>

      <div>
        <p className="mb-2 text-xs text-quaternary">
          Files uploaded — checkboxes, file type icons, compact sm size
        </p>
        <TableCard.Root size="sm">
          <TableCard.Header
            title="Files uploaded"
            contentTrailing={
              <div className="flex gap-3">
                <Button color="secondary" size="sm">
                  Download
                </Button>
                <Button color="primary" size="sm">
                  Upload
                </Button>
              </div>
            }
          />
          <Table aria-label="Files uploaded" selectionMode="multiple" size="sm">
            <Table.Header>
              <Table.Head label="File name" isRowHeader />
              <Table.Head label="Size" />
              <Table.Head label="Date uploaded" />
              <Table.Head label="Uploaded by" />
              <Table.Head label="" />
            </Table.Header>
            <Table.Body items={FILES.slice(0, 4) as unknown as FileRow[]}>
              {(row) => (
                <Table.Row id={row.id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <FileTypeIcon ext={row.ext} />
                      <CellText primary={row.name} secondary={row.size} />
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm text-tertiary">{row.size}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm text-tertiary">{row.dateUploaded}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm text-tertiary">{row.uploadedBy}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <TableRowActionsDropdown />
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </TableCard.Root>
      </div>
    </div>
  ),
};
