import xml.etree.ElementTree as ET

class XMLPromptComposer : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "xml_prompt" : ("STRING", {"default" : "" , "multiline" : True}) , 
            }
        }

    def xml2prompt(xml_string : str) :
        if xml_string.strip() == "" :
            raise RuntimeError("Empty prompt") 
            
        root = ET.fromstring(xml_string)
        
        final_prompt : str= ""

        for child in root :
            if child.text :  
                final_prompt += child.text + " , "

    
        final_prompt =" ".join(final_prompt.replace("\n" , "").replace("\t" , "").strip().split())

        final_prompt = final_prompt[:-1]

        return final_prompt 

    def xml2dict(xml_string : str) : 
        root = ET.fromstring(xml_string)
        tags_dict = {}

        for child in root : 
            tags_dict[child.tag] = " ".join(child.text.replace("\n" , "").split())
        
        print(tags_dict)

        return tags_dict
    CATEGORY = "csv_tools/xml"
    
    FUNCTION = "execute"
    
    RETURN_TYPES = ("STRING", "*")
    
    RETURN_NAMES = ("prompt" , "selected_row")
    
    OUTPUT_NODE = False

    DESCRIPTION = """
        Transform XML data to prompts
    """
    

    def execute(self , xml_prompt) : 
        return (XMLPromptComposer.xml2prompt(xml_prompt), XMLPromptComposer.xml2dict(xml_prompt))
    
    

