import React, { useState } from 'react';
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

function MyBlockNoteEditor() {
    const [html, setHTML] = useState("");
    const editor = useBlockNote({
        onEditorContentChange: (editor) => {
            const saveBlocksAsHTML = async () => {
                const html = await editor.blocksToHTMLLossy(editor.topLevelBlocks);
                setHTML(html);
            };
            saveBlocksAsHTML();
        }
    });
    return (
        <div>
            <div className="blocknote-view" data-theme="light">
                <div className="notepa-container">
                    <div className="justify-content-start mx-3 my-3 notepad-bock">
                        <div className="">
                            <BlockNoteView editor={editor} theme={"light"} />
                        </div>
                    </div>
                </div>
            </div>
            <pre>{html}</pre>
        </div>
    );
}

export default MyBlockNoteEditor;
