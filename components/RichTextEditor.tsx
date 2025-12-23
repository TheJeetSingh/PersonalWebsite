"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import LinkExtension from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { useEffect, useState, useCallback } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const COLORS = [
  { name: "Black", value: "#000000" },
  { name: "Dark Gray", value: "#374151" },
  { name: "Red", value: "#DC2626" },
  { name: "Orange", value: "#EA580C" },
  { name: "Yellow", value: "#CA8A04" },
  { name: "Green", value: "#16A34A" },
  { name: "Blue", value: "#2563EB" },
  { name: "Purple", value: "#9333EA" },
  { name: "Pink", value: "#DB2777" },
];

const FONTS = [
  { name: "Default", value: "" },
  { name: "Lacquer", value: "var(--font-lacquer)" },
  { name: "Barrio", value: "var(--font-barrio)" },
  { name: "Schoolbell", value: "var(--font-schoolbell)" },
  { name: "Bungee Spice", value: "var(--font-bungee-spice)" },
  { name: "Luckiest Guy", value: "var(--font-luckiest-guy)" },
  { name: "DynaPuff", value: "var(--font-dyna-puff)" },
  { name: "Bouncy", value: "var(--font-bouncy)" },
];

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing your epic blog post...",
}: RichTextEditorProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [isInternalUpdate, setIsInternalUpdate] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      TextStyle,
      Color,
      FontFamily,
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      setIsInternalUpdate(true);
      const html = editor.getHTML();
      onChange(html);
      // Reset flag after a tick
      setTimeout(() => setIsInternalUpdate(false), 0);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[400px] focus:outline-none text-black",
        style: "color: #000000;",
      },
    },
  });

  // Sync content from props to editor (only when content changes externally)
  useEffect(() => {
    if (editor && !isInternalUpdate) {
      const currentContent = editor.getHTML();
      // Only update if content is significantly different (not just whitespace differences)
      if (content !== currentContent && content !== undefined) {
        editor.commands.setContent(content || "", false);
      }
    }
  }, [content, editor, isInternalUpdate]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = () => {
      setShowColorPicker(false);
      setShowFontPicker(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const runCommand = useCallback(
    (command: () => void) => {
      return (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        command();
      };
    },
    []
  );

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
    setShowColorPicker(false);
  };

  const setFont = (font: string) => {
    if (font) {
      editor.chain().focus().setFontFamily(font).run();
    } else {
      editor.chain().focus().unsetFontFamily().run();
    }
    setShowFontPicker(false);
  };

  const currentColor = editor.getAttributes("textStyle").color || "#000000";
  const currentFont = editor.getAttributes("textStyle").fontFamily || "";

  return (
    <div className="border-4 border-black bg-white">
      {/* Toolbar */}
      <div className="border-b-4 border-black p-2 flex flex-wrap gap-1 bg-gray-50">
        {/* Bold */}
        <ToolbarButton
          onMouseDown={runCommand(() => editor.chain().focus().toggleBold().run())}
          active={editor.isActive("bold")}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </ToolbarButton>
        {/* Italic */}
        <ToolbarButton
          onMouseDown={runCommand(() => editor.chain().focus().toggleItalic().run())}
          active={editor.isActive("italic")}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </ToolbarButton>
        {/* Underline - using strike as TipTap doesn't have underline in StarterKit */}
        <ToolbarButton
          onMouseDown={runCommand(() => editor.chain().focus().toggleStrike().run())}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <s>S</s>
        </ToolbarButton>
        {/* Code */}
        <ToolbarButton
          onMouseDown={runCommand(() => editor.chain().focus().toggleCode().run())}
          active={editor.isActive("code")}
          title="Inline Code"
        >
          {"</>"}
        </ToolbarButton>

        <div className="w-px bg-black mx-1" />

        {/* Font Picker */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              setShowFontPicker(!showFontPicker);
              setShowColorPicker(false);
            }}
            title="Font Family"
            className="px-2 py-1 text-sm font-bold border-2 border-black bg-white hover:bg-gray-100 flex items-center gap-1 min-w-[80px]"
          >
            <span className="truncate">
              {FONTS.find((f) => f.value === currentFont)?.name || "Font"}
            </span>
            <span>▼</span>
          </button>
          {showFontPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border-4 border-black shadow-[4px_4px_0_#000] z-50 min-w-[150px]">
              {FONTS.map((font) => (
                <button
                  key={font.name}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setFont(font.value);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 border-b border-gray-200 last:border-b-0 ${
                    currentFont === font.value ? "bg-gray-200" : ""
                  }`}
                  style={{ fontFamily: font.value || "inherit" }}
                >
                  {font.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Color Picker */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              setShowColorPicker(!showColorPicker);
              setShowFontPicker(false);
            }}
            title="Text Color"
            className="px-2 py-1 text-sm font-bold border-2 border-black bg-white hover:bg-gray-100 flex items-center gap-1"
          >
            <span
              className="w-4 h-4 border border-black"
              style={{ backgroundColor: currentColor }}
            />
            <span>A</span>
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border-4 border-black shadow-[4px_4px_0_#000] p-2 z-50 grid grid-cols-3 gap-1">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setColor(color.value);
                  }}
                  title={color.name}
                  className="w-8 h-8 border-2 border-black hover:scale-110 transition-transform"
                  style={{ backgroundColor: color.value }}
                />
              ))}
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().unsetColor().run();
                  setShowColorPicker(false);
                }}
                title="Reset to Black"
                className="col-span-3 px-2 py-1 text-xs font-bold border-2 border-black bg-gray-100 hover:bg-gray-200"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        <div className="w-px bg-black mx-1" />

        {/* Headings */}
        <ToolbarButton
          onMouseDown={runCommand(() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          )}
          active={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={runCommand(() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          )}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={runCommand(() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          )}
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          H3
        </ToolbarButton>

        <div className="w-px bg-black mx-1" />

        {/* Lists */}
        <ToolbarButton
          onMouseDown={runCommand(() => editor.chain().focus().toggleBulletList().run())}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          •
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={runCommand(() => editor.chain().focus().toggleOrderedList().run())}
          active={editor.isActive("orderedList")}
          title="Numbered List"
        >
          1.
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={runCommand(() => editor.chain().focus().toggleBlockquote().run())}
          active={editor.isActive("blockquote")}
          title="Quote"
        >
          &ldquo;
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={runCommand(() => editor.chain().focus().toggleCodeBlock().run())}
          active={editor.isActive("codeBlock")}
          title="Code Block"
        >
          {"{ }"}
        </ToolbarButton>

        <div className="w-px bg-black mx-1" />

        {/* Links */}
        <ToolbarButton
          onMouseDown={(e) => {
            e.preventDefault();
            addLink();
          }}
          active={editor.isActive("link")}
          title="Add Link"
        >
          🔗
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={runCommand(() => editor.chain().focus().unsetLink().run())}
          active={false}
          title="Remove Link"
          disabled={!editor.isActive("link")}
        >
          ✂️
        </ToolbarButton>

        <div className="w-px bg-black mx-1" />

        {/* Other */}
        <ToolbarButton
          onMouseDown={runCommand(() => editor.chain().focus().setHorizontalRule().run())}
          active={false}
          title="Horizontal Rule"
        >
          ―
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={runCommand(() => editor.chain().focus().undo().run())}
          active={false}
          title="Undo (Ctrl+Z)"
          disabled={!editor.can().undo()}
        >
          ↩
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={runCommand(() => editor.chain().focus().redo().run())}
          active={false}
          title="Redo (Ctrl+Y)"
          disabled={!editor.can().redo()}
        >
          ↪
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <div className="p-4 text-black" style={{ color: "#000000" }}>
        <EditorContent editor={editor} />
      </div>

      {/* Status bar */}
      <div className="border-t-2 border-gray-200 px-4 py-2 text-xs text-gray-500 flex justify-between">
        <span>
          {editor.getText().split(/\s+/).filter(Boolean).length} words
        </span>
        <span>
          {editor.getText().length} characters
        </span>
      </div>
    </div>
  );
}

function ToolbarButton({
  children,
  onMouseDown,
  active,
  title,
  disabled,
}: {
  children: React.ReactNode;
  onMouseDown: (e: React.MouseEvent) => void;
  active: boolean;
  title: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      disabled={disabled}
      title={title}
      className={`px-2 py-1 text-sm font-bold border-2 border-black transition-all select-none ${
        active
          ? "bg-black text-white shadow-[2px_2px_0_#333]"
          : "bg-white text-black hover:bg-gray-100"
      } ${disabled ? "opacity-40 cursor-not-allowed" : "hover:translate-x-[-1px] hover:translate-y-[-1px]"}`}
    >
      {children}
    </button>
  );
}
