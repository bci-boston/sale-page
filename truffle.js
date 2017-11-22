module.exports = {
    migrations_directory: "./migrations",
    networks: {
        development: {
            host: "localhost",
            port: 8042,
            network_id: "*", // Match any network id
            gas: 4000000
        },
        shareddev: {
            host: "54.210.223.141",
            port: 8545,
            network_id: "*", // Match any network id
            gas: 4000000
        }
    }
};
