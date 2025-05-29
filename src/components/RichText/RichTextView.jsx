import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import PropTypes from "prop-types";

function RichTextView({ value }) {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: value,
    autofocus: false,
    editable: false,
  });

  // Update content when `value` changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [editor, value]);

  return <EditorContent editor={editor} />;
}

RichTextView.propTypes = {
  value: PropTypes.string,
};

export default RichTextView;
