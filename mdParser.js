const testInputArea = document.getElementById("testArea");
const testOutputArea = document.getElementById("testDiv");

testInputArea.addEventListener('input', () => {
    testOutputArea.innerHTML = markedParserInputString(testInputArea.value)
})

const markedParserInputString = (inputText) => {
    const currentBlock = [];
    const fileToLines = (inputText).split("\n");

    if (fileToLines.length > 0) {
        let listGate = false
        let listGateOl = false
        let olNum = 1
        //Parse like starters and headers
        fileToLines.forEach(k => {
            let parsedLine = k
            if (k.startsWith("---")) {
                parsedLine = k.replace("---", "<hr>")
            } else if (k.startsWith("### ")) {
                parsedLine = k.replace("### ", "<h3>")
                parsedLine += "</h3>"
            } else if (k.startsWith("## ")) {
                parsedLine = k.replace("## ", "<h2>")
                parsedLine += "</h2>"
            } else if (k.startsWith("# ")) {
                parsedLine = k.replace("# ", "<h1>")
                parsedLine += "</h1>"
            } else if (k.startsWith("> ")) {
                parsedLine = k.replace("> ", '<blockquote>')
                parsedLine += '</blockquote>'
            } else { parsedLine += "<br>" }

            //Create Unordered lists
            if (k.startsWith("- ")) {
                    if (listGate === false) {
                        parsedLine = "<ul><li>" + k.replace("- ", "") + "</li>"
                        listGate = true
                    }
                    else {
                        parsedLine = "<li>" + k.replace("- ", "") + "</li>"
                    }
            } else 
                {if (listGate === true) { 
                parsedLine = "</ul>" + parsedLine
                listGate = false
                }
            }

            // Check for ann ordered list number and assign it properly
            if (k.startsWith(olNum + ". ")) {
                    if (listGateOl === false) {
                        parsedLine = "<ol><li>" + k.replace(olNum + ". ", "") + "</li>"
                        listGateOl = true

                    }
                    else {
                        parsedLine = "<li>" + k.replace(olNum + ". ", "") + "</li>"
                    }
                olNum += 1
            } else 
                {if (listGateOl === true) { 
                parsedLine = "</ol>" + parsedLine
                listGateOl = false
                olNum = 1
                }
            }
            currentBlock.push(parsedLine)
        });
    };

    let currentBlockString = currentBlock.join("")

    
    if (currentBlockString.includes("~~")) {
        currentBlockString = currentBlockString.replace(/\~\~(.*?)\~\~/g, "<del>$1</del>")
    };
    if (currentBlockString.includes("~")) {
        currentBlockString = currentBlockString.replace(/\~(.*?)\~/g, "<sub>$1</sub>")
    };
    if (currentBlockString.includes("^")) {
        currentBlockString = currentBlockString.replace(/\^(.*?)\^/g, "<sup>$1</sup>")
    };
    if (currentBlockString.includes("==")) {
        currentBlockString = currentBlockString.replace(/\=\=(.*?)\=\=/g, "<mark>$1</mark>")
    };
    if (currentBlockString.includes("`")) {
        currentBlockString = currentBlockString.replace(/\`(.*?)\`/g, "<code>$1</code>")
    };
    if (currentBlockString.includes("***")) {
        currentBlockString = currentBlockString.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><i>$1</i></strong>")
    };
    if (currentBlockString.includes("**")) {
        currentBlockString = currentBlockString.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    };
    if (currentBlockString.includes("*")) {
        currentBlockString = currentBlockString.replace(/\*(.*?)\*/g, "<i>$1</i>")
    };
    return currentBlockString
};


