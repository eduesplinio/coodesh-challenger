export async function retry<T>(
  fn: () => Promise<T>,
  options: { maxAttempts?: number; delay?: number } = {}
): Promise<T> {
  const { maxAttempts = 3, delay = 1000 } = options;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }
      console.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await wait(delay * attempt);
    }
  }

  throw new Error('Retry failed');
}

export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function validateUserData(data: {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}): boolean {
  return !!(
    data.firstName &&
    data.lastName &&
    data.email &&
    data.email.includes('@') &&
    data.password &&
    data.password.length >= 8
  );
}

export function validateAddressData(data: {
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
}): boolean {
  return !!(
    data.firstName &&
    data.lastName &&
    data.street &&
    data.city &&
    data.state &&
    data.zip &&
    data.country &&
    data.phone
  );
}
