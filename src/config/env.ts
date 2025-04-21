type Environment = 'development' | 'production';

// Get current environment
const getEnvironment = (): Environment => {
    return 'development';
};

const envConfig = {
    development: {
        apiUrl: 'http://localhost:8080/api',
        apiTimeout: 10000,
        enableLogging: true,
    },
    production: {
        apiUrl: 'https://cse441.com/api',
        apiTimeout: 20000,
        enableLogging: false,
    },
};

// Get current environment config
const currentEnv = getEnvironment();
const config = envConfig[currentEnv];

export default {
    ...config,
    environment: currentEnv,
    isProduction: currentEnv === 'production',
    isDevelopment: currentEnv === 'development',
};