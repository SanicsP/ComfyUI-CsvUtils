from .nodes.CSVPromptSaver import CSVPromptSave

from .nodes.CSVPromptSearch import CSVPromptSearch

from .nodes.CSVPromptLoader import CSVPromptLoader

from .nodes.CSVAutoPromptSave import CSVAutoPromptSave

from .nodes.CSVAppendRow import CSVAppendRow

from .nodes.LoadCSVFile import LoadCSVFile

from .nodes.SelectRow import SelectRow

from .nodes.SelectDataByField import SelectDataByField




from .py.csv_utils import *

from .py.advanced_csv_utils import *

from server import PromptServer

from aiohttp import web

from aiohttp import web



@PromptServer.instance.routes.post("/csv_utils/save_prompt")
async def save_prompt(request) : 

    json_data : dict[str , str]= await request.json()

    #print("[csv utils server] data to save : " , json_data)
    
    if "positive_prompt" in json_data and "negative_prompt" in json_data and "file_path" in json_data :

        for _ ,val in json_data.items() : 
            if len(val) == 0 :
                return web.json_response({"status" : False , "message" : "empty inputs are not allowed"})

        if not save_to_csv(json_data["file_path"].strip() , json_data["positive_prompt"].strip() , json_data["negative_prompt"].strip()): 
            return web.json_response({"status" : False , "message" : "the prompt already exists in the csv file"})

        return web.json_response({"status" : True , "message" : "prompt saved ! "})


@PromptServer.instance.routes.post("/csv_utils/get_prompts")
async def get_prompts_list(request) :
    json_data : dict[str : str] = await request.json()
    print(json_data)
    if "file_path" in json_data : 
        
        prompt_list = get_prompt_list(json_data["file_path"])
        
        if len(prompt_list) == 0 : 
            return web.Response(text="The file is empty" , status=404)
        
        #show_prompt_list(prompt_list)

        return web.json_response({"prompt_list" : prompt_list})
    
@PromptServer.instance.routes.post("/csv_utils/get_file")
async def get_csv_file(request) :
    
    json_data = await request.json()
    
    file_data = CSVManager.loadFile(json_data["file_path"])



    return web.json_response(file_data)



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
    "SelectDataByField" : SelectDataByField
}

__all__ = ["NODE_CLASS_MAPPINGS" , "WEB_DIRECTORY"]

