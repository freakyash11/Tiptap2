import { useEditor, EditorContent } from "@tiptap/react"; // Import Tiptap editor components
import StarterKit from "@tiptap/starter-kit"; // Import default editor extensions
import Underline from "@tiptap/extension-underline"; // Import underline extension
import Link from "@tiptap/extension-link"; // Import link extension

// Define the editor extensions to be used
const extensions = [
    StarterKit, // Basic formatting and functionality
    Underline,  // Underline functionality
    Link        // Link functionality
];

// Default initial content for the editor
const content = ``;

// Tiptap Component
const Tiptap = ({ onEditorContentSave }) => {
    // Initialize the editor with the specified extensions and content
    const editor = useEditor({
        extensions,
        content,
    });

    // If the editor isn't initialized, return null (prevents rendering errors)
    if (!editor) {
        return null;
    }

    // Handle saving the editor's content
    const handleEditorContent = () => {
        const html = editor.getHTML(); // Get the editor's content as HTML
        onEditorContentSave(html);    // Pass the content to the parent component
    };

    return (
        <div className="m-8">
            {/* Toolbar for text formatting options */}
            <div className="w-full flex flex-wrap bg-yellow-600 p-3 gap-3 text-white">
                {/* Bold button */}
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    <strong>B</strong>
                </button>

                {/* Italic button */}
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    I
                </button>

                {/* Underline button */}
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'is-active' : ''}
                >
                    U
                </button>

                {/* Strike-through button */}
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    Strike
                </button>

                {/* Code mark button */}
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                    Code
                </button>

                {/* Clear marks */}
                <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                    Clear marks
                </button>

                {/* Clear nodes */}
                <button onClick={() => editor.chain().focus().clearNodes().run()}>
                    Clear nodes
                </button>

                {/* Paragraph formatting */}
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    Paragraph
                </button>

                {/* Heading buttons (H1 to H6) */}
                {Array.from({ length: 6 }).map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => editor.chain().focus().toggleHeading({ level: index + 1 }).run()}
                        className={editor.isActive('heading', { level: index + 1 }) ? 'is-active' : ''}
                    >
                        H{index + 1}
                    </button>
                ))}

                {/* Bullet list button */}
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    bl
                </button>

                {/* Ordered list button */}
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    ol
                </button>

                {/* Code block button */}
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    Code block
                </button>

                {/* Blockquote button */}
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                    Blockquote
                </button>

                {/* Horizontal rule button */}
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    Horizontal rule
                </button>

                {/* Hard break button */}
                <button onClick={() => editor.chain().focus().setHardBreak().run()}>
                    Hard break
                </button>

                {/* Undo and redo buttons */}
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                >
                    Undo
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                >
                    Redo
                </button>
            </div>

            {/* Editor content area */}
            <div className="border border-gray-500 border-t-0">
                <EditorContent editor={editor} className="max-h-96 overflow-y-scroll" />
            </div>

            {/* Save button */}
            <button
                onClick={handleEditorContent}
                className="bg-blue-400 px-2 py-1 rounded-md mt-5"
            >
                Save
            </button>
        </div>
    );
};

export default Tiptap;
