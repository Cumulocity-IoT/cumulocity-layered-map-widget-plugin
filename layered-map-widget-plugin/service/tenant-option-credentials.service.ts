import { Injectable } from '@angular/core';
import { TenantOptionsService } from '@c8y/client';

@Injectable({
  providedIn: 'root',
})
/**
 * Service for managing tenant option credentials.
 */
export class TenantOptionCredentialsService {
  private readonly CATEGORY = 'layered-map.credentials';

  constructor(private tenantOptions: TenantOptionsService) {}

  /**
   * Saves the provided credentials and returns a token.
   * @param credentials - The credentials to be saved.
   * @returns A promise that resolves to the generated token.
   */
  saveCredentials(credentials: { username: string; password: string }): Promise<string> {
    const token = `${Math.floor(Math.random() * 1e16)}`;
    const username = this.tenantOptions.create({
      category: this.CATEGORY,
      key: `${token}.username`,
      value: credentials.username,
    });

    const password = this.tenantOptions.create({
      category: this.CATEGORY,
      key: `${token}.password`,
      value: credentials.password,
    });

    return Promise.all([username, password]).then(() => token);
  }

  /**
   * Retrieves the credentials associated with the provided token.
   * @param token - The token associated with the credentials.
   * @returns A promise that resolves to the username and password.
   */
  getCredentials(token: string) {
    return Promise.all([
      this.tenantOptions.detail({ category: this.CATEGORY, key: `${token}.username` }),
      this.tenantOptions.detail({ category: this.CATEGORY, key: `${token}.password` }),
    ]).then(([username, password]) => ({
      username: username.data.value,
      password: password.data.value,
    }));
  }

  /**
   * Deletes the credentials associated with the given token.
   * @param {string} token - The token for which the credentials should be deleted.
   * @returns {Promise<void>} - A promise that resolves when the credentials are successfully deleted.
   */
  deleteCredentials(token: string) {
    return Promise.all([
      this.tenantOptions.delete({ category: this.CATEGORY, key: `${token}.username` }),
      this.tenantOptions.delete({ category: this.CATEGORY, key: `${token}.password` }),
    ]);
  }

  clearAllCredentials() {
    return this.tenantOptions.list({ category: this.CATEGORY }).then((res) => {
      return res.data
        .filter((o) => o.category === this.CATEGORY)
        .map((option) => this.tenantOptions.delete(option));
    });
  }
}
