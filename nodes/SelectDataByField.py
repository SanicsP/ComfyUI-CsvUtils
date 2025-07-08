

class SelectDataByField : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "selected_row" : ("*" ,),
                "fieldname" : ("STRING",) , 
            }
        }
    
    CATEGORY = "csv_tools/advanced"
    
    FUNCTION = "execute"
    
    RETURN_TYPES = ("STRING",)
    
    RETURN_NAMES = ("data",)
    
    OUTPUT_NODE = False
    

    def execute(self , selected_row , fieldname) : 
        
        return (selected_row[fieldname],)
        

