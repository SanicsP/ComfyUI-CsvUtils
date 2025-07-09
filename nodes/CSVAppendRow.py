from ..py.advanced_csv_utils import *

class CSVAppendRow : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "file_path" : ("STRING",) , 
            }
        }
    
    CATEGORY = "csv_tools/advanced"
    
    FUNCTION = "execute"
    
    RETURN_TYPES = ()
    
    #RETURN_NAMES = ("positive prompt" , "negative prompt")
    
    OUTPUT_NODE = True
    
    DESCRIPTION = """
        Add a new Row in a specific csv file. Frontend only
    """

    def execute(self , file_path , **kwargs) : 
        
        if kwargs == {} : 
            raise RuntimeError("The fields are empty")
        
        if all(map(lambda s : len(s) == 0 , kwargs.values())) : 
            raise RuntimeError("You have to provide at least one non-empty value in the row")
        row : dict = {}


        for field , value in kwargs.items() : 
            row[field] = value
        
        fieldnames :list = list(row.keys())


        CSVManager.appendRow(file_path , row , fieldnames)

        print("csv utils row saved with succes !  : " , row , "fieldnames:" , fieldnames)
        return {}
        

