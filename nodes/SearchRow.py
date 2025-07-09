

class SearchRow : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "csv_data" : ("*",),
                "fieldname" : ("STRING", {"default" : ""}) ,
                "value" : ("STRING",{"default" : ""}) 
            }
        }
    
    CATEGORY = "csv_tools/advanced"
    
    FUNCTION = "execute"
    
    RETURN_TYPES = ("*",)
    
    RETURN_NAMES = ("selected_row",)
    
    OUTPUT_NODE = False
    
    DESCRIPTION = """
        Select a row from a list of rows, this node works with: "load csv data from file" and "select data from csv row"
    """
    
    def execute(self , csv_data , fieldname , value) : 
        
        try : 
            for row in csv_data["rows"] : 
                if value == row[fieldname] : 
                    return (row ,)
            raise RuntimeError( value , "not found in" , fieldname , "column")
        except KeyError : 
            raise RuntimeError("the field" , fieldname , "does not exists in your file. Your file has the following fieldnames : " , csv_data["fieldnames"])        

