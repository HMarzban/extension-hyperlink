import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Hyperlink from "@docs.plus/extension-hyperlink";
import previewHyperlinkModal from "./modals/previewHyperlink";
import setHyperlinks from "./modals/setHyperlink";
import editorContents from "./editorContents";
import MenuBar from "./MenuBar";
// make sure import this arrow.css
import "tippy.js/dist/svg-arrow.css";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure(),
      Hyperlink.configure({
        hyperlinkOnPaste: false,
        openOnClick: true,
        modals: {
          previewHyperlink: (data) => {
            return previewHyperlinkModal(data);
          },
          setHyperlink: (data) => {
            return setHyperlinks(data);
          },
        },
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: editorContents,
  });

  return (
    <div className="w-[80rem] p-6 border rounded-md">
      <MenuBar editor={editor} />
      <div className="mt-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
