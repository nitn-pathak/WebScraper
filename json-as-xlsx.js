let xlsx = require("json-as-xlsx")

let data = [
  {
    sheet: "Adults",
     columns: [
      { label: "User", value: "user" }, // Top level data
      { label: "Age", value: "age" }, // Custom format
      { label: "Phone", value:"phone" }, // Run functions
      {label:"Roll Number"  ,value:"roll"}


    ],
    content: [
      { user: "Andrea", age: 20, phone: "11111111",roll:"1908420"},
      { user: "Luis", age: 21, phone: "12345678",roll:"1908421"  },
      { user:"adam ", age: 23,phone:"45664646",roll:"1908420"}
    ],
  },
  {
    sheet: "Children",
    columns: [
      { label: "User", value: "user" }, // Top level data
      { label: "Age", value: "age",  }, // Column format
      { label: "Phone", value:"phone"}, // Deep props and column format
    ],
    content: [
      { user: "Manuel", age: 16,  phone: "9999999900"  },
      { user: "Ana", age: 17, phone: "8765432135"},
    ],
  },
]

let settings = {
  fileName: "MySpreadsheet", // Name of the resulting spreadsheet
  extraLength: 5, // A bigger number means that columns will be wider
  writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
   }

xlsx(data, settings) // Will download the excel file