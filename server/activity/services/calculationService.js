/**
 * Calculation Service
 * Handles all calculation logic for session uploads
 */

// Calculate irrigation totals
exports.calculateIrrigationTotals = (irrigations) => {
    const totals = {
      total_water_usage: 0,
      total_irrigation_cost: 0,
      water_sources: {},
      irrigation_methods: {}
    };
    
    irrigations.forEach(irrigation => {
      // Sum water usage and cost
      totals.total_water_usage += parseFloat(irrigation.water_usage);
      totals.total_irrigation_cost += parseFloat(irrigation.cost);
      
      // Count occurrences of each water source
      if (!totals.water_sources[irrigation.water_source]) {
        totals.water_sources[irrigation.water_source] = 1;
      } else {
        totals.water_sources[irrigation.water_source]++;
      }
      
      // Count occurrences of each irrigation method
      if (!totals.irrigation_methods[irrigation.irrigation_method]) {
        totals.irrigation_methods[irrigation.irrigation_method] = 1;
      } else {
        totals.irrigation_methods[irrigation.irrigation_method]++;
      }
    });
    
    // Find most common water source and irrigation method
    let mostCommonWaterSource = null;
    let maxWaterSourceCount = 0;
    
    for (const [source, count] of Object.entries(totals.water_sources)) {
      if (count > maxWaterSourceCount) {
        mostCommonWaterSource = source;
        maxWaterSourceCount = count;
      }
    }
    
    let mostCommonIrrigationMethod = null;
    let maxIrrigationMethodCount = 0;
    
    for (const [method, count] of Object.entries(totals.irrigation_methods)) {
      if (count > maxIrrigationMethodCount) {
        mostCommonIrrigationMethod = method;
        maxIrrigationMethodCount = count;
      }
    }
    
    totals.most_common_water_source = mostCommonWaterSource;
    totals.most_common_irrigation_method = mostCommonIrrigationMethod;
    
    return totals;
  };
  
  // Calculate labor totals
  exports.calculateLaborTotals = (labors) => {
    const totals = {
      total_labor_hours: 0,
      total_labor_wages: 0,
      average_wages_per_day: 0
    };
    
    if (labors.length === 0) return totals;
    
    let totalWages = 0;
    
    labors.forEach(labor => {
      // Sum labor hours
      totals.total_labor_hours += parseFloat(labor.labor_hours);
      
      // Sum wages (hours * wages_per_day)
      const laborWages = parseFloat(labor.labor_hours) * parseFloat(labor.wages_per_day);
      totals.total_labor_wages += laborWages;
      
      // Sum daily wages for average calculation
      totalWages += parseFloat(labor.wages_per_day);
    });
    
    // Calculate average wages per day
    totals.average_wages_per_day = totalWages / labors.length;
    
    return totals;
  };
  
  // Calculate fertilizer totals
  exports.calculateFertilizerTotals = (fertilizers) => {
    const totals = {
      total_fertilizer_cost: 0,
      total_fertilizer_quantity: 0,
      fertilizer_types: {}
    };
    
    fertilizers.forEach(fertilizer => {
      // Sum costs and quantities
      totals.total_fertilizer_cost += parseFloat(fertilizer.cost);
      totals.total_fertilizer_quantity += parseFloat(fertilizer.quantity);
      
      // Count occurrences of each fertilizer type
      if (!totals.fertilizer_types[fertilizer.fertilizer_type]) {
        totals.fertilizer_types[fertilizer.fertilizer_type] = {
          count: 1,
          quantity: parseFloat(fertilizer.quantity),
          cost: parseFloat(fertilizer.cost)
        };
      } else {
        totals.fertilizer_types[fertilizer.fertilizer_type].count++;
        totals.fertilizer_types[fertilizer.fertilizer_type].quantity += parseFloat(fertilizer.quantity);
        totals.fertilizer_types[fertilizer.fertilizer_type].cost += parseFloat(fertilizer.cost);
      }
    });
    
    return totals;
  };
  
  // Calculate pesticide totals
  exports.calculatePesticideTotals = (pesticides) => {
    const totals = {
      total_pesticide_cost: 0,
      total_pesticide_quantity: 0,
      pesticide_types: {}
    };
    
    pesticides.forEach(pesticide => {
      // Sum costs and quantities
      totals.total_pesticide_cost += parseFloat(pesticide.cost);
      totals.total_pesticide_quantity += parseFloat(pesticide.quantity);
      
      // Count occurrences of each pesticide type
      if (!totals.pesticide_types[pesticide.pesticide_type]) {
        totals.pesticide_types[pesticide.pesticide_type] = {
          count: 1,
          quantity: parseFloat(pesticide.quantity),
          cost: parseFloat(pesticide.cost)
        };
      } else {
        totals.pesticide_types[pesticide.pesticide_type].count++;
        totals.pesticide_types[pesticide.pesticide_type].quantity += parseFloat(pesticide.quantity);
        totals.pesticide_types[pesticide.pesticide_type].cost += parseFloat(pesticide.cost);
      }
    });
    
    return totals;
  };
  
  // Calculate complete session summary
  exports.calculateSessionSummary = (fertilizers, pesticides, irrigations, labors) => {
    const fertilizerTotals = exports.calculateFertilizerTotals(fertilizers);
    const pesticideTotals = exports.calculatePesticideTotals(pesticides);
    const irrigationTotals = exports.calculateIrrigationTotals(irrigations);
    const laborTotals = exports.calculateLaborTotals(labors);
    
    // Calculate total expenses
    const totalExpenses = 
      fertilizerTotals.total_fertilizer_cost + 
      pesticideTotals.total_pesticide_cost + 
      irrigationTotals.total_irrigation_cost + 
      laborTotals.total_labor_wages;
    
    return {
      fertilizer: fertilizerTotals,
      pesticide: pesticideTotals,
      irrigation: irrigationTotals,
      labor: laborTotals,
      total_expenses: totalExpenses
    };
  };