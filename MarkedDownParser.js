const markedParser = (inputText) => {
    let currentBlock = []
    let fileToLines = (inputText).split("\n")

    if (fileToLines.length > 0) {
    fileToLines.forEach(k => {
        let parsedLine
        if (k.startsWith("###")) {
            parsedLine = k.replace("###", "<h3>")
            parsedLine += "</h3>"
            currentBlock.push(parsedLine)
        } 
        else if (k.startsWith("##")) {
            parsedLine = k.replace("##", "<h2>") 
            parsedLine += "</h2>"
            currentBlock.push(parsedLine)
        } 
        else if (k.startsWith("#")) {
            parsedLine = k.replace("#", "<h1>") 
            parsedLine += "</h1>"
            currentBlock.push(parsedLine)
        } 
        else if (k.startsWith("-")) {
            parsedLine = k.replace("-", "<li>") 
            parsedLine += "</li>"
            currentBlock.push(parsedLine)
        } 
        else if (k.startsWith(">")) {
            parsedLine = k.replace(">", '"') 
            parsedLine += '"'
            currentBlock.push(parsedLine)
        }   else {
            currentBlock.push(parsedLine)
        }
        })
    }
    currentBlock = currentBlock.join("")
    const currentBlockString = currentBlock.join("")
    if (currentBlockString.includes("**")) {
        currentBlockString = currentBlockString.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    }   
    if (currentBlockString.includes("*")) {
        currentBlockString = currentBlockString.replace(/\*(.*?)\*/g, "<i>$1</i>")
    }

        return currentBlockString
}

