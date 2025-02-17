const express = require('express');
const router = express.Router();


// POST endpoint to handle Fixed->Start data
router.post('/fixed/start', (req, res) => {
  // Extract all fields from the request body
  const {
    farmSize,
    farmType,
    farmLocationVillage,
    farmLocationDistrict,
    cropType,
    brinjalVariety,
    expectedHarvest,
    soilType,
    soilPhLevel,
    soilMoisture,
    seedType,
    seedVariety,
    seedSource,
    seedQuantity,
    seedCost,
  } = req.body;

  // Validate the data 
  if (
    farmSize === undefined ||
    farmType === undefined || 
    farmLocationVillage === undefined ||
    farmLocationDistrict === undefined ||
    cropType === undefined ||
    brinjalVariety === undefined ||
    expectedHarvest === undefined ||
    soilType === undefined ||
    soilPhLevel === undefined ||
    soilMoisture === undefined ||
    seedType === undefined ||
    seedVariety === undefined ||
    seedSource === undefined ||
    seedQuantity === undefined ||
    seedCost === undefined 
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Log the received data
  console.log('Received Fixed->Start data:', req.body);

  // Send a response
  res.status(200).json({
    message: 'Fixed->Start data received successfully',
    data: {
      farmSize,
      farmType,
      farmLocationVillage,
      farmLocationDistrict,
      cropType,
      brinjalVariety,
      expectedHarvest,
      soilType,
      soilPhLevel,
      soilMoisture,
      seedType,
      seedVariety,
      seedSource,
      seedQuantity,
      seedCost,
    },
  });
});


// POST endpoint to handle Fixed->End data
router.post('/fixed/end', (req, res) => {
  // Extract all fields from the request body
  const {
    ActualHarvest,                 
    MarketSellingPrice,        
    TotalSalesRevenue,           
    ProfitOrLoss,                  
    BuyerType,                          
    StorageMethod,                      
    MajorDiseasesObserved        
  } = req.body;

  // Validate the data 
  if (
    ActualHarvest === undefined ||
    MarketSellingPrice === undefined ||
    TotalSalesRevenue === undefined ||
    ProfitOrLoss === undefined ||
    BuyerType === undefined ||
    StorageMethod === undefined ||
    MajorDiseasesObserved === undefined 
    
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Log the received data
  console.log('Received Fixed->End data:', req.body);

  // Send a response
  res.status(200).json({
    message: 'Fixed->End data received successfully',
    data: {
      ActualHarvest,                 
    MarketSellingPrice,        
    TotalSalesRevenue,           
    ProfitOrLoss,                  
    BuyerType,                          
    StorageMethod,                      
    MajorDiseasesObserved
    },
  });
});

// Export the router
module.exports = router;