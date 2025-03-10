const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Session = require('./Session');

const DiseaseUpload = sequelize.define('DiseaseUpload', {
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
  disease_observed: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  disease_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'disease_uploads',
  timestamps: true,
  underscored: true
});

// Set up associations
Session.hasMany(DiseaseUpload, { foreignKey: 'session_id' });
DiseaseUpload.belongsTo(Session, { foreignKey: 'session_id' });

module.exports = DiseaseUpload;