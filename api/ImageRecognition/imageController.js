// controllers/clarifaiController.js

const householdRecycleItems = [
    // Paper and Cardboard
    "Newspapers",
    "Magazines",
    "Cardboard boxes",
    "Office paper",
    "Cereal boxes",
    "Cardboard egg cartons",
    "Cardboard tubes",
    "Junk mail",
    "Paper grocery bags",
    "Paper towel rolls",
    "Glass bottles",
    "Glass jars",
  
    // Metal
    "Aluminum cans",
    "Tin cans",
    "Aluminum foil",
    "Aluminum trays",
    "Steel cans",
    "Metal coat hangers",
    "Aluminum baking pans",
    "Metal pots and pans",
  
    // Plastic
    "Plastic bottles",
    "Plastic containers",
    "Plastic jugs",
    "Plastic cups",
    "Plastic lids",
    "Plastic toys",
    "Plastic hangers",
    "Plastic flower pots",
    "Plastic bags",
    "Plastic trays",
    "Plastic buckets",
    "Plastic tubs",
    "Plastic utensils",
    "Plastic packaging",
    "Plastic wrap",
    "Plastic cutlery",
    "garbage",
    "bucket",
  
    // Electronics
    "Cell phones",
    "Laptops",
    "Computers",
    "Computer monitors",
    "Keyboards",
    "Computer mice",
    "Printers",
    "DVD players",
    "VCRs",
    "Game consoles",
  
    // Textiles
    "Clothing",
    "Shoes",
    "Bed linens",
    "Towels",
    "Curtains",
    "Tablecloths",
    "Handbags",
    "Belts",
    "Backpacks",
    "Appliances",
    "Furniture",
    "Bicycles",
    "Mattresses",
    "Light bulbs",
    "Cooking oil",
    "Pallets",
    "Garden waste",
    "Used motor oil",
    "Books",
    "DVDs and CDs",
    "Greeting cards",
    "Styrofoam",
  ];

const clarifaiService = require("../ImageRecognition/imageService");

exports.analyzeImage = async (req, res) => {
  try {
    let checkFlag=0;
    const { imageUrl } = req.body;
    const concepts = await clarifaiService.getDetailsOfImage(imageUrl);
    const response = concepts;
    //console.log(response.length);
    for(let i=0; i<response.length;i++)
    {
        if(i==5)
        {
            break;
        }
        let name = response[i].name;
        if(householdRecycleItems.includes(name))
        {
            checkFlag=1;
            return res.status(200).json({
                status : 1,
                message : "Recyclelable"
            });
        }
    }
    if(checkFlag==0)
    {
        return res.status(200).json({
            status : 1,
            message : "Not Recyclelable"
        });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
