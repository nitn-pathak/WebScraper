const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = require("jsdom");
const xlsx = require("json-as-xlsx");
var fs = require("fs");


//const link = "https://www.theguardian.com/football/premierleague/table";

const link ="https://www.theguardian.com/football/premierleague/table";

request(link,cb);
let array = [] ;

function cb(error,response,html){

if(error){
console.log(error);

}
else{

  

     let domobj = new JSDOM(html);

      let documentobj = domobj.window.document;

      let leaderboard = documentobj.querySelectorAll(".table.table--football.table--league-table.table--responsive-font.table--striped ");
     

         for(i = 0 ; i<leaderboard.length ; i++){

           let rows = leaderboard[i].querySelectorAll("tbody tr");
             // console.log(rows.length);

          for(let j=0 ; j<rows.length; j++){

            let td = rows[j].querySelectorAll("td");

            //console.log(td.length);
              let teamname = td[1].textContent;
              
              let gp = td[2].textContent;

              let gd = td[8].textContent;

              let pts = td[9].textContent;

              let form = td[10].textContent;
              
              //  console.log("TEAM NAME>",teamname);
              
              //console.log(teamname,"      GP->",gp,"GD->",gd,"PTS->",pts);
              //console.log("Team",form);

                      processTeam(teamname,pts,gp,gd,form);

                     

                            console.log(array)

                    
                           let data = JSON.stringify(array);
                             str = data.replace(/\\n/g," ");
                        //       // strr =str.replace(/\s/g," ");
                             // strr =str.trim();
                   
                                  strr = str.replace(/\s\s+/g, "_");
                        fs.writeFileSync('TeamsStats.json',strr);
                                  //console.log(strr);
 

                                 let myexcel = [
                                  {
                                    sheet: "Team Stats",
                                     columns: [
                                      { label: "TeamName", value: "Name" }, // Top level data
                                      { label: "Pts", value: "Pts" }, // Custom format
                                      { label: "Gp", value:"Gp" }, // Run functions
                                      {label:"Gd"  ,value:"Gd"}
                                
                                
                                    ],
                                    content: array
                                  
                                     }]
                                
                                let settings = {
                                  fileName: "Score Board", // Name of the resulting spreadsheet
                                  extraLength: 4, // A bigger number means that columns will be wider
                                  writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
                                   }
                                
                  xlsx(myexcel, settings) // Will download the excel file












                     
                 }
               }
              }
              


//  processTeam("barceleona", "70" ," win against realmadrid");
//  processTeam("psg", "60" , ", win against realmadrid");
//  processTeam("barceleona", "50" ," win against realmadrid");
//  console.log(array);

 function processTeam(teamname,pts,gp,gd,form ){ 

     pts =Number(pts);

     for(i=0 ; i<array.length ; i++){

        let teamobj = array[i];
       
       //console.log(teamobj)
         
    

        if(teamobj.Name == teamname){
         //teamobj.teamname+=teamname; 
            teamobj.Pts += pts; 
          
            teamobj.Gd += gd;
            teamobj.Gp += gp;
            teamobj.Form +=form; 
        
         
           

              return;
            }
          }

         

          teamobj  = {
            Name : teamname,
        
            Pts : pts, 
            Gd:gd,
            Gp:gd,
            Form :form,
      
                }

               
             
               
               array.push(teamobj);
               

    

         }
   }
