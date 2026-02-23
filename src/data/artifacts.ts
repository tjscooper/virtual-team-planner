import { Artifact } from '../types';

export const artifacts: Artifact[] = [
  {
    id: 'user-story-1',
    name: 'User Story: Save Payment Method',
    type: 'markdown',
    content: `# User Story: Save Payment Method

**As a** registered user
**I want to** save my payment methods securely
**So that** I can checkout faster on future purchases

## Acceptance Criteria

\`\`\`gherkin
Scenario: Save valid credit card
  Given I am logged in
  And I am on the payment page
  When I enter valid credit card details
  And I click "Save for future purchases"
  Then the payment method is securely tokenized
  And I see "Payment method saved successfully"

Scenario: Reject invalid credit card
  Given I am logged in
  And I am on the payment page
  When I enter invalid credit card details
  And I click "Save for future purchases"
  Then I see "Invalid card number"
  And the payment method is not saved
\`\`\`

## Priority
High

## Story Points
5
`,
    metadata: {
      createdBy: 'product-owner',
      phase: 'discovery',
      timestamp: '2026-02-01T10:00:00Z',
    },
  },
  {
    id: 'architecture-1',
    name: 'Architecture: Payment Service',
    type: 'markdown',
    content: `# Architecture Decision Record: Payment Tokenization

## Context
We need to securely store payment methods for returning users while maintaining PCI-DSS compliance.

## Decision
Use Stripe Payment Methods API for tokenization. Store only token references in our database.

## Consequences
**Positive:**
- PCI compliance handled by Stripe (SAQ-A)
- Reduced security risk and audit burden
- Proven, well-documented API

**Negative:**
- Vendor lock-in to Stripe
- Additional API latency
- Monthly fee for stored methods
`,
    metadata: {
      createdBy: 'tech-lead',
      phase: 'design',
      timestamp: '2026-02-05T14:30:00Z',
    },
  },
  {
    id: 'code-1',
    name: 'PaymentMethodService.ts',
    type: 'code',
    language: 'typescript',
    content: `import Stripe from 'stripe';
import { db } from './database';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export class PaymentMethodService {
  /**
   * Saves a payment method securely using Stripe tokenization
   * @param userId - The user ID
   * @param paymentMethodId - Stripe payment method ID
   * @returns Saved payment method record
   */
  async savePaymentMethod(userId: string, paymentMethodId: string) {
    // Attach payment method to Stripe customer
    const customer = await this.getOrCreateStripeCustomer(userId);
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    // Store reference in database
    const savedMethod = await db.paymentMethods.create({
      data: {
        userId,
        stripePaymentMethodId: paymentMethodId,
        last4: paymentMethodId.slice(-4),
        brand: 'visa', // Get from Stripe response
        expiryMonth: 12,
        expiryYear: 2026,
      },
    });

    return savedMethod;
  }

  private async getOrCreateStripeCustomer(userId: string) {
    // Implementation details...
    return { id: 'cus_123' };
  }
}
`,
    metadata: {
      createdBy: 'developer',
      phase: 'implementation',
      timestamp: '2026-02-10T09:15:00Z',
    },
  },
  {
    id: 'test-1',
    name: 'PaymentMethodService.test.ts',
    type: 'test',
    language: 'typescript',
    content: `import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PaymentMethodService } from './PaymentMethodService';
import Stripe from 'stripe';

vi.mock('stripe');

describe('PaymentMethodService', () => {
  let service: PaymentMethodService;

  beforeEach(() => {
    service = new PaymentMethodService();
  });

  describe('savePaymentMethod', () => {
    it('should save valid payment method', async () => {
      const userId = 'user-123';
      const paymentMethodId = 'pm_123456';

      const result = await service.savePaymentMethod(userId, paymentMethodId);

      expect(result).toMatchObject({
        userId,
        stripePaymentMethodId: paymentMethodId,
      });
    });

    it('should reject invalid payment method', async () => {
      const userId = 'user-123';
      const invalidPaymentMethodId = 'invalid';

      await expect(
        service.savePaymentMethod(userId, invalidPaymentMethodId)
      ).rejects.toThrow('Invalid payment method');
    });
  });
});
`,
    metadata: {
      createdBy: 'sdet-automation',
      phase: 'implementation',
      timestamp: '2026-02-10T11:00:00Z',
    },
  },
];

export function getArtifactById(id: string): Artifact | undefined {
  return artifacts.find((artifact) => artifact.id === id);
}
