module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: ['<rootDir>/node_modules/']
};