from .nodes.CSVPromptSaver import CSVPromptSave

from .nodes.CSVPromptSearch import CSVPromptSearch

from .nodes.CSVPromptLoader import CSVPromptLoader

from .nodes.CSVAutoPromptSave import CSVAutoPromptSave

from .nodes.CSVAppendRow import CSVAppendRow

from .nodes.LoadCSVFile import LoadCSVFile

from .nodes.SelectRow import SelectRow

from .nodes.SelectDataByField import SelectDataByField

from .nodes.CSVAdvancedSearch import CSVAdvancedSearch

from .nodes.LoadCSVFileAdvanced import LoadCSVFileAdvanced

from .nodes.SearchRow import SearchRow

from .nodes.SelectColumnFromRow import SelectColumnFromRow

from .nodes.XMLPromptComposer import XMLPromptComposer

from .nodes.PromptComposer import PromptComposer



from .py.routes import define_routes

  
define_routes()

print("[CSV utils] csv server routes init")

WEB_DIRECTORY = "./web"

NODE_CLASS_MAPPINGS = { 
    "CSVPromptSave" : CSVPromptSave ,
    "CSVPromptSearch" : CSVPromptSearch ,
    "CSVPromptLoader" : CSVPromptLoader  , 
    "CSVAutoPromptSave" : CSVAutoPromptSave , 
    "CSVAppendRow" : CSVAppendRow,
    "LoadCSVFile" : LoadCSVFile ,
    "SelectRow" : SelectRow , 
    "SelectDataByField" : SelectDataByField ,
    "CSVAdvancedSearch" : CSVAdvancedSearch , 
    "LoadCSVFileAdvanced" : LoadCSVFileAdvanced , 
    "SearchRow" : SearchRow , 
    "SelectColumnFromRow" : SelectColumnFromRow,
    "XMLPromptComposer" : XMLPromptComposer,
    "PromptComposer" : PromptComposer
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "CSVPromptSave" : "Save prompt to CSV file" ,
    "CSVPromptSearch" : "Search Prompt from CSV file" ,
    "CSVPromptLoader" : "Load Prompt "  , 
    "CSVAutoPromptSave" : "Save prompt to CSV file(auto)" , 
    "CSVAppendRow" : "Append Row to CSV File",
    "LoadCSVFile" : "Load CSV File Data" ,
    "SelectRow" : "Select Row From CSV Data" , 
    "SelectDataByField" : "Select Data From CSV Row" ,
    "CSVAdvancedSearch" : "Search From CSV File" , 
    "LoadCSVFileAdvanced" : "Load Row From File" , 
    "SearchRow" : "Find Row By value" , 
    "SelectColumnFromRow" : "Select Column From Row",
    "XMLPromptComposer" : "XMLPromptComposer" , 
    "PromptComposer" : "PromptComposer"
}
__all__ = ["NODE_CLASS_MAPPINGS" , "NODE_DISPLAY_NAME_MAPPINGS" , "WEB_DIRECTORY"]

