import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";
import { requestFile } from "./utils/advanced_utils.js";
import {findNodeAncestor} from "./utils/comfy_graph.js"



function refreshAllCombos()
{
    app.graph._nodes.forEach((node)=> {
        if(node.comfyClass == NODE_CLASS) {
                node.refreshNode()
            }
    })
}

async function refreshList(combo , fieldname) {
    
    const originNode = findNodeAncestor(this , "LoadCSVFile")
    
    if(originNode)
    {
        const filePath = originNode.widgets[0].value
                
        const csvData = await requestFile(filePath)

        combo.options.values = csvData.fieldnames
    
        combo.value = combo.options.values[0]
    
        fieldname.value = combo.value
    }
    
}

function make_submenu(value, options, e, menu, node) {
    
    const submenu = new LiteGraph.ContextMenu(
        ["refresh combos"],
        { 
            event: e, 
            callback: function (v) { 
                if (v == "refresh combos") {
                    refreshAllCombos()
                }
            }, 
            parentMenu: menu, 
            node:node
        }
    )
    
}

const NODE_CLASS = "SelectDataByField"
app.registerExtension({
    name: "csv_utils."+ NODE_CLASS, 

    commands : [
        {
            id : "csv_utils.refreshCombos" , 
            label : "Refresh field names combos" , 
            function : ()=> {
                refreshAllCombos()
            }
        }
    ] ,

    keybindings : [ 
        {
            combo : {key : "p" , ctrl:true} , 
            commandId: "csv_utils.refreshCombos"
        }
    ],

    async setup() {

       const original_getCanvasMenuOptions = nodeTypeCanvas.prototype.getCanvasMenuOptions
        nodeTypeCanvas.prototype.getCanvasMenuOptions = function() {
            
            const options = original_getCanvasMenuOptions.apply(this, arguments)

            options.push(null)
            
            options.push({
                content: "csv-utils",
                has_submenu : true , 
                callback: make_submenu
            })

            return options
        }

        
    } ,

    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if(nodeType.comfyClass == NODE_CLASS) {
            
            const onNodeCreated = nodeType.prototype.onNodeCreated
            const node = this 
            nodeType.prototype.onNodeCreated = function(...args) { 
                
                this.refreshNode = () => refreshList.call(this ,
                    this.widgets.find(w => w.name == 'fieldnameCombo')  ,  
                    this.widgets.find(w => w.name == 'fieldname')
                )
                
                const r =  onNodeCreated?.apply(this , arguments)

                const fieldnameWidget = this.widgets.find(w => w.name == 'fieldname')

                fieldnameWidget.hidden = true

                const fieldNamesCombo = this.addWidget("combo" , "fieldnameCombo" , "" , (option)=> {
                    fieldnameWidget.value = option
                } , {values : []} )

                
                this.addWidget("button" , "refresh combo list" , 0 ,  ()=> this.refreshNode() )

                return r 
            }

            const onConnectionsChange = nodeType.prototype.onConnectionsChange

            nodeType.prototype.onConnectionsChange = function(...args) {
                const r = onConnectionsChange?.onConnectionsChange.apply(this, args)
                this.refreshNode()
            }
            

        }

        
    } ,

})



                        