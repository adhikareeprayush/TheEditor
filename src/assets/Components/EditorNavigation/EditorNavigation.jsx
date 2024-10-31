import { useState } from "react";
import maximizeWhite from "../../Icons/maximizeWhite.svg";
import brightnessWhite from "../../Icons/brightnessWhite.svg";
import shareWhite from "../../Icons/shareWhite.svg";

const EditorNavigation = ({ setOutput, code }) => {
    const [loading, setLoading] = useState(false); // Loading state

    const runCode = async (code, input = "") => { // Accept input parameter
        if (!code) {
            setOutput("No code to run.");
            return;
        }

        setLoading(true); // Start loading
        setOutput(""); // Clear previous output

        try {
            const response = await fetch("https://coderunner-yrwm.onrender.com/execute_code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code, input }), // Send both code and input
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setOutput((prevOutput) => prevOutput + "\n" + (data.output || data.error || "No output received.")); // Append new output
        } catch (error) {
            console.error("Execution error:", error);
            setOutput("An error occurred while running the code.");
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="navigation">
            <div className="editor-nav">
                <div className="file-name">
                    <p>main.py</p>
                </div>
                <div className="editor-nav-btns">
                    <button className="btn btn-secondary">
                        <img src={maximizeWhite} alt="Maximize" />
                    </button>
                    <button className="btn btn-secondary">
                        <img src={brightnessWhite} alt="Adjust brightness" />
                    </button>
                    <button className="btn btn-secondary">
                        <img src={shareWhite} alt="Share" />
                        <p>Share</p>
                    </button>
                    <button
                        className="btn btn-secondary run-btn"
                        onClick={() => runCode(code)} // Run code without input on button click
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Running...' : 'Run'} {/* Show loading text */}
                    </button>
                </div>
            </div>
            <div className="output-nav">
                <p>Output</p>
                <button
                    className="btn btn-secondary"
                    onClick={() => setOutput("")}
                >
                    Clear Output
                </button>
            </div>
        </div>
    );
};

export default EditorNavigation;
