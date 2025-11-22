import { z } from 'zod';

export const filterSchema = z.object({
  goalAmount: z.number().min(0),
  monthlyAmount: z.number().min(0),
  termMonths: z.number().min(6),
});

export type FilterFormValues = z.infer<typeof filterSchema>;
