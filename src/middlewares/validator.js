const { z } = require('zod');

// Schema for setting volume
const setVolumeSchema = z.object({
  volume: z.number().int().min(0).max(100)
});

// Schema for setting mute
const setMuteSchema = z.object({
  muted: z.boolean()
});

// Middleware factory for validation
const validateBody = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: error.errors
      });
    }
    next(error);
  }
};

module.exports = {
  setVolumeSchema,
  setMuteSchema,
  validateBody
};
