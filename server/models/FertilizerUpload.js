const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Session = require('./Session');

const FertilizerUpload = sequelize.define('FertilizerUpload', {
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
  fertilizer_type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  application_method: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  application_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'fertilizer_uploads',
  timestamps: true,
  underscored: true
});

// Set up associations
Session.hasMany(FertilizerUpload, { foreignKey: 'session_id' });
FertilizerUpload.belongsTo(Session, { foreignKey: 'session_id' });

module.exports = FertilizerUpload;