import { useState } from "react";

import { InputFile } from "./input-file";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputFile> = {
  title: "Base/Inputs/InputFile",
  component: InputFile,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible file input built on React Aria `FileTrigger`. " +
          "Pairs a read-only text field with an Upload button. " +
          "Supports single/multiple file selection, MIME type filtering, and a loading state.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    label: { control: "text" },
    hint: { control: "text" },
    placeholder: { control: "text" },
    buttonText: { control: "text" },
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
    isRequired: { control: "boolean" },
    hideRequiredIndicator: { control: "boolean" },
    isLoading: { control: "boolean" },
    allowsMultiple: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputFile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Attachment",
    placeholder: "No file chosen",
  },
};

export const WithHint: Story = {
  args: {
    label: "Resume",
    hint: "PDF or DOCX, max 5 MB.",
    placeholder: "No file chosen",
  },
};

export const Required: Story = {
  args: {
    label: "Profile photo",
    isRequired: true,
    hint: "PNG or JPG.",
    placeholder: "No file chosen",
  },
};

export const Invalid: Story = {
  args: {
    label: "Document",
    isInvalid: true,
    hint: "File type not supported.",
    placeholder: "No file chosen",
  },
};

export const Disabled: Story = {
  args: {
    label: "Attachment",
    isDisabled: true,
    placeholder: "No file chosen",
  },
};

export const Loading: Story = {
  args: {
    label: "Uploading…",
    isLoading: true,
    hint: "Please wait while the file uploads.",
    placeholder: "report.pdf",
  },
};

export const MultipleFiles: Story = {
  args: {
    label: "Attachments",
    allowsMultiple: true,
    hint: "Select one or more files.",
    buttonText: "Choose files",
    placeholder: "No files chosen",
  },
};

export const AcceptedTypes: Story = {
  args: {
    label: "Image",
    acceptedFileTypes: ["image/png", "image/jpeg", "image/webp"],
    hint: "PNG, JPG, or WebP only.",
    placeholder: "No file chosen",
  },
};

export const SizeLg: Story = {
  args: {
    size: "lg",
    label: "Large attachment",
    hint: "Any file type accepted.",
    placeholder: "No file chosen",
  },
};

// ── Interactive upload flow showcase ─────────────────────────────────────────

type UploadState = "idle" | "uploading" | "done" | "error";

function UploadShowcase() {
  const [state, setState] = useState<UploadState>("idle");
  const [hint, setHint] = useState("PNG, JPG, or PDF · max 1 MB.");

  const handleSelect = (files: FileList | null): void => {
    const file = files?.[0];
    if (!file) return;

    setState("uploading");
    setHint("Uploading, please wait…");

    setTimeout(() => {
      if (file.size > 1_048_576) {
        setState("error");
        setHint(`"${file.name}" exceeds 1 MB — choose a smaller file.`);
      } else {
        setState("done");
        setHint(`"${file.name}" uploaded successfully.`);
      }
    }, 1500);
  };

  return (
    <div className="w-80">
      <InputFile
        label="Profile photo"
        hint={hint}
        isLoading={state === "uploading"}
        isInvalid={state === "error"}
        acceptedFileTypes={["image/png", "image/jpeg", "application/pdf"]}
        onSelect={handleSelect}
        placeholder="No file chosen"
        buttonText={state === "uploading" ? "Uploading…" : "Upload"}
      />
    </div>
  );
}

export const UploadFlow: Story = {
  name: "Interactive upload flow",
  args: { label: "" },
  parameters: {
    docs: {
      description: {
        story:
          "Pick any file to walk through idle → uploading → success/error. " +
          "Files over 1 MB simulate an error state; smaller files succeed.",
      },
    },
  },
  render: () => <UploadShowcase />,
};

export const AllStates: Story = {
  name: "All states",
  args: { label: "" },
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      <InputFile label="Default" placeholder="No file chosen" />
      <InputFile label="With hint" hint="PDF or DOCX, max 5 MB." placeholder="No file chosen" />
      <InputFile label="Required" isRequired hint="Required field." placeholder="No file chosen" />
      <InputFile
        label="Invalid"
        isInvalid
        hint="File type not supported."
        placeholder="No file chosen"
      />
      <InputFile label="Disabled" isDisabled placeholder="No file chosen" />
      <InputFile label="Loading" isLoading hint="Uploading…" placeholder="report.pdf" />
      <InputFile size="lg" label="Large" hint="Any file type." placeholder="No file chosen" />
    </div>
  ),
};
