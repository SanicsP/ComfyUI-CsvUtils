import csv

class CSVManager : 
    
    def loadFile(file_path : str , delimiter : str = ",") -> dict :
        
        try : 
            with open(file_path , "r" , encoding="utf-8" , newline='') as csv_file :
                
                reader = csv.DictReader(csv_file , delimiter=delimiter)
                
                fieldnames = reader.fieldnames

                print("[csv utils] fieldnames : " , fieldnames)
                
                data : list[dict] = []
               
                
                for row in reader : 
                    data.append(row)
                    
                
                return {
                    "fieldnames" : fieldnames , 
                    "rows" : data ,
                    "row-count" : len(data)
                }
        except FileNotFoundError : 
            print("[CSVutils/CSVManager] file not found")

    def appendRow(file_path : str , row  : dict , fieldnames : list[str] , delimiter : str=",") : 
        
        try : 
            with open(file_path , "a" , encoding="utf-8" , newline='') as csv_file : 
                writer = csv.DictWriter(csv_file , delimiter=delimiter , fieldnames=fieldnames)
                writer.writerow(row)

        except Exception : 
            print("[CsvUtils/CsvManager] error while adding a row to the file" , file_path)

if __name__ =="__main__" : 
    #data = CSVManager.loadFile("example/ex2.csv")
    pass 