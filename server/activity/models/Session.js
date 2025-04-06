const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  // Required Fields (M)
  farm_size: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  district: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  crop_type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  veg_variety: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  expected_harvest: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  seed_source: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  seed_quantity: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  seed_cost: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  // Optional fields (can be edited later)
  soil_type: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  soil_ph: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  // Session dates
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },

  // End session data
  actual_harvest: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  

  //new fields
  water_source: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  irrigation_method: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  water_usage: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  irrigation_cost: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  labor_hours: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  labor_wages: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  
  yield_per_perch : {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  cost_per_kg : {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  fertilizer_efficiency : {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  pesticide_efficiency : {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  water_efficiency : {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  labor_efficiency : {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  seed_efficiency : {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  final_performance_score : {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  
  
  
  // Session status
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'sessions',
  timestamps: true,
  underscored: true
});

// Set up associations
User.hasMany(Session, { foreignKey: 'user_id' });
Session.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Session;