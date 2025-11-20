/**
 * Pagination Middleware for SmartFarm API
 * Provides consistent pagination across all list endpoints
 */

class PaginationMiddleware {
    /**
     * Parse pagination parameters from request query
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware
     */
    parsePagination(req, res, next) {
        const page = Math.max(1, parseInt(req.query.page || '1', 10));
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit || '20', 10))); // Max 100 items per page
        const offset = (page - 1) * limit;

        req.pagination = {
            page,
            limit,
            offset,
            // Calculate total pages (will be set after query execution)
            totalPages: null,
            totalItems: null
        };

        next();
    }

    /**
     * Format paginated response
     * @param {Array} items - Array of items
     * @param {Number} total - Total count of items
     * @param {Object} pagination - Pagination object from req.pagination
     * @returns {Object} Formatted paginated response
     */
    formatResponse(items, total, pagination) {
        const totalPages = Math.ceil(total / pagination.limit);

        return {
            success: true,
            data: items,
            pagination: {
                page: pagination.page,
                limit: pagination.limit,
                totalItems: total,
                totalPages: totalPages,
                hasNextPage: pagination.page < totalPages,
                hasPreviousPage: pagination.page > 1,
                nextPage: pagination.page < totalPages ? pagination.page + 1 : null,
                previousPage: pagination.page > 1 ? pagination.page - 1 : null
            }
        };
    }

    /**
     * Middleware to add pagination helper to response object
     */
    responseHelper(req, res, next) {
        res.paginated = (items, total) => {
            const response = this.formatResponse(items, total, req.pagination);
            return res.json(response);
        };
        next();
    }
}

module.exports = PaginationMiddleware;

