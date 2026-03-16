'use server';

interface FormState {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const company = formData.get('company') as string;
  const type = formData.get('type') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, message: 'Please fill in all required fields.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  // In production, this would send to email/CRM
  console.log('Contact form submission:', { name, email, phone, company, type, message });

  return {
    success: true,
    message: type === 'site-selector'
      ? 'Thank you. Your confidential inquiry has been received. We will respond within one business day.'
      : 'Thank you for contacting us. We will be in touch shortly.',
  };
}
