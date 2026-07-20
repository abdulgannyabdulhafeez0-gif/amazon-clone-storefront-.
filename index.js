// Start all services inside a single Railway container
require('./services/user-service/index.js');
require('./services/cart-service/index.js');
require('./apps/api-gateway/index.js');
