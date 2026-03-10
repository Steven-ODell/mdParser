const testInputArea = document.getElementById("testArea");
const testOutputArea = document.getElementById("testDiv");

const testFile = await fetch("newtestfile.txt");
const testString = await testFile.text();

testInputArea.value = testString

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
                parsedLine = k.replace("> ", '<blockquote>"')
                parsedLine += '"</blockquote>'
            } else { parsedLine += "<br>" }

            //Create Unordered lists
            if (k.startsWith("- ") || k.startsWith(" - ")) {
                    if (listGate === false) {
                        parsedLine = parsedLine.replace("- ", "<ul><li>") + "</li>"
                        listGate = true
                    }
                    else {
                        parsedLine = parsedLine.replace("- ", "<li>") + "</li>"
                    }
            } else 
                {if (listGate === true && !(k.startsWith(" "))) { 
                parsedLine = "</ul>" + parsedLine
                listGate = false
                }
            }

            // Check for ann ordered list number and assign it properly
            if (k.startsWith(olNum + ". ") || k.startsWith(" " + olNum + ". ")) {
                    if (listGateOl === false) {
                        parsedLine = parsedLine.replace(olNum + ". ", "<ol><li>") + "</li>"
                        listGateOl = true

                    }
                    else {
                        parsedLine = parsedLine.replace(olNum + ". ", "<li>") + "</li>"
                    }
                olNum += 1
            } else 
                {if (listGateOl === true && !(k.startsWith(" "))) { 
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


