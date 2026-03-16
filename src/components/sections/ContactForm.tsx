'use client';

import { useActionState } from 'react';
import { submitContactForm } from '@/lib/actions';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export function ContactForm({ defaultType = 'general' }: { defaultType?: string }) {
  const [state, formAction, isPending] = useActionState(submitContactForm, {
    success: false,
    message: '',
  });

  if (state.success) {
    return (
      <div className="rounded-xl bg-green/10 p-8 text-center">
        <div className="text-4xl">✓</div>
        <h3 className="mt-4 font-heading text-xl font-bold text-green-dark">Message Sent</h3>
        <p className="mt-2 text-sm text-gray-600">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="type" value={defaultType} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Name" name="name" required placeholder="Your full name" />
        <Input label="Email" name="email" type="email" required placeholder="you@example.com" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Phone" name="phone" type="tel" placeholder="(903) 555-0123" />
        <Input label="Company" name="company" placeholder="Your company name" />
      </div>

      {defaultType === 'site-selector' && (
        <Textarea
          label="Project Details"
          name="projectDetails"
          placeholder="Tell us about your project — size, industry, timeline, and any specific requirements."
        />
      )}

      <Textarea
        label="Message"
        name="message"
        required
        placeholder={
          defaultType === 'site-selector'
            ? 'Additional questions or information about your site search...'
            : 'How can we help you?'
        }
      />

      {state.message && !state.success && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <Button type="submit" variant="cta" disabled={isPending}>
        {isPending ? 'Sending...' : defaultType === 'site-selector' ? 'Submit Confidential Inquiry' : 'Send Message'}
      </Button>
    </form>
  );
}
