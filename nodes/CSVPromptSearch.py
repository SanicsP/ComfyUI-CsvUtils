
class CSVPromptSearch : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "file_path" : ("STRING",) , 
            }
        }
    
    CATEGORY = "csv_tools"
    
    #FUNCTION = "execute"
    RETURN_TYPES = ()
    #RETURN_NAMES = ()
    
    OUTPUT_NODE = False
    
    DESCRIPTION = """
        This node allows you to preview the csv file by displaying the prompts.
    """

    def execute(self , file_path) : 
        return {}

