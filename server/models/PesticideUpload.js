const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Session = require('./Session');

const PesticideUpload = sequelize.define('PesticideUpload', {
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
  pesticide_type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  pesticide_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  application_frequency: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  application_method: {
    type: DataTypes.STRING(100),
    allowNull: true
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
  tableName: 'pesticide_uploads',
  timestamps: true,
  underscored: true
});

// Set up associations
Session.hasMany(PesticideUpload, { foreignKey: 'session_id' });
PesticideUpload.belongsTo(Session, { foreignKey: 'session_id' });

module.exports = PesticideUpload;