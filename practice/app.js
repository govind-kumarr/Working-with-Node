const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.json");

fs.readFileSync(filePath, (error, fileContent) => {
  console.log(JSON.parse(fileContent));
  
});
