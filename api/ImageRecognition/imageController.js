// controllers/clarifaiController.js

const householdRecycleItems = [
  "newspapers",
  "electronics",
  "wood",
  "glass",
  "bottle",
  "magazines",
  "cardboard boxes",
  "office paper",
  "cereal boxes",
  "cardboard egg cartons",
  "cardboard tubes",
  "junk mail",
  "paper grocery bags",
  "paper towel rolls",
  "glass bottles",
  "glass jars",
  "aluminum cans",
  "tin cans",
  "aluminum foil",
  "aluminum trays",
  "steel cans",
  "metal coat hangers",
  "aluminum baking pans",
  "metal pots and pans",
  "recycling",
  "plastic bottles",
  "plastic containers",
  "plastic jugs",
  "plastic cups",
  "plastic lids",
  "plastic toys",
  "plastic hangers",
  "plastic flower pots",
  "plastic bags",
  "plastic trays",
  "plastic buckets",
  "plastic tubs",
  "plastic utensils",
  "plastic packaging",
  "plastic wrap",
  "plastic cutlery",
  "garbage",
  "bucket",
  "cell phones",
  "laptops",
  "computers",
  "computer monitors",
  "keyboards",
  "computer mice",
  "printers",
  "dvd players",
  "vcrs",
  "game consoles",
  "clothing",
  "shoes",
  "bed linens",
  "towels",
  "curtains",
  "tablecloths",
  "handbags",
  "belts",
  "backpacks",
  "appliances",
  "furniture",
  "bicycles",
  "mattresses",
  "light bulbs",
  "pallets",
  "garden waste",
  "used motor oil",
  "books",
  "dvds and cds",
  "greeting cards",
  "styrofoam"
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
        console.log(name);
        if(householdRecycleItems.includes(name.toLowerCase()))
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
