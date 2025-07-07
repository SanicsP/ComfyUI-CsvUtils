
from ..py.csv_utils import *

class CSVPromptLoader : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "file_path" : ("STRING",) , 
                "row" : ("INT",{"default" : 0 , "min" : 0})
            }
        }
    
    CATEGORY = "csv_tools"
    
    FUNCTION = "execute"
    RETURN_TYPES = ("STRING" , "STRING")
    RETURN_NAMES = ("positive prompt" , "negative prompt")
    
    OUTPUT_NODE = False
    

    def execute(self , file_path , row) :
        prompt_list = get_prompt_list(file_path)
        prompt_row = get_prompt_row(prompt_list, row)
        
        if prompt_row["positive"] == "" : 
            raise Exception("The positive prompt is empty")
        
        print("[csv utils] row selected : " , prompt_row)
        
        return (prompt_row["positive"] , prompt_row["negative"])

