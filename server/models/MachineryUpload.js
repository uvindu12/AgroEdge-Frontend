const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Session = require('./Session');

const MachineryUpload = sequelize.define('MachineryUpload', {
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
  machinery_used: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  usage_frequency: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  machinery_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'machinery_uploads',
  timestamps: true,
  underscored: true
});

// Set up associations
Session.hasMany(MachineryUpload, { foreignKey: 'session_id' });
MachineryUpload.belongsTo(Session, { foreignKey: 'session_id' });

module.exports = MachineryUpload;