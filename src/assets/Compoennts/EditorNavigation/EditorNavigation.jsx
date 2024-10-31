import { useEffect } from "react";
import maximizeWhite from "../../Icons/maximizeWhite.svg";
import brightnessWhite from "../../Icons/brightnessWhite.svg";
import shareWhite from "../../Icons/shareWhite.svg";

const EditorNavigation = ({ setOutput, code }) => {
    const runCode = async (code) => {
        try {
            const response = await fetch("https://coderunner-yrwm.onrender.com/execute_code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code })
            });
            if (!response.ok) {
                throw new Error("Failed to run code");
            }

            const data = await response.json();

            if (data && data.output) {
                setOutput(data.output);
            } else {
                setOutput(data.error);
            }
        } catch (error) {
            console.error(error); // Log any errors that occur during the fetch
            setOutput("An error occurred while running the code.");
        }
    };

    // useEffect to run the code when the component mounts
    useEffect(() => {
        runCode(code);
    }, []); // Dependencies array includes `code` to run code again if it changes

    return (
        <div className="navigation">
            <div className="editor-nav">
                <div className="file-name">
                    <p>main.py</p>
                </div>
                <div className="editor-nav-btns">
                    <button className="btn btn-secondary">
                        <img src={maximizeWhite} alt="" />
                    </button>
                    <button className="btn btn-secondary">
                        <img src={brightnessWhite} alt="" />
                    </button>
                    <button className="btn btn-secondary">
                        <img src={shareWhite} alt="" />
                        <p>Share</p>
                    </button>
                    <button
                        className="btn btn-secondary run-btn"
                        onClick={() => runCode(code)}
                    >
                        Run
                    </button>
                </div>
            </div>
            <div className="output-nav">
                <p>Output</p>
                <button className="btn btn-secondary"
                    onClick={() => setOutput("")}
                >Clear</button>
            </div>
        </div>
    );
};

export default EditorNavigation;
