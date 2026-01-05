/**
 * Mock Database Pool
 * Mocks PostgreSQL connection pool for testing
 */

class MockPool {
    constructor() {
        this.queries = [];
        this.queryResults = new Map();
        this.queryErrors = new Map();
    }

    /**
     * Mock query method
     */
    async query(text, params) {
        const queryKey = `${text}_${JSON.stringify(params)}`;
        
        // Check for predefined errors
        if (this.queryErrors.has(queryKey)) {
            throw this.queryErrors.get(queryKey);
        }
        
        // Check for predefined results
        if (this.queryResults.has(queryKey)) {
            return this.queryResults.get(queryKey);
        }
        
        // Store query for inspection
        this.queries.push({ text, params });
        
        // Default empty result
        return { rows: [], rowCount: 0 };
    }

    /**
     * Set a query result
     */
    setQueryResult(queryText, params, result) {
        const queryKey = `${queryText}_${JSON.stringify(params)}`;
        this.queryResults.set(queryKey, result);
    }

    /**
     * Set a query error
     */
    setQueryError(queryText, params, error) {
        const queryKey = `${queryText}_${JSON.stringify(params)}`;
        this.queryErrors.set(queryKey, error);
    }

    /**
     * Clear all queries and results
     */
    clear() {
        this.queries = [];
        this.queryResults.clear();
        this.queryErrors.clear();
    }

    /**
     * Get all executed queries
     */
    getQueries() {
        return this.queries;
    }

    /**
     * Mock end method
     */
    async end() {
        return Promise.resolve();
    }

    /**
     * Mock on method for event listeners
     */
    on(event, callback) {
        // Mock event listener
        return this;
    }
}

module.exports = {
    Pool: MockPool
};

