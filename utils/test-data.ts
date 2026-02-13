export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface AddressData {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export class TestDataGenerator {
  private static cache: Map<string, any> = new Map();

  static async generateUserData(): Promise<UserData> {
    if (this.cache.has('userData')) {
      return this.cache.get('userData');
    }

    try {
      const response = await fetch('https://randomuser.me/api/');
      const data: any = await response.json();
      const user = data.results[0];

      const userData: UserData = {
        firstName: user.name.first,
        lastName: user.name.last,
        email: `${user.login.username}${Date.now()}@test.com`,
        password: 'Test@123456',
        phone: user.phone.replace(/\D/g, '').slice(0, 10),
      };

      this.cache.set('userData', userData);
      return userData;
    } catch (error) {
      console.warn('Falha ao buscar dados da API, usando fallback');
      return this.getFallbackUserData();
    }
  }

  static async generateAddressData(): Promise<AddressData> {
    if (this.cache.has('addressData')) {
      return this.cache.get('addressData');
    }

    try {
      const response = await fetch('https://randomuser.me/api/');
      const data: any = await response.json();
      const user = data.results[0];

      const addressData: AddressData = {
        firstName: user.name.first,
        lastName: user.name.last,
        street: `${user.location.street.number} ${user.location.street.name}`,
        city: user.location.city,
        state: user.location.state,
        zip: user.location.postcode.toString().slice(0, 5),
        country: 'US',
        phone: user.phone.replace(/\D/g, '').slice(0, 10),
      };

      this.cache.set('addressData', addressData);
      return addressData;
    } catch (error) {
      console.warn('Falha ao buscar dados da API, usando fallback');
      return this.getFallbackAddressData();
    }
  }

  private static getFallbackUserData(): UserData {
    const timestamp = Date.now();
    return {
      firstName: 'Test',
      lastName: 'User',
      email: `testuser${timestamp}@test.com`,
      password: 'Test@123456',
      phone: '5551234567',
    };
  }

  private static getFallbackAddressData(): AddressData {
    const timestamp = Date.now();
    return {
      firstName: 'Test',
      lastName: 'User',
      street: '123 Test Street',
      city: 'Los Angeles',
      state: 'California',
      zip: '90001',
      country: 'US',
      phone: '5551234567',
    };
  }

  static clearCache(): void {
    this.cache.clear();
  }
}
