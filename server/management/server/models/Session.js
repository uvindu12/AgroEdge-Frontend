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
  farm_type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  village: {
    type: DataTypes.STRING(100),
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
  seed_type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  seed_variety: {
    type: DataTypes.STRING(50),
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
  selling_price: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  buyer_type: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  storage_method: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  // Calculated fields
  total_revenue: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  profit_loss: {
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