import { bootstrap } from './utils/bootstrap';
import { bootstrapErrorHandler } from './handlers/error';

// clean is sweet
bootstrap().catch(bootstrapErrorHandler);
