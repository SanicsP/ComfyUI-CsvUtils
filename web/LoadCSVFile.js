import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";



app.registerExtension({
    name: "csv_utils.file_loader", 

    async setup() {
       
    } ,

    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if(nodeType.comfyClass == "LoadCSVFile") {
           
            const onNodeCreated = nodeType.prototype.onNodeCreated

            nodeType.prototype.onNodeCreated = function(...args) {
                const r = onNodeCreated?.apply(this , args)

                const node = this

                const root = document.createElement("div")
                root.style = `
                    display : flex;
                    align-items : center;
                    
                `


                const p = document.createElement("p")
                
                p.style = `
                    height:100%;  
                    width : 100%;
                    display:flex; 
                    background-color : hsla(0, 0%, 24%, 1.00); 
                    color : hsla(0, 0%, 87%, 1.00);
                    overflow-y :auto;
                    padding : 2px;
                    font-family : "Trebuchet MS" ,sans-serif;
                    font-size : 0.7em;
                `

                root.appendChild(p)

                this.addDOMWidget("result" , "STRING" , root)

                
                
            }

            const onExecuted = nodeType.prototype.onExecuted 
            
            nodeType.prototype.onExecuted = function(msg) {
                
                
                const r = onExecuted?.apply(this , arguments)
                
                
                const fieldnames = msg.text[0]
                const rowCount = msg.text[1]

                let resultMsg = `
                \tfields : ${fieldnames} \n
                \tnumber of rows : ${rowCount}
                `


                
                const resultP = this.widgets[this.widgets.length-1].element.firstChild

                resultP.innerText = resultMsg
                
                return r
            }

        
        }
    } ,

    async nodeCreated(node) {
        if(node.comfyClass == "PromptComposer") {
           
           
        }
    }

})