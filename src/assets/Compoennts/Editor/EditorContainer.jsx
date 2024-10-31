import { Editor, loader } from "@monaco-editor/react";
import { useState, useEffect } from "react";

// Customize Monaco theme
const CustomTheme = () => {
    useEffect(() => {
        loader.init().then(monaco => {
            monaco.editor.defineTheme('myCustomTheme', {
                base: 'vs-dark',
                inherit: true,
                rules: [],
                colors: {
                    'editor.background': '#1c2130',
                },
            });
        });
    }, []);

    return null;
};


const EditorContainer = ({ setCode, code }) => {

    return (
        <div className="editor-container">
            <CustomTheme />
            <Editor
                height="90%"
                defaultLanguage="python"
                theme="myCustomTheme"
                defaultValue={code}
                className="editor"
                options={{
                    minimap: { enabled: false },
                    overviewRulerLanes: 0,
                    overviewRulerBorder: false,
                    scrollbar: {
                        vertical: 'hidden',
                        horizontal: 'hidden',
                    },
                }}
                onChange={(value) => setCode(value)}
            />
        </div>
    );
};

export default EditorContainer;
