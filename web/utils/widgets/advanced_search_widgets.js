import * as advancedUtils from "../advanced_utils.js"

const advanced_search_style= `
    
    .csv-u-advanced-search-root {

        --root-color : hsl(63, 3%, 8%);
        
        --search-bg-color : hsl(63, 3%, 24%);
        
        --result-bg-color : hsl(0, 0.00%, 100.00%);
        
        --separator-color : hsl(140, 76.70%, 37.10%);
        
        --row-color1 : hsl(0, 0.00%, 15.30%);
        --row-color2 : hsl(140, 20.00%, 29.40%);
        
        --row-text-color1: hsl(0, 0.00%, 76.10%);
        --row-text-color2: hsl(0, 0.00%, 76.10%);
        
        --text-color1: hsl(0, 0.00%, 76.10%);
        --text-color2: hsl(0, 0.00%, 8.60%);

        --hover-c1 : hsl(0, 0.00%, 78.80%);
        --hover-bg-c1 : hsla(124, 11.90%, 23.10%, 0.32);

        --border-r1 : 4px;
        --border-r2 : 6px;
        --border-r3 : 8px;

        --margin1 : 6px;
        --margin2 : 12px;
        --margin3 : 18px;
        --margin4 : 24px;



        --padding1 : 16px;
        --padding2 : 0.5em;

        --text-size : 1.0em;
        --fs1 : 0.8em;

        --ff1 : sans-serif;
        
        font-family : var(--ff1);
        font-size : var(--fs1);
        
        color : var(--text-color1);
        
        background-color : var(--root-color);
        
        display : flex;
        
        flex-direction : column;
        
        gap : 5px;
        
        align-items : center;
        
        padding : var(--padding2);

    }

    .csv-u-advanced-search-bar {
        margin-top : var(--margin3);
        width : 85%;
        background-color : var(--search-bg-color);
        border-radius : var(--border-r3);
    }

    .csv-u-advanced-result-panel {
        width 100%;
        overflow-y : auto;
        padding : var(--padding1);
    }

    .csv-u-result-table {
        border-spacing : 10px;
        
        border-collapse : separate;
        
        border-color : var(--separator-color);

        table-layout : fixed;

    }


    .csv-u-result-table tr:nth-child(2n) {
        color : var(--row-text-color1);
        background-color : var(--row-color1);
    }


    .csv-u-result-table  td {
        cursor : pointer;
        padding : var(--padding2);
        boder-radius : var(--border-2);
    }

    .csv-u-result-table  td:hover {
        background-color : var(--hover-bg-c1);
        color : var(--hover-c1);

        transition : all ease-in-out 0.2s;
    }

    .csv-u-result-table-header > th {
        background-color : var(--row-color2);
    }

    .csv-u-result-table-header  tr {
        background-color : red;
        
    }


`

export function apply_advanced_search_style() {
    const css = document.createElement("style")
    css.innerHTML = advanced_search_style
    document.body.appendChild(css)
}

export function create_search_component() {
    
    const component_root =  document.createElement("div")
        
        component_root.className = "csv-u-advanced-search-root"
        
        component_root.innerHTML = `
            <input type="text" class="csv-u-advanced-search-bar"></input>
            <h4 class="csv-u-advanced-result-label">results : 0 </h4>
            <div class="csv-u-advanced-result-panel"></div>
        `
    return {
        root : component_root , 
        search_bar: component_root.querySelector(".csv-u-advanced-search-bar") ,
        result_panel : component_root.querySelector(".csv-u-advanced-result-panel"),
        search_result : component_root.querySelector(".csv-u-advanced-result-label")
    }
}

export async function onInput(node , searchComponent) {
    
    const fileInput = node.widgets[0].value

    const searchContent = searchComponent.search_bar.value

    const csvData = await advancedUtils.requestFile(fileInput)
    
    console.log("search content : " , searchContent )
    
    
    const filteredResults = await advancedUtils.filterResults(csvData , searchContent)
    
    // console.log("results : " , filteredResults)

    show_search_results(csvData , filteredResults , searchComponent)

}

export function show_search_results(csvData , searchResults , searchComponent) {
    
    searchComponent.search_result.innerText = `results ${searchResults.length}`

    searchComponent.result_panel.innerHTML = ``
    if (searchResults.length == 0) {
        return
    }

    
    const resultTable = document.createElement("table")
    resultTable.className = "csv-u-result-table"
    
    const tableHeader = document.createElement("tr")
        resultTable.appendChild(tableHeader)
        tableHeader.className = "csv-u-result-table-header"

    for(let field of csvData.fieldnames) {
        const fieldHead = document.createElement("th")
            fieldHead.innerText = field
            tableHeader.appendChild(fieldHead)

    }

    for(let row of searchResults) {
        const rowElement = document.createElement("tr")
        for(let field of csvData.fieldnames) {
            
            const entryTd =  document.createElement("td")
                entryTd.innerText = row[field]
                rowElement.appendChild(entryTd)
        }

        resultTable.appendChild(rowElement)
    }


    
    searchComponent.result_panel.appendChild(resultTable)

}

