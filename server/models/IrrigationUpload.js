const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Session = require('./Session');

const IrrigationUpload = sequelize.define('IrrigationUpload', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  session_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Session,
      key: 'id'
    }
  },
  water_source: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  irrigation_method: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  water_usage: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  irrigation_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'irrigation_uploads',
  timestamps: true,
  underscored: true
});

// Set up associations
Session.hasMany(IrrigationUpload, { foreignKey: 'session_id' });
IrrigationUpload.belongsTo(Session, { foreignKey: 'session_id' });

module.exports = IrrigationUpload;