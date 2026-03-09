const markedParserInputString = (inputText) => {
    const currentBlock = [];
    const fileToLines = (inputText).split("\n");

    if (fileToLines.length > 0) {
        fileToLines.forEach(k => {
            let parsedLine = k
            if (k.startsWith("###")) {
                parsedLine = k.replace("###", "<h3>")
                parsedLine += "</h3>"
            } else if (k.startsWith("##")) {
                parsedLine = k.replace("##", "<h2>")
                parsedLine += "</h2>"
            } else if (k.startsWith("#")) {
                parsedLine = k.replace("#", "<h1>")
                parsedLine += "</h1>"
            } else if (k.startsWith("-")) {
                parsedLine = k.replace("-", "<li>")
                parsedLine += "</li>"
            } else if (k.startsWith(">")) {
                parsedLine = k.replace(">", '"')
                parsedLine += '"'
                parsedLine += "<br>"
            } else { parsedLine += "<br>" }
            currentBlock.push(parsedLine)
        });
    };
    let currentBlockString = currentBlock.join("")
    if (currentBlockString.includes("**")) {
        currentBlockString = currentBlockString.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    };
    if (currentBlockString.includes("*")) {
        currentBlockString = currentBlockString.replace(/\*(.*?)\*/g, "<i>$1</i>")
    };
    return currentBlockString
};


