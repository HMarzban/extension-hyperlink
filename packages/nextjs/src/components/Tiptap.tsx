import { useEditor, EditorContent, FloatingMenu, Editor as TiptapEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Hyperlink from "@docsplus/extension-hyperlink";
import { useCallback } from "react";
import createHyperlinkModal from "./modals/modal/previewHyperlink";
import setHyperlinks from "./modals/modal/setHyperlink";
// make sure import this arrow.css
import "tippy.js/dist/svg-arrow.css";

const MenuBar: React.FC<{ editor: TiptapEditor | null }> = ({ editor }) => {
  const setLink = useCallback(() => {
    if (!editor) {
      return null;
    }
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("hyperlink").unsetHyperlink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("hyperlink").setHyperlink({ href: url }).run();
  }, [editor]);

  const editHuperLinkText = useCallback(() => {
    if (!editor) {
      return null;
    }
    const { from, to } = editor.view.state.selection;
    const selectedNode = editor.view.domAtPos(from - 1).node as HTMLElement;

    let link: HTMLAnchorElement | null = null;

    if (selectedNode?.nodeName === "#text") {
      link = (selectedNode.parentNode as HTMLElement)?.closest("a");
    } else {
      link = selectedNode?.closest("a");
    }

    const newText = window.prompt("Edit Hyperlink Text", link?.innerText);

    if (newText === null) return;

    editor.chain().focus().editHyperLinkText(newText);
  }, [editor]);

  const editHuperLinkHref = useCallback(() => {
    if (!editor) {
      return null;
    }
    const previousUrl = editor.getAttributes("link").href;

    const newURL = window.prompt("Edit Hyperlink URL", previousUrl);

    if (newURL === null) return;

    editor.chain().focus().editHyperLinkHref(newURL);
  }, [editor]);

  const getHyperLinkMetadata = useCallback(() => {
    if (!editor) {
      return null;
    }

    const getData = async () => {
      // const data = await editor.chain().focus().getHyperlinkMetadata();
      // console.log(data, "data=>>>>>>>>>");
    };
    getData();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="menuBar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>hard break</button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""}
      >
        purple
      </button>

      <button
        onClick={() => editor.chain().focus().unsetHyperlink().run()}
        disabled={!editor.isActive("hyperlink")}
      >
        unsetHyperlink
      </button>

      <button onClick={editHuperLinkText} disabled={!editor.isActive("hyperlink")}>
        edit hyperlink text
      </button>

      <button onClick={editHuperLinkHref} disabled={!editor.isActive("hyperlink")}>
        edit hyperlink href
      </button>

      <button onClick={() => editor.chain().focus().setHyperlink()}>set hyperlink</button>
      <button
        onClick={() => editor.chain().focus().unsetHyperlink()}
        disabled={!editor.isActive("hyperlink")}
      >
        get hyperlink metadata
      </button>
    </div>
  );
};

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure(),
      Hyperlink.configure({
        openOnClick: true,
        modals: {
          previewHyperlink: (data) => {
            return createHyperlinkModal(data);
          },
          setHyperlink: (data) => {
            return setHyperlinks(data);
          },
        },
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: `
      <h2>
        Hi there,
      </h2>
      <p>Wow, this editor has support for links to the whole <a target="_blank" rel="noopener noreferrer nofollow" href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>. We tested a lot of URLs and I think you can add *every URL* you want. Isn’t that cool? Let’s try <a target="_blank" rel="noopener noreferrer nofollow" href="https://statamic.com/">another one!</a> Yep, seems to work.</p>

      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.digitalocean.com/">digita</a> styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>

      <p>
      Non mollit elit culpa fugiat esse ipsum in fugiat irure excepteur laboris aute. Veniam labore minim aliquip commodo id magna laboris Lorem ea sunt tempor enim minim ullamco
      <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.marktechpost.com/2023/07/10/meet-metagpt-a-gpt-4-powered-application-can-create-websites-apps-and-more-based-only-on-natural-language-prompts/">Meet MetaGPT<a/>
      eiusmod. Dolore sunt occaecat sit dolor ex commodo culpa nisi.
      <a target="_blank" rel="noopener noreferrer nofollow" href="https://dzone.com/articles/front-end-testing-tutorial-comprehensive-guide-wit">Front-end Testting</a>
      Nostrud magna deserunt ipsum Lorem veniam ullamco proident cupidatat qui
      exercitation velit Lorem incididunt enim. Cillum eiusmod
      <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.marktechpost.com/2023/07/13/top-ai-tools-for-ui-and-ux-2023/">Top AI Tools for UI and UX</a>
      sit quis et occaecat. Ipsum laboris sunt sit anim sit deserunt
      consectetur dolor eu velit elit culpa. Magna nulla ex excepteur commodo
      <a target="_blank" rel="noopener noreferrer nofollow" href="https://sourcery.ai/blog/chatgpt-maintainable-code/">Generating Code without Generating Technical Bebt?</a>
      commodo non consequat duis aliquip. Aliquip excepteur ullamco
      <a target="_blank" rel="noopener noreferrer nofollow" href="https://cloud.google.com/blog/topics/inside-google-cloud/whats-new-google-cloud">What's new with Google Cloud</a>
      fugiat est culpa.

      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class="language-css">body {
  display: none;
}</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>

      <p>Wow, this editor has support for links to the whole <a target="_blank" rel="noopener noreferrer nofollow" href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>. We tested a lot of URLs and I think you can add *every URL* you want. Isn’t that cool? Let’s try <a target="_blank" rel="noopener noreferrer nofollow" href="https://statamic.com/">another one!</a> Yep, seems to work.</p>
      <p>By default every link will get a <code>rel="noopener noreferrer nofollow"</code> attribute. It’s configurable though.</p>
    `,
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
