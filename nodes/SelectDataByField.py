
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
    
    DESCRIPTION = """
        This node selects data from a row based on the specified header name
    """

    def execute(self , selected_row , fieldname) : 
        try : 
            return (selected_row[fieldname],)
        except KeyError :
            raise KeyError("the field" , fieldname , "doesn't exists. the actual fields : " , selected_row.keys())

