from ..py.advanced_csv_utils import *

class LoadCSVFileAdvanced : 
    
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "file_path" : ("STRING",) , 
                "row" : ("INT" , {"min" : 0}) ,  

            }
        }
         
    CATEGORY = "csv_tools/advanced"
    
    FUNCTION = "execute"
    
    RETURN_TYPES = ("STRING",)
    
    #RETURN_NAMES = ("STRING",)
    
    OUTPUT_NODE = False
    

    DESCRIPTION = """
        Loads a row from a csv file and dynamically displays the name of each available field, 
        press the refresh button to update the outputs if you change files. If you get an error make sure to press the refresh button again, 
        Only use one node instance per workflow, using multiple same instances can cause problems
    """

    def execute(self , file_path , row) : 
        
        csv_data = CSVManager.loadFile(file_path)
        
        outputs = []

        for field in csv_data["fieldnames"] : 
            outputs.append(csv_data["rows"][row][field])
        
        outputs_tuple = tuple(outputs)

        self.__class__.RETURN_TYPES = tuple(["STRING"]*len(outputs_tuple)) #<--------
        
        
        return outputs_tuple
        

