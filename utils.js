function getCurrentDate() {
  return new Date().toISOString();
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function formatResponse(message, data = null) {
  return {
    success: true,
    message,
    data,
    timestamp: getCurrentDate(),
  };
}

module.exports = {
  getCurrentDate,
  add,
  subtract,
  multiply,
  formatResponse,
};