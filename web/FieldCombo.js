import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";
import { requestFile } from "./utils/advanced_utils.js";


function getLinkId() {
    const input = this.inputs[0]
    const link_id = input.link
    return link_id
}

async function refreshList(combo) {
    
    let currentNode = this

    let link_id = null

    while(link_id = getLinkId.call(currentNode))
    {
       
        const LLinkObj = app.graph.links[link_id]
        
        const originId = LLinkObj.origin_id

        const originNode = app.graph._nodes_by_id[originId]

        
        if(originNode.comfyClass == "LoadCSVFile") {
            try {
                
                const filePath = originNode.widgets[0].value
                
                const csvData = await requestFile(filePath)

                combo.options.values = csvData.fieldnames
                
            }
            catch(err) {
                
            }   
        }
        
        currentNode = originNode
    }  
}

app.registerExtension({
    name: "csv_utils.field_combo", 

    async setup() {
       
    } ,

    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if(nodeType.comfyClass == "SelectDataByField") {
            
            const onNodeCreated = nodeType.prototype.onNodeCreated

            nodeType.prototype.onNodeCreated = function(...args) { 

                const r =  onNodeCreated?.apply(this , arguments)

                const fieldnameWidget = this.widgets.find(w => w.name == 'fieldname')

                fieldnameWidget.hidden = true

                const fieldNamesCombo = this.addWidget("combo" , "fieldname" , "" , (option)=> {
                    fieldnameWidget.value = option
                } , {values : []} )

                fieldNamesCombo.options.values = []
                
                this.addWidget("button" , "refresh combo list" , 0 ,  ()=> refreshList.call(this , fieldNamesCombo) )

               return r 
            }
        }

        
    } ,



})