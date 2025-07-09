from ..py.csv_utils import *

class CSVAutoPromptSave : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "file_path" : ("STRING",) , 
                "positive_prompt" : ("STRING",{"default" : "" ,  "forceInput" : True}) ,
                "negative_prompt" : ("STRING",{"default" : "" , "forceInput" : True}) 
            }
        }
    
    CATEGORY = "csv_tools"
    
    FUNCTION = "execute"
    
    RETURN_TYPES = ()
    
    #RETURN_NAMES = ("positive prompt" , "negative prompt")
    
    OUTPUT_NODE = True

    DESCRIPTION = """
        Save positives and negatives prompts in a specific file.
    """
    

    def execute(self , file_path , positive_prompt , negative_prompt) : 
        if len(positive_prompt) == 0 : 
            raise FileNotFoundError("the file" , file_path , "does not exists")
        if not save_to_csv(file_path , positive_prompt , negative_prompt) : 
            print("[CSVAutoPromptSaver] the prompt already exist , prompt not saved..")
        return {}
        

