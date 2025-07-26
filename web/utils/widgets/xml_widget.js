


const STYLE = `
    .csv-u-xml-textarea {
        background-color : white;
        color : black;
        resize : none;
    }
`

export function applyStyle() {
    const css = document.createElement("style")
    css.innerHTML = STYLE
    document.body.appendChild(css)
}

export function createWidget() {
    const ta = document.createElement("textarea")
    ta.className = "csv-u-xml-textarea"
    ta.readOnly = true
    
    return ta
}