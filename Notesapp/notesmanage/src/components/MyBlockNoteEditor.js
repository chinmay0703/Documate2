import { useEffect } from 'react';
import { BlockNoteEditor, BlockNoteView, useBlockNote } from '@blocknote/react';

const YourComponent = () => {
  const editor = useBlockNote({ editable: false });

  useEffect(() => {
    const notetext = "dsdkm dsnfj\n\n## asnjsa\n\n![Sample Image](https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png)\n";

    const parseAndDisplay = async () => {
      const parsedBlocks = await editor.tryParseMarkdownToBlocks(notetext);
      editor.replaceBlocks(editor.topLevelBlocks, parsedBlocks);
    };

    parseAndDisplay();
  }, [editor]);

  return (
    <div>
      <div>
        <BlockNoteView editor={editor} theme={'light'} />
      </div>
    </div>
  );
};

export default YourComponent;
