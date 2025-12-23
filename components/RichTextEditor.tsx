"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import LinkExtension from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { useEffect, useState, useCallback, useRef } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

// Organized color palette
const COLORS = [
  // Grays
  { name: "Black", value: "#000000" },
  { name: "Dark Gray", value: "#374151" },
  { name: "Gray", value: "#6B7280" },
  { name: "Light Gray", value: "#9CA3AF" },
  // Reds
  { name: "Dark Red", value: "#991B1B" },
  { name: "Red", value: "#DC2626" },
  { name: "Light Red", value: "#F87171" },
  { name: "Rose", value: "#FB7185" },
  // Oranges
  { name: "Dark Orange", value: "#C2410C" },
  { name: "Orange", value: "#EA580C" },
  { name: "Light Orange", value: "#FB923C" },
  { name: "Amber", value: "#F59E0B" },
  // Yellows
  { name: "Dark Yellow", value: "#A16207" },
  { name: "Yellow", value: "#CA8A04" },
  { name: "Light Yellow", value: "#FACC15" },
  { name: "Lime", value: "#84CC16" },
  // Greens
  { name: "Dark Green", value: "#166534" },
  { name: "Green", value: "#16A34A" },
  { name: "Light Green", value: "#4ADE80" },
  { name: "Emerald", value: "#34D399" },
  // Blues
  { name: "Dark Blue", value: "#1E40AF" },
  { name: "Blue", value: "#2563EB" },
  { name: "Light Blue", value: "#60A5FA" },
  { name: "Cyan", value: "#22D3EE" },
  // Purples
  { name: "Dark Purple", value: "#6B21A8" },
  { name: "Purple", value: "#9333EA" },
  { name: "Light Purple", value: "#C084FC" },
  { name: "Violet", value: "#8B5CF6" },
  // Pinks
  { name: "Dark Pink", value: "#9D174D" },
  { name: "Pink", value: "#DB2777" },
  { name: "Light Pink", value: "#F472B6" },
  { name: "Fuchsia", value: "#E879F9" },
];

// Expanded Google Fonts
const FONTS = [
  // Default
  { name: "Default", value: "", category: "default" },

  // Serif Fonts
  { name: "Playfair Display", value: "'Playfair Display', serif", category: "serif" },
  { name: "Lora", value: "'Lora', serif", category: "serif" },
  { name: "Merriweather", value: "'Merriweather', serif", category: "serif" },
  { name: "Crimson Text", value: "'Crimson Text', serif", category: "serif" },
  { name: "Libre Baskerville", value: "'Libre Baskerville', serif", category: "serif" },
  { name: "EB Garamond", value: "'EB Garamond', serif", category: "serif" },
  { name: "Cormorant", value: "'Cormorant', serif", category: "serif" },

  // Sans-Serif Fonts
  { name: "Inter", value: "'Inter', sans-serif", category: "sans" },
  { name: "Roboto", value: "'Roboto', sans-serif", category: "sans" },
  { name: "Open Sans", value: "'Open Sans', sans-serif", category: "sans" },
  { name: "Montserrat", value: "'Montserrat', sans-serif", category: "sans" },
  { name: "Poppins", value: "'Poppins', sans-serif", category: "sans" },
  { name: "Nunito", value: "'Nunito', sans-serif", category: "sans" },
  { name: "Raleway", value: "'Raleway', sans-serif", category: "sans" },
  { name: "Work Sans", value: "'Work Sans', sans-serif", category: "sans" },
  { name: "Outfit", value: "'Outfit', sans-serif", category: "sans" },
  { name: "Space Grotesk", value: "'Space Grotesk', sans-serif", category: "sans" },

  // Display Fonts
  { name: "Bebas Neue", value: "'Bebas Neue', sans-serif", category: "display" },
  { name: "Oswald", value: "'Oswald', sans-serif", category: "display" },
  { name: "Righteous", value: "'Righteous', sans-serif", category: "display" },
  { name: "Bungee", value: "'Bungee', sans-serif", category: "display" },
  { name: "Luckiest Guy", value: "'Luckiest Guy', cursive", category: "display" },
  { name: "Bangers", value: "'Bangers', cursive", category: "display" },
  { name: "Fredoka One", value: "'Fredoka One', cursive", category: "display" },

  // Handwriting Fonts
  { name: "Dancing Script", value: "'Dancing Script', cursive", category: "handwriting" },
  { name: "Pacifico", value: "'Pacifico', cursive", category: "handwriting" },
  { name: "Caveat", value: "'Caveat', cursive", category: "handwriting" },
  { name: "Satisfy", value: "'Satisfy', cursive", category: "handwriting" },
  { name: "Great Vibes", value: "'Great Vibes', cursive", category: "handwriting" },
  { name: "Kalam", value: "'Kalam', cursive", category: "handwriting" },
  { name: "Patrick Hand", value: "'Patrick Hand', cursive", category: "handwriting" },

  // Monospace Fonts
  { name: "Fira Code", value: "'Fira Code', monospace", category: "mono" },
  { name: "JetBrains Mono", value: "'JetBrains Mono', monospace", category: "mono" },
  { name: "Source Code Pro", value: "'Source Code Pro', monospace", category: "mono" },
  { name: "IBM Plex Mono", value: "'IBM Plex Mono', monospace", category: "mono" },
];

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing your epic blog post...",
}: RichTextEditorProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [isInternalUpdate, setIsInternalUpdate] = useState(false);
  const [, forceUpdate] = useState(0); // Force re-render for toolbar state

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
    // Force toolbar to update instantly on any transaction (including bold toggle)
    onTransaction: () => {
      forceUpdate((n) => n + 1);
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
        editor.commands.setContent(content || "", { emitUpdate: false });
      }
    }
  }, [content, editor, isInternalUpdate]);

  // Refs for dropdown containers
  const fontPickerRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Check if click is outside font picker
      if (fontPickerRef.current && !fontPickerRef.current.contains(target)) {
        setShowFontPicker(false);
      }

      // Check if click is outside color picker
      if (colorPickerRef.current && !colorPickerRef.current.contains(target)) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  // Group fonts by category
  const fontsByCategory = FONTS.reduce((acc, font) => {
    if (!acc[font.category]) acc[font.category] = [];
    acc[font.category].push(font);
    return acc;
  }, {} as Record<string, typeof FONTS>);

  const categoryLabels: Record<string, string> = {
    default: "Default",
    serif: "Serif",
    sans: "Sans-Serif",
    display: "Display",
    handwriting: "Handwriting",
    mono: "Monospace",
  };

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
        <div ref={fontPickerRef} className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowFontPicker(!showFontPicker);
              setShowColorPicker(false);
            }}
            title="Font Family"
            className={`px-2 py-1 text-sm font-bold border-2 border-black bg-white hover:bg-gray-100 flex items-center gap-1 min-w-[100px] ${showFontPicker ? 'bg-gray-200' : ''}`}
          >
            <span className="truncate">
              {FONTS.find((f) => f.value === currentFont)?.name || "Font"}
            </span>
            <span>{showFontPicker ? '▲' : '▼'}</span>
          </button>
          {showFontPicker && (
            <div
              className="absolute top-full left-0 mt-1 bg-white border-4 border-black shadow-[4px_4px_0_#000] z-50 min-w-[200px] max-h-[400px] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {Object.entries(fontsByCategory).map(([category, fonts]) => (
                <div key={category}>
                  <div className="px-3 py-1 bg-gray-100 font-bold text-xs uppercase text-gray-600 border-b border-gray-300 sticky top-0">
                    {categoryLabels[category] || category}
                  </div>
                  {fonts.map((font) => (
                    <button
                      key={font.name}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setFont(font.value);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-blue-50 border-b border-gray-100 last:border-b-0 ${currentFont === font.value ? "bg-blue-100 font-bold" : ""}`}
                      style={{ fontFamily: font.value || "inherit" }}
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Color Picker */}
        <div ref={colorPickerRef} className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowColorPicker(!showColorPicker);
              setShowFontPicker(false);
            }}
            title="Text Color"
            className={`px-2 py-1 text-sm font-bold border-2 border-black bg-white hover:bg-gray-100 flex items-center gap-1 ${showColorPicker ? 'bg-gray-200' : ''}`}
          >
            <span
              className="w-4 h-4 border border-black"
              style={{ backgroundColor: currentColor }}
            />
            <span>A</span>
            <span>{showColorPicker ? '▲' : '▼'}</span>
          </button>
          {showColorPicker && (
            <div
              className="absolute top-full left-0 mt-1 bg-white border-4 border-black shadow-[4px_4px_0_#000] p-4 z-50"
            >
              {/* Color grid - 4 columns for clean rows */}
              <div className="grid grid-cols-4 gap-2 mb-3" style={{ width: '160px' }}>
                {COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setColor(color.value);
                    }}
                    title={color.name}
                    className={`w-8 h-8 border-2 hover:scale-110 transition-transform ${currentColor === color.value ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300'}`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  editor.chain().focus().unsetColor().run();
                  setShowColorPicker(false);
                }}
                title="Reset to Black"
                className="w-full px-3 py-2 text-sm font-bold border-2 border-black bg-gray-100 hover:bg-gray-200"
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
      className={`px-2 py-1 text-sm font-bold border-2 border-black transition-all select-none ${active
        ? "bg-black text-white shadow-[2px_2px_0_#333]"
        : "bg-white text-black hover:bg-gray-100"
        } ${disabled ? "opacity-40 cursor-not-allowed" : "hover:translate-x-[-1px] hover:translate-y-[-1px]"}`}
    >
      {children}
    </button>
  );
}
