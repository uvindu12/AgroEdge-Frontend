const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Session = require('./Session');

const LaborUpload = sequelize.define('LaborUpload', {
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
  labor_hours: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  wages_per_day: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  labor_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'labor_uploads',
  timestamps: true,
  underscored: true
});

// Set up associations
Session.hasMany(LaborUpload, { foreignKey: 'session_id' });
LaborUpload.belongsTo(Session, { foreignKey: 'session_id' });

module.exports = LaborUpload;