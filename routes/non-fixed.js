const express = require('express');
const router = express.Router();

// POST endpoint to handle Fertilizer data
router.post('/non-fixed/fertilizer', (req, res) => {
    // Extract all fields from the request body
    const {
        FertilizerType,
        FertilizerBrand,
        FertilizerQuantity,
        FertilizerNPKRatio,             
        FertilizerApplicationSchedule,  
        FertilizerApplicationMethod,     
        FertilizerCost              
    } = req.body;
  
    // Validate the data 
    if (
        FertilizerType === undefined ||
        FertilizerBrand === undefined ||
        FertilizerQuantity === undefined ||
        FertilizerNPKRatio === undefined ||
        FertilizerApplicationSchedule === undefined ||
        FertilizerApplicationMethod === undefined ||
        FertilizerCost === undefined 
      
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Log the received data
    console.log('Received Fertilizer data:', req.body);
  
    // Send a response
    res.status(200).json({
      message: 'Fertilizer data received successfully',
      data: {
        FertilizerType,
        FertilizerBrand,
        FertilizerQuantity,
        FertilizerNPKRatio,             
        FertilizerApplicationSchedule,  
        FertilizerApplicationMethod,     
        FertilizerCost        
      },
    });
  });

  // POST endpoint to handle Pesticide data
router.post('/non-fixed/pesticide', (req, res) => {
    // Extract all fields from the request body
    const {
        PesticideType,                     
        PesticideName,                      
        PesticideQuantity,         
        PesticideApplicationFrequency,     
        PesticideApplicationMethod,       
        PesticideCost                         
    } = req.body;
  
    // Validate the data 
    if (
        PesticideType === undefined ||
        PesticideName === undefined ||
        PesticideQuantity === undefined ||
        PesticideApplicationFrequency === undefined ||
        PesticideApplicationMethod === undefined ||
        PesticideCost === undefined  
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Log the received data
    console.log('Received Pesticide data:', req.body);
  
    // Send a response
    res.status(200).json({
      message: 'Pesticide data received successfully',
      data: {
        PesticideType,                     
        PesticideName,                      
        PesticideQuantity,         
        PesticideApplicationFrequency,     
        PesticideApplicationMethod,       
        PesticideCost     
      },
    });
  });

// POST endpoint to handle Irrigation data
router.post('/non-fixed/irrigation', (req, res) => {
    // Extract all fields from the request body
    const {
        WaterSource,
        IrrigationMethod,
        WaterUsage,
        IrrigationSchedule,
        IrrigationCost                  
    } = req.body;
  
    // Validate the data 
    if (
        WaterSource === undefined ||
        IrrigationMethod === undefined ||
        WaterUsage === undefined ||
        IrrigationSchedule === undefined ||
        IrrigationCost === undefined     
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Log the received data
    console.log('Received Irrigation data:', req.body);
  
    // Send a response
    res.status(200).json({
      message: 'Irrigation data received successfully',
      data: {
        WaterSource,
        IrrigationMethod,
        WaterUsage,
        IrrigationSchedule,
        IrrigationCost     
      },
    });
  });

  // POST endpoint to handle Labor data
router.post('/non-fixed/labor', (req, res) => {
    // Extract all fields from the request body
    const {
        LaborForce,
        LaborWorkSchedule,
        LaborWages                             
    } = req.body;
  
    // Validate the data 
    if (
        LaborForce === undefined ||
        LaborWorkSchedule === undefined ||
        LaborWages === undefined   
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Log the received data
    console.log('Received Labor data:', req.body);
  
    // Send a response
    res.status(200).json({
      message: 'Labor data received successfully',
      data: {
        LaborForce,
        LaborWorkSchedule,
        LaborWages    
      },
    });
  });

  // POST endpoint to handle Machinery data
router.post('/non-fixed/machinery', (req, res) => {
    // Extract all fields from the request body
    const {
        MachineryUsed,
        MachineryUsageFrequency                            
    } = req.body;
  
    // Validate the data 
    if (
        MachineryUsed === undefined ||
        MachineryUsageFrequency === undefined  
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Log the received data
    console.log('Received Machinery data:', req.body);
  
    // Send a response
    res.status(200).json({
      message: 'Machinery data received successfully',
      data: {
        MachineryUsed,
        MachineryUsageFrequency     
      },
    });
  });

// Export the router
module.exports = router;