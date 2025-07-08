

class SelectRow : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "csv_data" : ("*" ,),
                "row" : ("INT",{"min" : 0}) , 
            }
        }
    
    CATEGORY = "csv_tools/advanced"
    
    FUNCTION = "execute"
    
    RETURN_TYPES = ("*",)
    
    RETURN_NAMES = ("selected_row",)
    
    OUTPUT_NODE = False
    

    def execute(self , csv_data , row) : 
        selected_row = csv_data["rows"][row]
        print("csv utils , selected row : " , selected_row)
        return (selected_row,)
        

